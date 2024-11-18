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

export const GlacierScreen = ({navigation}: Props) => {
  return (
    <>
      <Image
        style={styles.img}
        source={require('../../Images/GlacierBar.png')}
      />
      <View style={styles.containerBorder} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Glacier Bar</Text>
        <Text style={styles.description}>
          Welcome to Glacier Bar, the heart of Cascades Casino! Our
          establishment is an ideal place to immerse yourself in the atmosphere
          of entertainment and relaxation. We offer not only refreshing drinks
          and delicious food, but also the opportunity to enjoy your favorite
          sports events on a big screen with HD quality. Our new menu will amaze
          you with the variety of dishes, and special offers on drinks will make
          your evening even more pleasant.
        </Text>
        <Text style={styles.description}>
          Whether you're looking for a quick bite or want to enjoy a quiet
          dinner, Glacier Bar is always ready to greet you with a smile. Visit
          us, and we guarantee you a great mood and unforgettable impressions!
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
