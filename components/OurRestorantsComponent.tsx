import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {YelGradientBtn} from './YelGradientBtn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface OurRestorantsSwiperProps {
  header: string;
  description?: string;
  img: any;
  onClick: any;
}

export const OurRestorantsComponent = ({
  header,
  description,
  img,
  onClick,
}: OurRestorantsSwiperProps) => {
  return (
    <ImageBackground
      source={img}
      style={styles.imageBg}
      imageStyle={styles.container}>
      <Text style={styles.mainText}>{header}</Text>
      <Text style={styles.secondText}>{description}</Text>
      <YelGradientBtn onClick={onClick} text="See Details" style={styles.btn} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(2), // responsive border-radius
  },
  imageBg: {
    width: wp(70), // responsive width
    height: hp(24), // responsive height
    marginTop: hp(3),
    marginRight: wp(4),
  },
  mainText: {
    color: '#F5F5F5',
    fontSize: wp(4.5), // responsive font size
    fontWeight: 'bold',
    marginLeft: wp(6),
    marginTop: hp(4.5),
  },
  secondText: {
    color: '#F5F5F5',
    fontSize: wp(3), // responsive font size
    marginLeft: wp(6),
    marginVertical: hp(1.5),
  },
  btn: {
    width: wp(35), // responsive button width
    height: hp(5), // responsive button height
    marginLeft: wp(6),
  },
});
