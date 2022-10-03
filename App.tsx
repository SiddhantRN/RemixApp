/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import PlayerScreen from './src/screens/PlayerScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PlayerScreen />
    </GestureHandlerRootView>
  );
};

export default App;
