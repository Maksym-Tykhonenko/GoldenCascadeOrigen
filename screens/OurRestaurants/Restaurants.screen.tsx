import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BlueGradientBtn} from '../../components/BlueGradientBtn';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {BottomBar} from '../../components/BottomBar';

interface Props {
  navigation: NavigationProp<any>;
}

export const RestaurantsScreen = ({navigation}: Props) => {
  const route = useRoute();
  const {item} = route.params;
  console.log(item);
  return (
    <>
      <Image style={styles.img} source={{uri: item.imgPath}} />
      <View style={styles.containerBorder} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <BlueGradientBtn
          onClick={() => {
            navigation.navigate('Home');
          }}
          text="Continue"
          style={styles.btn}
        />
      </View>
      <BottomBar active="hotel" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  img: {width: '100%', height: '40%'},
  containerBorder: {
    marginTop: -35,
    backgroundColor: '#1B2034',
    height: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: '#1B2034',
    height: '100%',
  },
  header: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  description: {
    width: 360,
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: '1%',
  },
  btn: {width: 330, height: 45, marginTop: '1%'},
});
