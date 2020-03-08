import React from 'react';
import {View, Form, Content, Item, Icon, Label, Input} from 'native-base';
import {StyleSheet} from 'react-native';

const AddDelivery = props => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <Content>
        <Form>
          <Item fixedLabel>
            <Icon name="md-mail" />
            <Label>E-mail</Label>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={()=>{}}
            />
          </Item>
          <Item fixedLabel last>
            <Icon name="md-key" />
            <Label>Senha</Label>
            <Input
            />
          </Item>
        </Form>
      </Content>
        </View>
    );
}

export default AddDelivery;