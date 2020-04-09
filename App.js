import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import MealsNavigator from './navigation/MealsNavigator';
import { createStore, combineReducers } from 'redux';
import MealsReducer from './store/reducers/Meals';
import { Provider } from 'react-redux';

enableScreens();

const rootReducer = combineReducers({
  meals: MealsReducer

});

const store = createStore(rootReducer);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider >

  );
};

const styles = StyleSheet.create({

});

export default App;
