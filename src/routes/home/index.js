import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Fab,
  Button,
  Container,
  Body,
  Right,
  Title,
  Header,
  H1,
  Content,
  Form,
  Input,
  Item,
  Label,
  Picker,
  H3,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Image, Modal, ScrollView} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import cash from '../../assets/images/money.png';
import pizza from '../../assets/images/slice.png';
import info from '../../assets/images/info.png';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
7;
import {Context, Consumer} from './context';

const Home = props => {
  const [dataList, setDataList] = useState([
    {
      status: 'BUSY',
      _id: '5e14b6d0cc3edb31e0ffb7c1',
      number: '10',
      order: {
        costumer: 'Visitante',
        user: 'Fg46 - Jean Felipe de Melo',
        tableNumber: 10,
        serviceTax: 23.1,
        items: [
          {
            quantity: 1,
            code: '12*10102090',
            title: '12 - PIZZA SIMPLES GRANDE',
            description: [
              '1010 - MUSSARELA )',
              '2090 - PORTUGUESA (SEM CEBOLA)',
            ],
            price: 55,
            subtotal: 55,
          },
          {
            quantity: 1,
            code: '12*40602110',
            title: '12 - PIZZA SIMPLES GRANDE',
            description: [
              '4060 - SALADA MISTA )',
              '2110 - SARDINHA (SEM MUSSARELA)',
            ],
            price: 55,
            subtotal: 55,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '10*1010',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1010 - MUSSARELA (jcycjycjtycty)'],
            price: 33,
            subtotal: 33,
          },
          {
            quantity: 1,
            code: '12*1010',
            title: '12 - PIZZA SIMPLES GRANDE',
            description: ['1010 - MUSSARELA (SEM TOMATE)'],
            price: 55,
            subtotal: 55,
          },
          {
            quantity: 1,
            code: '10*1070',
            title: '10 - PIZZA SIMPLES PEQUENA',
            description: ['1070 - ANITA'],
            price: 33,
            subtotal: 33,
          },
        ],
        total: 231,
        final: 254.1,
        paid: 0,
        remaining: 254.1,
        change: 0,
        payments: [],
        deliver: false,
        closed: false,
        _id: '5e0f7f7c8126b34ef07a08fb',
        orderId: 'TnO4jh',
        createdAt: '2020-01-03T17:53:00.611Z',
        updatedAt: '2020-01-06T20:38:46.557Z',
        __v: 49,
      },
      createdAt: '2020-01-03T17:53:00.612Z',
    },
  ]);

  const [active, setActive] = useState(false);
  const {navigation} = props;
  const [overlayConfig, setOverlayConfig] = useState({
    visible: false,
    component: <View />,
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <Container>
        <Header style={styles.header} androidStatusBarColor="#e39d07">
          <Body>
            <Title>Mesas</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="refresh" size={24} color="#fff" />
            </Button>
            <Button
              transparent
              onPress={() => {
                navigation.navigate('Settings');
              }}>
              <Icon name="gear" size={24} color="#fff" />
            </Button>
          </Right>
        </Header>
        <SwipeListView
          data={dataList}
          keyExtractor={item => item.order.orderId}
          renderItem={(data, rowMap) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.title}>{`${data.item.number}.${
                  data.item.order.costumer
                }`}</Text>
                <Text style={styles.subtitle}>{`Aberta há ${
                  data.item.createdAt
                }`}</Text>
              </View>
              <View>
                <Text style={styles.total}>Total: </Text>
                <Text style={styles.price}>{`R$ ${data.item.order.final
                  .toFixed(2)
                  .toString()
                  .replace('.', ',')}`}</Text>
              </View>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.hidden}>
              <Button
                style={styles.info}
                onPress={() => {
                  setOverlayConfig({
                    visible: true,
                    component: (
                      <ShowDetails
                        order={data.item.order}
                        close={() =>
                          setOverlayConfig({...overlayConfig, visible: false})
                        }
                      />
                    ),
                  });
                }}>
                <Image source={info} style={styles.icon} resizeMode="contain" />
              </Button>
              <Button
                style={styles.add}
                onPress={() => {
                  setOverlayConfig({
                    visible: true,
                    component: (
                      <AddProducts
                        close={() =>
                          setOverlayConfig({...overlayConfig, visible: false})
                        }
                      />
                    ),
                  });
                }}>
                <Image
                  source={pizza}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </Button>
              <Button style={styles.checkout}>
                <Image source={cash} style={styles.icon} resizeMode="contain" />
              </Button>
            </View>
          )}
          rightOpenValue={-240}
        />
        <Overlay config={overlayConfig} />
      </Container>

      <Fab
        active={active}
        direction="up"
        containerStyle={{overflow: 'hidden', height: 250, padding: 8}}
        style={styles.fab}
        position="bottomRight"
        onPress={() => setActive(!active)}>
        <Icon name="plus" color="#fff" />

        <TouchableHighlight
          style={styles.fabbutton}
          onPress={() => {
            setOverlayConfig({
              visible: true,
              component: (
                <NewOrder
                  close={() =>
                    setOverlayConfig({...overlayConfig, visible: false})
                  }
                />
              ),
            });
          }}>
          <Icon name="pencil-square-o" size={24} color="#fff" />
        </TouchableHighlight>
        <TouchableHighlight style={styles.fabbutton}>
          <Icon name="user-plus" size={24} color="#fff" />
        </TouchableHighlight>
      </Fab>
    </View>
  );
};

