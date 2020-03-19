/* eslint-disable react-native/no-color-literals */
import React, {useState} from 'react';
import styles from './styles';

import {
    View,
    Text,
    Button,
    Container,
    H1,
    Content,
    Form,
    Input,
    Item,
    Label,
  } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {OpenTable} from '../../functions';

export default props => {
    const [currentTable, setCurrentTable] = useState(1);
    const {close} = props;
  
    return (
      <View style={styles.newordercontent}>
        <Container>
          <H1>Abrir mesa</H1>
          <Content>
            <Form>
              <Item fixedLabel>
                <Label>Mesa</Label>
                <Input keyboardType="number-pad" onChangeText={setCurrentTable} />
              </Item>
            </Form>
          </Content>
          <Button
            rounded
            style={styles.opentablebutton}
            onPress={() => {
              AsyncStorage.getItem('token').then(result => {
                OpenTable(result, currentTable, '')
                  .then(openTable => {
                    Alert.alert(
                      'Sucesso!',
                      `Mesa aberta com o pedido ID: ${openTable.data.orderId}.`,
                    );
                    close();
                  })
                  .catch(error => {
                    console.log(error);
                    Alert.alert(
                      'Erro',
                      'Erro ao abrir mesa, provavelmente ela já está aberta: ' +
                        currentTable,
                    );
                  });
              });
            }}>
            <Text>Abrir</Text>
          </Button>
        </Container>
        <Button style={styles.closebutton} onPress={() => close()}>
          <Icon name="times" size={16} color="#fff" />
        </Button>
      </View>
    );
  };