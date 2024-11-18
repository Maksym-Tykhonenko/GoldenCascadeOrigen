/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AppRouter} from './components/AppRouter';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import './global.css';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppRouter />
    </GestureHandlerRootView>
  );
}

export default App;
