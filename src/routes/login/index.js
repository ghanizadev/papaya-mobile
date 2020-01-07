import React from 'react';
import {Container, Content, Form, Item, Label, Icon, Input, View, Text, Button} from 'native-base';
import {Image} from 'react-native';
import Logo from '../../assets/images/logo.png';

const LoginForm = props => {
    
    return (
        <Container style={{paddingVertical: 50, paddingHorizontal: 30}}>
        <Image source={require('../../assets/images/logo.png')}
        style={{
            height: '25%',
            width: '75%',
            alignSelf: 'center',
            flex: 1
        }}
        resizeMode="contain" />
            <Content>
                <Form>
                <Item floatingLabel>
                    <Icon name="ios-mail"/>
                    <Label>E-mail</Label>
                    <Input />
                </Item>
                <Item floatingLabel last>
                    <Icon name="ios-key" />
                    <Label>Senha</Label>
                    <Input secureTextEntry />
                </Item>
                </Form>
            </Content>
            <View
            style={{
                flex: 1
            }}>
            <Button
            rounded
            style={{
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: '#FFBC2B'
            }}>
                <Text>
                    Entrar
                </Text>
            </Button>
            </View>
        </Container>
    );
}

export default LoginForm;