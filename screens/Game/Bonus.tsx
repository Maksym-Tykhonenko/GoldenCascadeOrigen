import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  navigation: NavigationProp<any>;
}

export const Bonus = ({navigation}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Home')}>
      <Image
        style={styles.img}
        source={require('../../Images/Game/Bonus.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: 180, height: 153},
});
