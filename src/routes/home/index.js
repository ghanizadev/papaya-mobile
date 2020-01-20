import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, View, ScrollView
} from 'react-native';
import { Container, Header, Right, Button, Body, Title, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../assets/resources/theme.json';

const Home = props => {

  const {navigation} = props;

  return (
    <Container>
      <Header  style={styles.header} androidStatusBarColor="#e39d07">
        <Body>
          <Title><Text style={styles.maintitle}>Início</Text></Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Icon name="gear" size={24} color="#fff" />
          </Button>
        </Right>
      </Header>

      <ScrollView contentContainerStyle={styles.buttonscrollview}>
        <View style={styles.buttoncontainer}>

          <View style={styles.buttonblock}>
            <Text style={styles.buttonblocktitle}>Mesas</Text>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Mesas Ativas</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Abrir Pedido</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Cancelar Pedido</Text>
            </Button>
          
            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Fechar Pedido</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Lista de espera</Text>
            </Button>
          </View>

          <View style={styles.buttonblock}>

            <Text style={styles.buttonblocktitle}>Cardápio</Text>
            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Cardápio do dia</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Pesquisar</Text>
            </Button>

          </View>

          <View style={styles.buttonblock}>

            <Text style={styles.buttonblocktitle}>Entregas</Text>
            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Nova Entrega</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Deliveries")}}
            ><Text style={styles.mainbuttontext}>Acompanhar Entrega</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Cancelar Entrega</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Reclamações</Text>
            </Button>

          </View>

          <View style={styles.buttonblock}>

            <Text style={styles.buttonblocktitle}>Clientes</Text>
            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Adicionar Cliente</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Alterar Cliente</Text>
            </Button>

            <Button
            rounded
            style={styles.mainbutton}
              onPress={()=> {props.navigation.navigate("Tables")}}
            ><Text style={styles.mainbuttontext}>Detalhamento</Text>
            </Button>

          </View>

        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  mainbutton: {
    height: 50,
    width: '85%',
    padding: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.main.button.active,
  },
  mainbuttontext: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonscrollview: {
    alignItems: 'center'
  },
  buttoncontainer:{
    width: '100%',
    padding: 15,
  },
  buttonblock:{
    width: '100%',
    borderColor: theme.main.border,
    borderWidth: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
    marginVertical: 8
  },
  maintitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.main.title,
  }, 
  buttonblocktitle: {
    fontSize: 12,
    height: 20,
    margin: "auto",
    fontWeight: 'bold',
    color: theme.main.text.medium,
    position: "absolute",
    top: -10,
    left: 25,
    backgroundColor: theme.main.background,
  },
  header: {
    backgroundColor: theme.main.foreground,
  },
  closebutton: {
    backgroundColor: theme.main.close,
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    fontSize: 12,
    color: theme.main.text.light,
    top: 15,
    right: 15,
  }
});

export default Home;
