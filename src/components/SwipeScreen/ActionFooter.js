import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';
import RoundButton from './RoundButton';

const ActionFooter = ({ handleChoice }) => {
  return (
    <View style={styles.container}>
      <RoundButton name="times" size={40} color={COLORS.dislike} onPress={() => handleChoice(-1)} />
      <RoundButton name="check" size={40} color={COLORS.like} onPress={() => handleChoice(1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: -20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ActionFooter;
