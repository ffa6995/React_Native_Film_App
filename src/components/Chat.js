import React from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

function Chat() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat!</Text>
      <Calendar />
    </View>
  );
}

export default Chat;
