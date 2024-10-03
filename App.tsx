import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the path as necessary
import AppNavigator from './navigation/AppNavigator';
// Adjust the path as necessary

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
         <AppNavigator />
    </Provider>
  );
}
