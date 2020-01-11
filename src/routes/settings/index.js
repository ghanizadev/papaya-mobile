import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const Settings = props => {
  const {navigation} = props;
  return (
    <View>
      <Text>Settings</Text>
      <Button
        rounded
        onPress={() => {
          AsyncStorage.getItem('timer').then(result => {
            clearInterval(result);
            global.updatable = false;
            navigation.navigate('SignIn');
          });
        }}>
        <Text>Sair</Text>
      </Button>
    </View>
  );
};

export default Settings;
