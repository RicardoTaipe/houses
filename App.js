import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import SearchPage from './Components/SearchPage';
import SearchResults from './Components/SearchResults';

const App = createStackNavigator({
  Home: { screen: SearchPage},
  Results: { screen: SearchResults},
},
{
  initialRouteName: 'Home',
});

export default App;