const Overlay = props => {
  const {config} = props;
  return (
    <Modal visible={config.visible} animated animationType="fade" transparent>
      <View style={styles.modalcontainer}>{config.component}</View>
    </Modal>
  );
};

const NewOrder = props => {
  const [tables, setTables] = useState(['1', '2', '3']);
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
              <Picker
                selectedValue={currentTable}
                onValueChange={item => setCurrentTable(item)}>
                {tables &&
                  tables.map(table => (
                    <Picker.Item key={table} label={table} value={table} />
                  ))}
              </Picker>
            </Item>
            <Item fixedLabel>
              <Label>Cliente</Label>
              <Input placeholder="Visitante" />
            </Item>
          </Form>
        </Content>
        <Button rounded style={styles.opentablebutton}>
          <Text>Abrir</Text>
        </Button>
      </Container>
      <Button style={styles.closebutton} onPress={() => close()}>
        <Icon name="times" size={16} color="#fff" />
      </Button>
    </View>
  );
};

const ShowDetails = props => {
  const {order, close} = props;
  return (
    <View style={styles.showdetailscontent}>
      <H1>Detalhes</H1>
      <H3>Pedido ID: {order.orderId}</H3>
      <Text style={styles.showdetailsdate}>Data: {order.createdAt}</Text>

      <ScrollView style={styles.showdetailsdescription}>
        <View style={styles.showdetailsitem}>
          <Text>Atendente: {order.user}</Text>
        </View>
        <View style={styles.showdetailsdescription}>
          <Text>Produtos</Text>
        </View>
        {order.items &&
          order.items.map((item, index) => {
            return (
              <Text key={index}>{`    ${item.quantity}x ${item.title}`}</Text>
            );
          })}
        <View style={styles.showdetailsitem}>
          <Text>Total de produtos:</Text>
          <Text>
            R${' '}
            {order.total
              .toFixed(2)
              .toString()
              .replace('.', ',')}
          </Text>
        </View>
        <View style={styles.showdetailsitem}>
          <Text>Taxa de serviço:</Text>
          <Text>
            R${' '}
            {order.serviceTax
              .toFixed(2)
              .toString()
              .replace('.', ',')}
          </Text>
        </View>
        <View style={styles.showdetailsitem}>
          <Text>Total final:</Text>
          <Text>
            R${' '}
            {order.final
              .toFixed(2)
              .toString()
              .replace('.', ',')}
          </Text>
        </View>
      </ScrollView>

      <Button style={styles.closebutton} onPress={() => close()}>
        <Icon name="times" size={16} color="#fff" />
      </Button>
    </View>
  );
};

