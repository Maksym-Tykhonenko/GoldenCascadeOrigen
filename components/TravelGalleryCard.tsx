import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from '../screens/Gallery/TravelGallery';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  navigation: NavigationProp<any>;
  item: Card;
}

export const TravelGalleryCard = ({navigation, item}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('GalleryPhoto', {item: item})}>
      <View style={styles.container}>
        <ImageBackground style={styles.img} source={{uri: item.imgPath}}>
          <Text style={styles.header}>{item.title}</Text>
          <Text style={styles.description}>{item.place}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: wp(2.5), // Адаптивный левый отступ
    marginVertical: hp(1), // Адаптивный вертикальный отступ
    overflow: 'hidden',
    borderRadius: wp(5), // Адаптивный радиус скругления
  },
  img: {
    width: wp(45), // Адаптивная ширина
    height: wp(45), // Адаптивная высота для квадрата
    borderRadius: wp(5), // Соответствует радиусу контейнера
    overflow: 'hidden',
    justifyContent: 'flex-end', // Для позиционирования текста внизу изображения
    paddingBottom: hp(1), // Отступ снизу для текста
  },
  header: {
    fontWeight: '900',
    fontSize: wp(4), // Адаптивный размер шрифта заголовка
    color: '#F5F5F5',
    paddingLeft: wp(2.5), // Отступ слева для текста
  },
  description: {
    color: '#F5F5F5',
    fontSize: wp(3.5), // Адаптивный размер шрифта описания
    paddingLeft: wp(2.5),
    paddingTop: hp(0.5), // Адаптивный верхний отступ для визуального разделения с заголовком
  },
});
