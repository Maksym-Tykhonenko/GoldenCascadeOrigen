import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Bonus} from '../screens/Game/Bonus';
import {NavigationProp} from '@react-navigation/native';
import {addPoints} from '../services/GameService';

const WheelSection = ({rotateDegree, image}: any) => {
  return (
    <View
      style={[
        styles.section,
        {transform: [{rotate: `${rotateDegree}deg`}, {translateY: 75}]}, // Смещаем секцию вниз
      ]}>
      <Image source={image.src} style={styles.image} />
      <Text style={styles.sectionValue}>{image.value}</Text>
    </View>
  );
};
interface Props {
  navigation: NavigationProp<any>;
  images: any;
}
export const RouletteLogic = ({navigation, images}: Props) => {
  const sections = Array.from({length: 8}, (_, i) => i * 45); // 8 секторов по 45 градусов
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [selectedValue, setSelectedValue] = useState('');

  const spinWheel = () => {
    const randomSpin = Math.floor(Math.random() * 360) + 720; // Случайное вращение + 2 полных оборота
    Animated.timing(rotateAnim, {
      toValue: randomSpin,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      const finalRotate = randomSpin % 360; // Получаем конечный угол вращения
      // Корректируем выбор секции
      const selectedIndex =
        Math.floor((360 - finalRotate + 22.5) / 45) % sections.length;
      setSelectedValue(images[selectedIndex].value); // Устанавливаем значение секции
      if (images[selectedIndex].value !== 'LOSE') {
        addPoints(images[selectedIndex].value);
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.wheel,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}>
            {sections.map((rotateDegree, index) => (
              <WheelSection
                key={index}
                rotateDegree={rotateDegree}
                image={images[index]}
              />
            ))}
          </Animated.View>
          <TouchableOpacity style={styles.arrowContainer} onPress={spinWheel}>
            <Image
              source={require('../Images/Game/rouleteArrow.png')}
              style={styles.arrowImg}
            />
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.resultText}>
          Выбранное значение: {selectedValue}
        </Text> */}
      </View>
      {selectedValue && (
        <View style={styles.bonusContainer}>
          <Bonus navigation={navigation} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bonusContainer: {
    position: 'absolute',
    top: -400,
    marginTop: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    width: '1000%',
    height: '200%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wheel: {
    width: 300, // ширина колеса
    height: 300, // высота колеса
    borderRadius: 150, // для круга
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrowContainer: {position: 'absolute'},
  arrowImg: {width: 60, height: 60},
  section: {
    position: 'absolute',
    width: 150, // ширина сектора
    height: 150, // высота сектора
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // чтобы изображение не искажалось
  },
  sectionValue: {
    position: 'absolute',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    transform: [{rotate: '90deg'}],
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
