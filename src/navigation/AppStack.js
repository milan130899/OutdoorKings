import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SpalshScreen from '../components/SpalshScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Spalsh" component={SpalshScreen} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
