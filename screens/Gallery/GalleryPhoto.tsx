import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {NavProps} from '../../services/GameService';
import {useRoute} from '@react-navigation/native';
import {BottomBar} from '../../components/BottomBar';
import {BlueGradientBtn} from '../../components/BlueGradientBtn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const GalleryPhoto = ({navigation}: NavProps) => {
  const route = useRoute();
  const {item} = route.params;

  return (
    <>
      <Image style={styles.img} source={{uri: item.imgPath}} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.descriptionContainer}>
          <Image
            style={styles.placeIcon}
            source={require('../../Images/placeIcon.png')}
          />
          <Text style={styles.place}>{item.place}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Image
            style={styles.dateIcon}
            source={require('../../Images/dateIcon.png')}
          />
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <BlueGradientBtn
          text="View Location"
          onClick={() =>
            navigation.navigate('Location', {
              item: item,
            })
          }
          style={styles.btn}
        />
      </View>
      <BottomBar active="gallery" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: hp(65), // Динамическая высота для изображения
  },
  textContainer: {
    marginTop: hp(58), // Адаптивный отступ сверху
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#1B2034',
    paddingHorizontal: wp(7.5), // Адаптивный горизонтальный отступ
    borderTopLeftRadius: wp(7.5), // Адаптивный радиус скругления
    borderTopRightRadius: wp(7.5),
  },
  title: {
    fontSize: wp(5), // Адаптивный размер шрифта заголовка
    color: '#F5F5F5',
    fontWeight: '700',
    marginTop: hp(5),
  },
  place: {
    color: '#F5F5F5',
    marginLeft: wp(3),
    fontSize: wp(3.5), // Адаптивный размер шрифта для места
  },
  date: {
    color: '#F5F5F5',
    marginLeft: wp(3),
    fontSize: wp(3.5), // Адаптивный размер шрифта для даты
  },
  placeIcon: {
    height: wp(6), // Адаптивная высота и ширина иконки
    width: wp(6),
  },
  dateIcon: {
    height: wp(6),
    width: wp(6),
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(3),
  },
  btn: {
    width: '100%',
    height: hp(7),
    marginTop: hp(4),
    marginBottom: hp(15), // Адаптивное нижнее поле
  },
});
