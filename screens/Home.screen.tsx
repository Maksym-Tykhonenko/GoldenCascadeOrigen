import React from 'react';
import {View, StyleSheet, Text, Linking, SafeAreaView} from 'react-native';
import GradientText from '../components/GradientText'; // Adjust the import based on your file structure
import {TravelGalleryComponent} from '../components/TravelGalleryComponent';
import {OurRestorantsSwiper} from '../components/OurRestorantsSwiper';
import {BlueGradientBtn} from '../components/BlueGradientBtn';
import {NavigationProp} from '@react-navigation/native';
import {BottomBar} from '../components/BottomBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  navigation: NavigationProp<any>;
}

export const HomeScreen = ({navigation}: Props) => {
  const handlePress = () => {
    Linking.openURL('mailto:aneckogri@gmail.com'); // Not supported in iOS simulator, so you must test on a device.
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <GradientText colors={['#AAF7FF', '#356DC0']} style={styles.mainText}>
            Golden Cascade
          </GradientText>
          <Text style={styles.secondText}>Featured Promotions</Text>
          <TravelGalleryComponent navigation={navigation} />
          <Text style={styles.secondText}>Our Restaurants</Text>
          <OurRestorantsSwiper navigation={navigation} />
          <BlueGradientBtn
            onClick={handlePress}
            text="Support"
            style={styles.btn}
          />
        </SafeAreaView>
      </View>

      <BottomBar active="home" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  btn: {width: '100%', height: 45, marginTop: hp(3)},
  container: {
    flex: 1,
    backgroundColor: '#1B2034',
    paddingHorizontal: 30,
  },
  mainText: {
    marginTop: hp(5),
    fontSize: 32,
    fontWeight: 'bold',
  },
  secondText: {
    marginTop: '4%',
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
