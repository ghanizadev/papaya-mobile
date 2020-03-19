import React from 'react';
import {ScrollView, Image} from 'react-native'
import {
  View,
  Text,
  Button,
} from 'native-base';

import styles from './styles';

export default props => {
    const {setTitle} = props;
    
    return (
      <View style={{height: '100%', width: '100%'}}>
        <ScrollView style={{height: '100%', width: '100%'}}>
          <View style={styles.pizzasizes}>
            <View style={styles.separator}>
              <Text>Pizzas Simples</Text>
            </View>

            <Button
              transparent
              style={styles.pizzaitem}
              onPress={() => {
                setTitle('Pizza Grande');
              }}>
              <View>
                <Image
                  source={require('../../assets/images/pizza.png')}
                  style={styles.pizzalarge}
                />
                <Text style={styles.center}>Pizza Grande</Text>
                <Text style={styles.center}>com até 3 sabores (12 fatias)</Text>
                <Text style={styles.center}>R$ 55,00</Text>
              </View>
            </Button>
            <Button
              transparent
              style={styles.pizzaitem}
              onPress={() => setTitle('Pizza Média')}>
              <View>
                <Image
                  source={require('../../assets/images/pizza.png')}
                  style={styles.pizzamedium}
                />
                <Text style={styles.center}>Pizza Média</Text>
                <Text style={styles.center}>com até 3 sabores (9 fatias)</Text>
                <Text style={styles.center}>R$ 44,00</Text>
              </View>
            </Button>
            <Button
              transparent
              style={styles.pizzaitem}
              onPress={() => setTitle('Pizza Pequena')}>
              <View>
                <Image
                  source={require('../../assets/images/pizza.png')}
                  style={styles.pizzasmall}
                />
                <Text style={styles.center}>Pizza Pequena</Text>
                <Text style={styles.center}>com até 2 sabores (8 fatias)</Text>
                <Text style={styles.center}>R$ 33,00</Text>
              </View>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  };