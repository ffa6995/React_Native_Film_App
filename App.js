import React, { useState } from 'react';
import store from './src/store';
import { Provider } from 'react-redux';
import MyTabs from './src/components/MyTabs';
import SwipeScreen from './src/components/SwipeScreen/SwipeScreen';
import Watchlist from './src/components/Watchlist';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/Header';

const Stack = createStackNavigator();

const App = () => {
  const [isPreview, setIsPreview] = useState(true);

  return (
    <Provider store={store}>
      {/* <NavigationContainer>
        <MyTabs />
        <SwipeScreen />
      </NavigationContainer> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SwipeScreen"
            component={SwipeScreen}
            options={{ headerTitle: () => <Header /> }}
          />
          <Stack.Screen
            name="Watchlist"
            component={Watchlist}
            options={{ headerTitle: () => <Header />, headerLeft: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
