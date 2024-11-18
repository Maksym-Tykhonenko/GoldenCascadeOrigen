import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {BlueGradientBtn} from './BlueGradientBtn';
import {NavigationProp} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  navigation: NavigationProp<any>;
}

export const TravelGalleryComponent = ({navigation}: Props) => {
  return (
    <ImageBackground
      source={require('../Images/TravelGalleryComponent.png')}
      style={styles.imageBg}
      imageStyle={styles.container}>
      <Text style={styles.mainText}>Travel Gallery</Text>
      <Text style={styles.secondText}>
        Open your gallery of memories – save every place you've been and view
        them at any time
      </Text>
      <BlueGradientBtn
        onClick={() => navigation.navigate('TravelGallery')}
        text="View Gallery"
        style={styles.btn}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {borderRadius: wp(2)}, // border-radius based on screen width
  imageBg: {width: '100%', height: hp(25), marginTop: hp(3)},
  mainText: {
    color: '#F5F5F5',
    fontSize: wp(5), // responsive font size
    fontWeight: 'bold',
    marginLeft: wp(6),
    marginTop: hp(5),
  },
  secondText: {
    color: '#F5F5F5',
    fontSize: wp(3), // responsive font size
    marginLeft: wp(6),
    width: wp(75), // responsive width for text
    marginVertical: hp(1.5),
  },
  btn: {
    width: wp(35), // responsive button width
    height: hp(5), // responsive button height
    marginLeft: wp(6),
    marginTop: hp(2),
  },
});
