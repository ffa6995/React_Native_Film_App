import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwipeScreen from './SwipeScreen/SwipeScreen';
import Chat from './Chat';
import AddTodo from '../containers/AddTodo';
import Watchlist from '../components/Watchlist';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: function setIcon({ focused, color, size }) {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AddTodo') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Watchlist') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Dislike') {
            iconName = 'close';
          } else if (route.name === 'Like') {
            iconName = 'close';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={SwipeScreen} />
      <Tab.Screen name="Chat" component={Chat} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="AddTodo" component={AddTodo} />
      <Tab.Screen name="Watchlist" component={Watchlist} />
    </Tab.Navigator>
  );
}

export default MyTabs;
