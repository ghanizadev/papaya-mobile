import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';

const Settings = props => {
  const {navigation} = props;
  return (
    <View>
      <Text>Settings</Text>
      <Button
        rounded
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text>Sair</Text>
      </Button>
    </View>
  );
};

export default Settings;
