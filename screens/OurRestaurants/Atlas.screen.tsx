import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BlueGradientBtn} from '../../components/BlueGradientBtn';
import {NavigationProp} from '@react-navigation/native';
import {BottomBar} from '../../components/BottomBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  navigation: NavigationProp<any>;
}

export const AtlasScreen = ({navigation}: Props) => {
  return (
    <>
      <Image
        style={styles.img}
        source={require('../../Images/AtlasSteak.png')}
      />
      <View style={styles.containerBorder} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Atlas Steak+Fish</Text>
        <Text style={styles.description}>
          ATLAS combines high-quality ingredients, masterful cooking and
          engaging service for an unparalleled dining experience. Enjoy a
          sensual journey with luxurious decor, an open kitchen and live piano
          music in a cozy space.
        </Text>
        <Text style={styles.description}>
          The Josper oven, powered by mesquite charcoal, gives our dishes a
          signature smoky flavor. ATLAS was one of the first to bring it to
          Canada.
        </Text>
        <Text style={styles.description}>
          We offer only Canadian and USDA Prime beef, hand cut, aged for 40 days
          and cooked in our Josper oven for perfect tenderness. Our seafood is
          the freshest, delivered daily to ensure the highest quality.
        </Text>
        <BlueGradientBtn
          onClick={() => {
            navigation.navigate('Home');
          }}
          text="Continue"
          style={styles.btn}
        />
      </View>
      <BottomBar active="hotel" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: hp(40), // Высота изображения адаптирована по высоте экрана
  },
  containerBorder: {
    marginTop: hp(-4.5), // Отрицательный отступ для совмещения с изображением
    backgroundColor: '#1B2034',
    height: hp(5), // Высота контейнера
    borderTopLeftRadius: wp(10), // Скругление углов с адаптивным значением
    borderTopRightRadius: wp(10),
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: '#1B2034',
    height: '100%',
    paddingHorizontal: wp(5), // Адаптивный горизонтальный отступ
  },
  header: {
    color: '#F5F5F5',
    fontSize: wp(5), // Адаптивный размер шрифта
    fontWeight: 'bold',
    marginBottom: hp(1.5),
  },
  description: {
    width: wp(90), // Ширина текста адаптирована под ширину экрана
    color: '#F5F5F5',
    fontSize: hp(1.8), // Адаптивный размер шрифта
    textAlign: 'center',
    marginBottom: hp(1),
  },
  btn: {
    width: wp(85), // Ширина кнопки адаптирована
    height: hp(6),
    marginTop: hp(1),
  },
});
