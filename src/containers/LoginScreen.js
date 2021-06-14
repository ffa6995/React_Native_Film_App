import React from 'react';
import { View, Button } from 'react-native';

const LoginScreen = () => {
  initAsync = async () => {
    await GoogleSignIn.initAsync({
      // https://docs.expo.io/versions/latest/sdk/google-sign-in/
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '1078801140609-25acal17s5cm73igjpbj157e1in1mp12.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };

  return (
    <View>
      <Button title="Sign In With Google" onPress={() => alert('button pressed')} />
    </View>
  );
};

export default LoginScreen;
