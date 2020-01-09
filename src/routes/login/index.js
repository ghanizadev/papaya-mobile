import React, {useState} from 'react';
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
import {Login} from '../../functions';

const LoginForm = props => {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Content>
        <Form>
          <Item fixedLabel>
            <Icon name="md-mail" />
            <Label>E-mail</Label>
            <Input keyboardType="email-address" onChangeText={setUsername} />
          </Item>
          <Item fixedLabel last>
            <Icon name="md-key" />
            <Label>Senha</Label>
            <Input onChangeText={setPassword} secureTextEntry />
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
                      navigation.navigate('Home');
                    },
                  );
                } else if (result.status === 403) {
                  Alert.alert(
                    'Login',
                    'Usuário e/ou senha incorretosyarn add @react-native',
                  );
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

export default LoginForm;
