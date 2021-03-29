import React, { useCallback, useRef } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RoundButton = ({ name, size, color, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animatedScale = useCallback((newValue) => {
    Animated.spring(scale, {
      toValue: newValue,
      friction: 4,
      useNativeDriver: true,
    }).start();
    [scale];
  });

  return (
    <TouchableWithoutFeedback
      onPressIn={() => animatedScale(0.8)}
      delayPressIn={0}
      onPressOut={() => {
        animatedScale(1);
        onPress();
      }}
      delayPressOut={120}>
      <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
        <FontAwesome name={name} size={size} color={color}></FontAwesome>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundButton;
