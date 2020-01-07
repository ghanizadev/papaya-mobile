import React from 'react';
import {Container, Content, Form, Item, Label, Icon, Input} from 'native-base';
import {Image} from 'react-native';
import Logo from '../../assets/images/logo.png';

const LoginForm = props => {
    
    return (
        <Container>
        <Image source={require('../../assets/images/logo.png')}
        style={{
            height: '25%',
            width: '75%',
            alignSelf: 'center'
        }}
        resizeMode="cover" />
            <Content>
                <Form>
                <Item floatingLabel>
                    <Icon name="ios-mail"/>
                    <Label>E-mail</Label>
                    <Input />
                </Item>
                <Item floatingLabel>
                    <Icon name="ios-key" />
                    <Label>Senha</Label>
                    <Input secureTextEntry />
                </Item>
                </Form>
            </Content>
        </Container>
    );
}

export default LoginForm;