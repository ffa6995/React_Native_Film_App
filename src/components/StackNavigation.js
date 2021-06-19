import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SwipeScreen from './SwipeScreen/SwipeScreen';
import Watchlist from './Watchlist';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
        <Stack.Screen name="Watchlist" component={Watchlist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
