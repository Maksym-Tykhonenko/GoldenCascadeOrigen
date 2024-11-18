import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {BlueGradientBtn} from '../components/BlueGradientBtn';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export default function WelcomeScreen({navigation}: Props) {
  const onClick = () => {
    navigation.navigate('Home');
  };

  return (
    <>
      <LinearGradient
        colors={['#1B2034', 'transparent']}
        style={styles.fade}
        start={{x: 0, y: 0.5}}
        end={{x: 0, y: 0}}
      />
      <View className="w-full h-full">
        <Image
          source={require('../Images/welcomeImage.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textMain}>
            Welcome to the world of entertainment!
          </Text>
          <Text style={styles.text}>
            Immerse yourself in the atmosphere of our establishments.Play, taste
            and enjoy the unique atmosphere - with us, every day will become a
            holiday!
          </Text>
          <BlueGradientBtn
            onClick={onClick}
            text="Continue"
            style={styles.btn}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {width: 330, height: 45},
  fade: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
    top: '55%',
    left: 0,
    zIndex: 1,
  },
  image: {
    width: '100%', // Укажите нужные размеры изображения
    height: '60%',
  },
  textContainer: {
    backgroundColor: '#1B2034',
    flex: 1,
    alignItems: 'center', // Центрирует текст по горизонтали
  },
  textMain: {
    color: '#F5F5F5',
    marginTop: '5%',
    fontWeight: 'bold',
    fontSize: 32, // Размер текста
    textAlign: 'center',
  },
  text: {
    marginTop: '5%',
    marginBottom: '6%',
    color: '#F5F5F5',
    width: 304,
    fontSize: 14,
    textAlign: 'center',
  },
});
