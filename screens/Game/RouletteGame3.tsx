import React, {useEffect, useState} from 'react';
import {RouletteLogic} from '../../components/RouletteLogic';
import {BottomBar} from '../../components/BottomBar';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {GameTopBar} from '../../components/GameTopBar';
import {loadPoints, NavProps, rouleteProps3} from '../../services/GameService';

export const RouletteGame3 = ({navigation}: NavProps) => {
  const [points, setPoints] = useState('');

  useEffect(() => {
    loadPoints().then(data => setPoints(data));
  });
  return (
    <>
      <View style={styles.container}>
        <GameTopBar navigation={navigation} points={points} />
        <Text style={styles.title}>Roulette Game</Text>
        <Text style={styles.subTitle}>Collect more bonuses</Text>
        <ImageBackground
          source={require('../../Images/Game/Roulete.png')}
          style={styles.rouleteBg}>
          <RouletteLogic navigation={navigation} images={rouleteProps3} />
        </ImageBackground>
      </View>
      <BottomBar active="game" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#1B2034',
    flex: 1,
    alignItems: 'center',
  },
  rouleteBg: {
    width: 374,
    height: 471,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginTop: 30,
    fontWeight: '800',
    color: '#E6E6E6',
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    color: '#E6E6E6',
    fontSize: 14,
    marginTop: 15,
    marginBottom: '2%',
  },
});
