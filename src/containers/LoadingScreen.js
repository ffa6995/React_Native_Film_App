import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

const LoadingScreen = () => {
  useEffect(() => {
    checkIfLoggendIn();
  });

  checkIfLoggendIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('SwipeScreen');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };
};
