import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  points: string;
  navigation: NavigationProp<any>;
}

export const GameTopBar = ({points, navigation}: Props) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={styles.backIcon}
          source={require('../Images/Game/iconBack.png')}
        />
      </TouchableOpacity>
      <ImageBackground
        style={styles.pointsIcon}
        source={require('../Images/Game/PointsIcon.png')}>
        <Text style={styles.pointsText}>{points}</Text>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  backIcon: {width: 24, height: 24},
  pointsIcon: {
    width: 78,
    height: 30,
    justifyContent: 'center',
  },
  pointsText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 15,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: '6%',
  },
});
