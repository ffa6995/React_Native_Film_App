import { createStackNavigation } from 'react-navigation-stack';
import SwipeScreen from '../SwipeScreen/SwipeScreen';
import Header from '../Header';
import React from 'react';

const screens = {
  SwipeScreen: {
    screen: SwipeScreen,
    navigationOptions: {
      headerTitle: () => <Header />,
    },
  },
};

const SwipeScreenStack = createStackNavigation(screens);

export default SwipeScreenStack;
