import React, {useCallback, useState} from 'react';
import {BottomBar} from '../../components/BottomBar';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TravelGalleryCard} from '../../components/TravelGalleryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface Card {
  id: number;
  title: string;
  place: string;
  date: string;
  imgPath: string;
}

interface Props {
  navigation: NavigationProp<any>;
}
{/** 
const defaultCards: Card[] = [
  {
    id: 1,
    title: 'Turkey',
    place: 'B-Dul V.Lucaciu Nr 57 Baia Mare ',
    date: '22/03/2002',
    imgPath: '../../static/1729464218419.jpg',
  },
  {
    id: 2,
    title: 'Maldives',
    place: '10 AV Mont Blanc, 74400 Chamonix Mont Blanc',
    date: '22/02/2002',
    imgPath: '../../static/1729464218419.jpg',
  },
  {
    id: 3,
    title: 'Everest',
    place: 'B-Dul V.Lucaciu Nr 57 Baia Mare ',
    date: '22/01/2002',
    imgPath: '../../static/1729464218419.jpg',
  },
];*/}

export const TravelGallery = ({navigation}: Props) => {
  const [cards, setCards] = useState<Card[]>([]);

  const loadCards = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cards');
      if (jsonValue != null) {
        setCards(JSON.parse(jsonValue));
      } else {
        // Если карточек нет, сохраняем предустановленные
        //await AsyncStorage.setItem('cards', JSON.stringify(defaultCards));
        //setCards(defaultCards);
      }
    } catch (error) {
      console.error('Ошибка при загрузке карточек:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, []),
  );

  return (
    <>
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Travel Gallery</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddPhoto')}>
            <Image
              style={styles.icon}
              source={require('../../Images/PlusTravellGallery.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.cardContainer}>
            {cards &&
              cards.map(item => (
                <TravelGalleryCard
                  key={item.id}
                  item={item}
                  navigation={navigation}
                />
              ))}
          </View>
        </ScrollView>
      </View>
      <BottomBar active="gallery" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#1B2034',
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: wp(8), // Адаптивный размер шрифта для заголовка
    color: '#E6E6E6',
    fontWeight: '800',
  },
  icon: {
    width: wp(6), // Адаптивный размер иконки
    height: wp(6),
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: hp(8), // Адаптивный верхний отступ
    alignItems: 'center',
    marginHorizontal: wp(8), // Адаптивные горизонтальные отступы
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(4), // Адаптивный отступ сверху для контейнера с карточками
    marginBottom: hp(10), // Адаптивный нижний отступ
    paddingHorizontal: wp(2), // Адаптивный внутренний отступ для выравнивания карточек
  },
});
