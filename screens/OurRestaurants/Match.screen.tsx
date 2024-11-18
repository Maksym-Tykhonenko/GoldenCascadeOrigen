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

export const MatchScreen = ({navigation}: Props) => {
  return (
    <>
      <Image
        style={styles.img}
        source={require('../../Images/MatchEatery.png')}
      />
      <View style={styles.containerBorder} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Match Eatery & Public House</Text>
        <Text style={styles.description}>
          Welcome to MATCH Eatery & Public House! We bring together the
          welcoming atmosphere of a neighbourhood pub with the high-energy
          excitement of a sports bar. With 17 locations across British Columbia,
          Alberta, and Ontario, each of our venues features carefully curated
          touches that celebrate the local history and community stories unique
          to each city.
        </Text>
        <Text style={styles.description}>
          At MATCH, we’re all about delivering great experiences—whether you’re
          enjoying our creative comfort food, sipping on a cold drink, or
          watching your favorite sports event or live entertainment. We offer
          both takeout and delivery options, so you can enjoy your Match
          favorites from the comfort of home. Whatever your perfect night out
          looks like, we’re here to make it happen at MATCH!
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
