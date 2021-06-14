// @refresh state
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwipeScreen from './SwipeScreen/SwipeScreen';
import Chat from './Chat';
import AddTodo from '../containers/AddTodo';
import Watchlist from '../components/Watchlist';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApiKeys from '../utils/ApiKeys';
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Button, TextInput, StyleSheet, Image } from 'react-native';

const Tab = createBottomTabNavigator();

// https://www.youtube.com/watch?v=E81jfHan8MM
// https://www.youtube.com/watch?v=ZcaQJoXY-3Q
// https://www.youtube.com/watch?v=GZKaVJEd4JU

//initialize firbase
if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}

// const db = firebase
//   .database()
//   .ref('users/' + userId)
//   .set();

function MyTabs() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    readUser();
  }, []);

  const readUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  const handlePress = async () => {
    const _id = Math.random().toString(36).substring(7);
    const user = { _id, name };
    console.log(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <Button onPress={handlePress} title="Enter Application" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
});

export default MyTabs;