const AddProducts = props => {
  const [group, setGroup] = useState('');
  const [title, setTitle] = useState('Escolha o que deseja:');
  const {close} = props;

  const getComponent = () => {
    switch (title) {
      case 'Pizza':
        return <Pizza />;
      case 'Pizza Grande':
        return <Flavor max={3} />;
      case 'Pizza Média':
        return <Flavor max={3} />;
      case 'Pizza Pequena':
        return <Flavor max={2} />;
      case 'Escolha o que deseja:':
        return <Pick />;
      default:
        return <View />;
    }
  };

  const Pizza = props => {
    return (
      <View>
        <View style={styles.pizzasizes}>
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
      </View>
    );
  };

  const Pick = props => {
    return (
      <View>
        <Button
          transparent
          style={{flex: 1, width: '100%'}}
          onPress={() => {
            setTitle('Pizza');
          }}>
          <View>
            <Image
              source={require('../../assets/images/pizza.png')}
              style={styles.pickicon}
            />
            <Text style={styles.center}>Pizzas</Text>
          </View>
        </Button>
        <Button transparent style={{flex: 1, width: '100%'}}>
          <View>
            <Image
              source={require('../../assets/images/wine.png')}
              style={styles.pickicon}
            />
            <Text style={styles.center}>Outros</Text>
          </View>
        </Button>
      </View>
    );
  };

  const Flavor = props => {
    const {max} = props;
    return (
      <View>
        <Text>Escolha os sabores:</Text>
        <Text style={styles.showdetailsdate}>(no máximo {max} sabores)</Text>
      </View>
    );
  };

  return (
    <View style={styles.addproductscontent}>
      <H3 style={styles.productitle}>{title}</H3>
      {getComponent()}
      <Button style={styles.closebutton} onPress={() => close()}>
        <Icon name="times" size={16} color="#fff" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 80,
    width: '100%',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
  },
  hidden: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  info: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver',
  },
  add: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1dcc74',
  },
  checkout: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
  },
  total: {
    fontSize: 12,
    color: '#1dcc74',
  },
  price: {
    fontSize: 18,
    color: '#1dcc74',
  },
  header: {
    backgroundColor: '#ffbc2d',
  },
  fab: {
    backgroundColor: 'tomato',
    margin: 8,
  },
  fabbutton: {
    backgroundColor: '#ffbc2d',
  },
  closebutton: {
    backgroundColor: 'tomato',
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    fontSize: 12,
    color: '#fff',
    top: 15,
    right: 15,
  },
  modalcontainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(156, 156, 156, 0.3)',
  },
  newordercontent: {
    padding: 25,
    borderRadius: 5,
    elevation: 5,
    width: '85%',
    height: '35%',
    backgroundColor: '#fff',
  },
  showdetailscontent: {
    padding: 30,
    borderRadius: 5,
    elevation: 5,
    width: '85%',
    maxHeight: '65%',
    backgroundColor: '#fff',
  },
  opentablebutton: {
    backgroundColor: '#ffbc2d',
    position: 'relative',
    bottom: 0,
    justifyContent: 'center',
    overflow: 'scroll',
  },
  showdetailsitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  showdetailsdescription: {
    marginVertical: 15,
  },
  showdetailsdate: {
    fontSize: 10,
    color: 'gray',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  addproductscontent: {
    padding: 50,
    borderRadius: 5,
    elevation: 5,
    width: '85%',
    height: '75%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pizzalarge: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  pickicon: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  pizzamedium: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  pizzasmall: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  pizzaitem: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 8,
    height: 120,
  },
  pizzasizes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  center: {
    textAlign: 'center',
  },
});

export default Home;
