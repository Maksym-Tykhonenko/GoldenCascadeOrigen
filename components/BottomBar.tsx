import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {gameClick} from '../services/GameService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  active: string;
  navigation: NavigationProp<any>;
}

export const BottomBar = ({active, navigation}: Props) => {
  return (
    <View style={styles.container}>
      {active === 'home' ? (
        <Image
          style={styles.iconExtended}
          source={require('../Images/HomeIconExtended.png')}
        />
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.icon}
            source={require('../Images/HomeIcon.png')}
          />
        </TouchableOpacity>
      )}

      {active === 'game' ? (
        <Image
          style={styles.iconExtended}
          source={require('../Images/GameIconExtended.png')}
        />
      ) : (
        <TouchableOpacity onPress={() => gameClick(navigation)}>
          <Image
            style={styles.icon}
            source={require('../Images/GameIcon.png')}
          />
        </TouchableOpacity>
      )}

      {active === 'gallery' ? (
        <Image
          style={styles.iconExtended}
          source={require('../Images/GalleryIconExtended.png')}
        />
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('TravelGallery')}>
          <Image
            style={styles.icon}
            source={require('../Images/GalleryIcon.png')}
          />
        </TouchableOpacity>
      )}

      {active === 'profile' ? (
        <Image
          style={styles.iconExtended}
          source={require('../Images/ProfileIconExtended.png')}
        />
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.icon}
            source={require('../Images/ProfileIcon.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: hp(8),
    backgroundColor: '#2A304C',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {width: 24, height: 24},
  iconExtended: {width: 83, height: 36, borderRadius: 6},
});
