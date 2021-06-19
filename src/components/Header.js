import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function Header() {
  const navigation = useNavigation();
  const navigationHandler = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={() => {
            navigationHandler('SwipeScreen');
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Logo!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {}}>
          <IonIcon name="calendar-outline" size={25}></IonIcon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigationHandler('Chat');
          }}>
          <IonIcon name="chatbubbles-outline" size={25}></IonIcon>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigationHandler('Watchlist');
          }}>
          <IonIcon name="people-outline" size={25}></IonIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <IonIcon name="settings-outline" size={25}></IonIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  logoContainer: {
    flex: 3,
    flexDirection: 'row',
    marginLeft: 20,
  },
  iconContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Header;
