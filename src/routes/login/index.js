import React from 'react';
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
import {Image, StyleSheet} from 'react-native';
import logo from '../../assets/images/logo.png';

const LoginForm = props => {
  const {navigation} = props;

  return (
    <Container style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Content>
        <Form>
          <Item floatingLabel>
            <Icon name="md-mail" />
            <Label>E-mail</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Icon name="md-key" />
            <Label>Senha</Label>
            <Input secureTextEntry />
          </Item>
        </Form>
      </Content>
      <View style={styles.buttonsContainer}>
        <Button
          rounded
          style={styles.loginButton}
          onPress={() => navigation.navigate('Home')}>
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
