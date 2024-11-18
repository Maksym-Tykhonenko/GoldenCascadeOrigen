import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  navigation: NavigationProp<any>;
}

export const AddRestorantCard = ({navigation}: Props) => {
  return (
    <TouchableOpacity
      style={styles.imageBg}
      onPress={() => navigation.navigate('AddRestaurants')}>
      <Text style={styles.mainText}>Add Restaurants</Text>

      <Image
        style={styles.plusIcon}
        source={require('../Images/PlusTravellGallery.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: wp(70), // responsive width
    height: hp(24), // responsive height
    marginTop: hp(3),
    marginRight: wp(4),
    backgroundColor: '#2A304C',
    borderRadius: wp(2), // responsive border radius
    alignItems: 'center',
  },
  mainText: {
    color: '#F5F5F5',
    fontSize: wp(4.5), // responsive font size
    fontWeight: 'bold',
    marginTop: hp(4.5),
  },
  plusIcon: {
    marginTop: hp(4),
  },
});
