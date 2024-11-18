import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import WelcomeScreen from '../screens/Welcome.screen';
import {HomeScreen} from '../screens/Home.screen';
import {AtlasScreen} from '../screens/OurRestaurants/Atlas.screen';
import {MatchScreen} from '../screens/OurRestaurants/Match.screen';
import {GlacierScreen} from '../screens/OurRestaurants/Glacier.screen';
import {ProfileScreen} from '../screens/Profile.screen';
import {TravelGallery} from '../screens/Gallery/TravelGallery';
import {AddPhoto} from '../screens/Gallery/AddPhoto';
import {RouletteGame1} from '../screens/Game/RouletteGame1';
import {GalleryPhoto} from '../screens/Gallery/GalleryPhoto';
import LocationComponent from '../screens/Gallery/Location';
import Game5x5Screen from '../screens/Game/Game5x5';
import Game4x4Screen from '../screens/Game/Game4x4';
import Game5x6Screen from '../screens/Game/Game5x6';
import {RouletteGame2} from '../screens/Game/RouletteGame2';
import {RouletteGame3} from '../screens/Game/RouletteGame3';
import {AddRestaurants} from '../screens/OurRestaurants/AddRestaurants';
import {RestaurantsScreen} from '../screens/OurRestaurants/Restaurants.screen';

const Stack = createNativeStackNavigator();

export const AppRouter = () => {
  const theme = {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,

      background: 'transparent',
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Atlas" component={AtlasScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Glacier" component={GlacierScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TravelGallery" component={TravelGallery} />
        <Stack.Screen name="AddPhoto" component={AddPhoto} />
        <Stack.Screen name="Game4x4" component={Game4x4Screen} />
        <Stack.Screen name="Game5x5" component={Game5x5Screen} />
        <Stack.Screen name="Game5x6" component={Game5x6Screen} />
        <Stack.Screen name="Roulete1" component={RouletteGame1} />
        <Stack.Screen name="Roulete2" component={RouletteGame2} />
        <Stack.Screen name="Roulete3" component={RouletteGame3} />
        <Stack.Screen name="GalleryPhoto" component={GalleryPhoto} />
        <Stack.Screen name="Location" component={LocationComponent} />
        <Stack.Screen name="AddRestaurants" component={AddRestaurants} />
        <Stack.Screen name="RestaurantsScreen" component={RestaurantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
