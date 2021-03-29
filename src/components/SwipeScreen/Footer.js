import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';
import RoundButton from './RoundButton';

const Footer = ({ handleChoice }) => {
  return (
    <View style={styles.container}>
      <RoundButton name="times" size={40} color={COLORS.nope} onPress={() => handleChoice(-1)} />
      <RoundButton name="heart" size={34} color={COLORS.like} onPress={() => handleChoice(1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    width: 170,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

export default Footer;