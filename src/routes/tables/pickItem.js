import React from 'react';
import {Image} from 'react-native';
import {
  View,
  Text,
  Button,
} from 'native-base';

import styles from './styles'

export default props => {
    const {setTitle} = props;
    
    return (
      <View>
        <Button
          transparent
          style={{flex: 1, width: '100%'}}
          onPress={() => {
            setTitle('Pizza');
          }}>
          <View>
            <Image
              source={require('../../assets/images/pizza.png')}
              style={styles.pickicon}
            />
            <Text style={styles.center}>Pizzas</Text>
          </View>
        </Button>
        <Button transparent style={{flex: 1, width: '100%'}}>
          <View>
            <Image
              source={require('../../assets/images/juice.png')}
              style={styles.pickicon}
            />
            <Text style={styles.center}>Outros</Text>
          </View>
        </Button>
      </View>
    );
  };