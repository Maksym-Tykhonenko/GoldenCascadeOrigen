import React, {useCallback, useState} from 'react';
import {OurRestorantsComponent} from './OurRestorantsComponent';
import {ScrollView} from 'react-native';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {AddRestorantCard} from './AddRestorantCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: NavigationProp<any>;
}

interface Card {
  id: string;
  title: string;
  description: string;
  imgPath: string;
}

export const OurRestorantsSwiper = ({navigation}: Props) => {
  const [cards, setCards] = useState<Card[]>([]);

  const loadCards = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('restaurants');
      if (jsonValue != null) {
        setCards(JSON.parse(jsonValue));
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
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <OurRestorantsComponent
          header="Atlas Steak+Fish"
          description="Smokey, sweet, tangy and savoury a perfect balance of flavour."
          img={require('../Images/AtlasSteakComponent.png')}
          onClick={() => navigation.navigate('Atlas')}
        />
        <OurRestorantsComponent
          header="Match Eatery & Public House"
          description="A modern pub offering an excellent sports and entertainment experience."
          img={require('../Images/MatchEateryComponent.png')}
          onClick={() => navigation.navigate('Match')}
        />
        <OurRestorantsComponent
          header="Glacier Bar"
          description="Join us at the Glacier Bar located in the heart of Cascades Casino."
          img={require('../Images/GlacierBarComponent.png')}
          onClick={() => navigation.navigate('Glacier')}
        />
        {cards &&
          cards.map(item => (
            <OurRestorantsComponent
              header={item.title}
              img={{uri: item.imgPath}}
              onClick={() =>
                navigation.navigate('RestaurantsScreen', {item: item})
              }
            />
          ))}

        <AddRestorantCard navigation={navigation} />
      </ScrollView>
    </>
  );
};
