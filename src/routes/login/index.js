import React, {useState, useEffect, useContext} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Icon,
  Input,
  View,
  Text,
  Button,
} from 'native-base';
import {Image, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../../assets/images/logo.png';
import {Login, detectHost} from '../../functions';
import {connect} from 'react-redux';
import {findAllTables} from '../../functions';
import {update} from '../../redux/actions';
import {bindActionCreators} from 'redux';

import SocketIOClient from 'socket.io-client';
let socket;

const LoginForm = props => {
  const {navigation} = props;
  const [username, setUsername] = useState('jf.melo6@gmail.com');
  const [password, setPassword] = useState('tr4df2g5wp');

  useEffect(() => {
    detectHost()
      .then(result => {
        global.host = result;
        socket = SocketIOClient.connect(`http://${result}:3000`);

        socket.on('update', data => {
          AsyncStorage.getItem('token')
            .then(token => {
              findAllTables(token).then(tables => {
                props.update(tables.data);
              });
            })
            .catch(error => {
              Alert.alert('Erro', 'Erro ao requerer a lista de mesas');
            });
        });

        AsyncStorage.setItem('host', result);
      })
      .catch(error => {
        Alert.alert(error);
      });
  }, [props]);

  return (
    <Container style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Content>
        <Form>
          <Item fixedLabel>
            <Icon name="md-mail" />
            <Label>E-mail</Label>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              value={username}
              onChangeText={setUsername}
            />
          </Item>
          <Item fixedLabel last>
            <Icon name="md-key" />
            <Label>Senha</Label>
            <Input
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </Item>
        </Form>
      </Content>
      <View style={styles.buttonsContainer}>
        <Button
          rounded
          style={styles.loginButton}
          onPress={() => {
            Login(username, password)
              .then(result => {
                if (result.status === 200) {
                  AsyncStorage.multiSet(
                    [['user', username], ['token', result.data.access_token]],
                    () => {
                      socket.emit('update', '');
                      navigation.navigate('Home');
                    },
                  );
                } else if (result.status === 403) {
                  Alert.alert('Login', 'Usuário e/ou senha incorretos');
                }
              })
              .catch(error => {
                console.log(error);
                Alert.alert(
                  'Erro',
                  'Servidor indisponível, contacte o administrador',
                );
              });
          }}>
          <Text>Entrar</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFBC2B',
    width: '50%',
  },
  buttonsContainer: {
    flex: 1,
  },
  logo: {
    height: '25%',
    width: '75%',
    alignSelf: 'center',
    flex: 1,
  },
  icon: {
    height: '24px',
    width: '24px',
    alignSelf: 'center',
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});

const mapStateToProps = state => {
  const {data} = state;
  return {data};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
