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
import io from 'socket.io-client';
import {Context} from '../../context';
import {findAllTables} from '../../functions';

const LoginForm = props => {
  const {navigation} = props;
  const [username, setUsername] = useState('jf.melo6@gmail.com');
  const [password, setPassword] = useState('td4df2g5wp');

  const state = useContext(Context);

  useEffect(() => {
    detectHost();

    const getData = async () => {
      const store = await AsyncStorage.multiGet(['user', 'password']);
      setUsername(store[0][1]);
      setPassword(store[1][1]);
    }
    getData();

  }, [state]);

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
              onChangeText={setUsername}
              value={username}
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
              .then(async result => {
                if (result.status === 201) {
                  await AsyncStorage.multiSet([['user', username], ['password', password], ['token', result.data.access_token]]);
                  const addr = await AsyncStorage.getItem('host');

                  const connection = io.connect(`http://${addr}:3000`);
                  connection.on('update', () => {

                    AsyncStorage.getItem('token')
                    .then(token => {
                      findAllTables(token).then(tables => {
                        state.setServerData(tables.data);
                      });
                    })
                    .catch(() => {
                      Alert.alert('Erro', 'Erro ao requerer a lista de mesas');
                    });

                  })
                  navigation.navigate('Home');
                } else if (result.status === 404) {
                  Alert.alert('Acesso restrito', 'Não cadastrado');
                  console.log(result.data)
                } else if (result.status === 403) {
                  Alert.alert('Login', 'Usuário e/ou senha incorretos');
                }
              })
              .catch(async error => {
                console.error(error);
                await AsyncStorage.removeItem('host');

                Alert.alert(
                  'Erro',
                  'Servidor indisponível, contacte o administrador (' +
                    error +
                    ')',
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

export default LoginForm;
