import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import MealsNavigator from './navigation/MealsNavigator';

enableScreens();

const App: () => React$Node = () => {
  return (
    <MealsNavigator />

  );
};

const styles = StyleSheet.create({

});

export default App;
