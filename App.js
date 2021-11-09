/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  useColorScheme
} from 'react-native';
import DB from './src/Lib/DB';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import {BottomStackNavigator } from './src/Navigation/StackNavigator';

DB.init().then(res => {
  console.log('SUCCESS DB INIT', res);
})
.catch(err => {
  console.log("Error during db init", err);
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <NavigationContainer>
        <BottomStackNavigator></BottomStackNavigator>
      </NavigationContainer>
  );
};



export default App;
