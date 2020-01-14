import React, {useState, useEffect, useContext} from 'react';
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
  H3,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import cash from '../../assets/images/money.png';
import pizza from '../../assets/images/slice.png';
import {TouchableHighlight} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import {
  findAllTables,
  findFlavor,
  addProduct,
  OpenTable,
} from '../../functions';
import {Consumer, Context} from './context';

const formatTime = time => {
  let factor = new Date().getTime() - new Date(time).getTime();
  factor = factor / 60000;

  if (factor <= 1) {
    return 'menos de um minuto';
  } else if (factor <= 2) {
    return '< 2 min';
  } else if (factor <= 3) {
    return '< 3 min';
  } else if (factor <= 5) {
    return '< 5 min';
  } else if (factor <= 10) {
    return '< 10 min';
  } else if (factor <= 15) {
    return '< 15 min';
  } else if (factor <= 20) {
    return '< 20 min';
  } else if (factor <= 25) {
    return '< 25 min';
  } else if (factor <= 30) {
    return '< 30 min';
  } else if (factor <= 35) {
    return '< 35 min';
  } else if (factor <= 40) {
    return '< 40 min';
  } else if (factor <= 45) {
    return '< 45 min';
  } else if (factor <= 50) {
    return '< 50 min';
  } else if (factor <= 55) {
    return '< 55 min';
  } else if (factor <= 60) {
    return '< uma hora';
  } else if (factor > 60 && factor < 120) {
    return 'mais de uma hora';
  } else if (factor > 120) {
    const t = Math.floor(factor / 60);
    return `mais de ${t}h`;
  }
};

const Home = props => {
  const [active, setActive] = useState(false);
  const {navigation} = props;
  const [overlayConfig, setOverlayConfig] = useState({
    visible: false,
    component: <View />,
  });

  const state = useContext(Context);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        findAllTables(token).then(tables => {
          state.setServerData(tables.data);
        });
      })
      .catch(() => {
        Alert.alert('Erro', 'Erro ao requerer a lista de mesas');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Consumer>
      {({serverData}) => (
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
              data={serverData}
              keyExtractor={(item, index) =>
                item.order.orderId || index.toString()
              }
              renderItem={(data, rowMap) => (
                <Button
                  transparent
                  style={styles.row}
                  onPress={() => {
                    setOverlayConfig({
                      visible: true,
                      component: (
                        <ShowDetails
                          order={data.item.order}
                          close={() => {
                            setOverlayConfig({
                              ...overlayConfig,
                              visible: false,
                            });
                          }}
                        />
                      ),
                    });
                  }}>
                  <View>
                    <Text style={styles.title}>{`${data.item.number}.${
                      data.item.order.costumer
                    }`}</Text>
                    <Text style={styles.subtitle}>
                      Aberta há {formatTime(data.item.createdAt)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.total}>Total: </Text>
                    <Text style={styles.price}>{`R$ ${data.item.order.final
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}`}</Text>
                  </View>
                </Button>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.hidden}>
                  <Button
                    style={styles.add}
                    onPress={() => {
                      global.updatable = false;
                      setOverlayConfig({
                        visible: true,
                        component: (
                          <AddProducts
                            order={data.item.order}
                            close={() => {
                              setOverlayConfig({
                                ...overlayConfig,
                                visible: false,
                              });
                            }}
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
                    <Image
                      source={cash}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  </Button>
                </View>
              )}
              rightOpenValue={-160}
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
                global.updatable = false;
                setOverlayConfig({
                  visible: true,
                  component: (
                    <NewOrder
                      close={() => {
                        setOverlayConfig({...overlayConfig, visible: false});
                      }}
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
      )}
    </Consumer>
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

const ShowDetails = props => {
  const {order, close} = props;
  return (
    <View style={styles.showdetailscontent}>
      <H1>Detalhes</H1>
      <H3>Pedido ID: {order.orderId}</H3>
      <Text style={styles.showdetailsdate}>
        {new Date(order.createdAt).toLocaleTimeString()}
      </Text>

      <ScrollView style={styles.showdetailsdescription}>
        <View style={styles.showdetailsitem}>
          <Text>Atendente: {order.user}</Text>
        </View>
        <View style={styles.showdetailsdescription}>
          <Text>Produtos</Text>
        </View>
        {order.items &&
          order.items.map((item, index) => (
            <View>
              <Text key={index}>{`    ${item.quantity}x ${item.title}`}</Text>
              <Text style={styles.showdetailsdate}>
                {item.description.join(', ')}
              </Text>
            </View>
          ))}
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
  const {order} = props;
  const [title, setTitle] = useState('Escolha o que deseja:');
  const {close} = props;

  const getComponent = () => {
    switch (title) {
      case 'Pizza':
        return <Pizza />;
      case 'Pizza Grande':
        return <Flavor max={3} pizzaCode={'12'} {...props} />;
      case 'Pizza Média':
        return <Flavor max={3} pizzaCode={'11'} {...props} />;
      case 'Pizza Pequena':
        return <Flavor max={2} pizzaCode={'10'} {...props} />;
      case 'Pizza Grande Especial':
        return <Flavor max={3} pizzaCode={'21'} {...props} special />;
      case 'Pizza Média Especial':
        return <Flavor max={3} pizzaCode={'22'} {...props} special />;
      case 'Pizza Pequena Especial':
        return <Flavor max={2} pizzaCode={'23'} {...props} special />;
      case 'Escolha o que deseja:':
        return <Pick />;
      default:
        return <View />;
    }
  };

  const Pizza = props => {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <ScrollView style={{height: '100%', width: '100%'}}>
          <View style={styles.pizzasizes}>
            <View style={styles.separator}>
              <Text>Pizzas Simples</Text>
            </View>

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

            <View style={styles.separator}>
              <Text>Pizzas Especiais</Text>
            </View>

            <Button
              transparent
              style={styles.pizzaitem}
              onPress={() => {
                setTitle('Pizza Grande Especial');
              }}>
              <View>
                <Image
                  source={require('../../assets/images/pizza.png')}
                  style={styles.pizzalarge}
                />
                <Text style={styles.center}>Pizza Grande Especial</Text>
                <Text style={styles.center}>com até 3 sabores (12 fatias)</Text>
                <Text style={styles.center}>R$ 55,00</Text>
              </View>
            </Button>
            <Button
              transparent
              style={styles.pizzaitem}
              onPress={() => setTitle('Pizza Média Especial')}>
              <View>
                <Image
                  source={require('../../assets/images/pizza.png')}
                  style={styles.pizzamedium}
                />
                <Text style={styles.center}>Pizza Média Especial</Text>
                <Text style={styles.center}>com até 3 sabores (9 fatias)</Text>
                <Text style={styles.center}>R$ 44,00</Text>
              </View>
            </Button>
            <Button
              transparent
              style={styles.pizzaitem}
              onPress={() => setTitle('Pizza Pequena Especial')}>
              <View>
                <Image
                  source={require('../../assets/images/pizza.png')}
                  style={styles.pizzasmall}
                />
                <Text style={styles.center}>Pizza Pequena Especial</Text>
                <Text style={styles.center}>com até 2 sabores (8 fatias)</Text>
                <Text style={styles.center}>R$ 33,00</Text>
              </View>
            </Button>
          </View>
        </ScrollView>
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
              source={require('../../assets/images/juice.png')}
              style={styles.pickicon}
            />
            <Text style={styles.center}>Outros</Text>
          </View>
        </Button>
      </View>
    );
  };

  const Flavor = props => {
    const {max, pizzaCode, close} = props;
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [currentAditionals, setCurrentAditionals] = useState([]);
    const [currentAditional, setCurrentAditional] = useState('');
    const [flavorAditionals, setFlavorAditionals] = useState([]);
    const [modal, setModal] = useState({visible: false, componen: <View />});
    const [flavor, setFlavor] = useState();
    const [searchResult, setSearchResult] = useState([]);

    return (
      <View style={{flex: 1, width: '100%'}}>
        <Text style={{alignSelf: 'center'}}>Escolha os sabores:</Text>
        <Text style={{...styles.showdetailsdate, alignSelf: 'center'}}>
          (no máximo {max} sabores)
        </Text>
        <FlatList
          style={styles.pizzaflavortags}
          data={selectedFlavors}
          keyExtractor={item => item.code}
          ListEmptyComponent={() => (
            <Text style={styles.showdetailsdate}>
              Nenhum sabor selecionado.
            </Text>
          )}
          renderItem={({item}) => (
            <View style={styles.tagitem}>
              <Text>{item.name}</Text>
              <Button
                transparent
                style={styles.tagclosebutton}
                onPress={() =>
                  setSelectedFlavors(
                    selectedFlavors.filter(flavor => flavor.code !== item.code),
                  )
                }>
                <Icon name="times" size={16} color="#333" />
              </Button>
            </View>
          )}
        />
        <Input
          clearButtonMode="always"
          clearTextOnFocus
          placeholder="Pesquise o sabor..."
          style={styles.pizzaflavorsearch}
          onChangeText={text => {
            if (text !== '') {
              AsyncStorage.getItem('token')
                .then(result => {
                  findFlavor(result, text).then(flavors => {
                    setSearchResult(flavors.data);
                  });
                })
                .catch(error => {
                  console.log(error);
                  Alert.alert('Erro', 'error ao atualizar lista de sabores');
                });
            } else {
              setSearchResult([]);
            }
          }}
        />
        <FlatList
          data={searchResult}
          keyExtractor={item => item.code}
          renderItem={({item}) => {
            return (
              <Button
                transparent
                style={styles.flavorlistitem}
                onPress={() => {
                  setModal({visible: true});
                  setFlavor(item);
                }}>
                <Text style={styles.flavorlistitemtext}>{`${item.code} - ${
                  item.name
                }${
                  item.variation !== 'UNICO' ? ` (${item.variation})` : ''
                }`}</Text>
              </Button>
            );
          }}
        />
        <Modal visible={modal.visible} transparent>
          <View style={styles.modalcontainer}>
            <View style={styles.flavorcontainer}>
              <H3>{flavor && `${flavor.code} - ${flavor.name}`}</H3>
              <Text style={styles.showdetailsdate}>
                Ingredientes:{' '}
                {flavor &&
                  flavor.description.map((item, index, arr) => {
                    if (arr.length === index + 2) {
                      return `${item} E `;
                    } else if (arr.length === index + 1) {
                      return `${item}.`;
                    }
                    return `${item}, `;
                  })}
              </Text>
              <FlatList
                data={currentAditionals}
                style={styles.tagcontainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.tagitem}>
                    <Text>{item}</Text>
                    <Button
                      transparent
                      style={styles.tagclosebutton}
                      onPress={() =>
                        setCurrentAditionals(
                          currentAditionals.filter(
                            aditional => aditional !== item,
                          ),
                        )
                      }>
                      <Icon name="times" size={16} color="#333" />
                    </Button>
                  </View>
                )}
              />
              <Input
                style={styles.pizzaflavorsearch}
                placeholder="Insira adicionais..."
                value={currentAditional}
                onChangeText={setCurrentAditional}
                onEndEditing={e => {
                  if (e.nativeEvent.text === '') {
                    return;
                  }
                  const aditionals =
                    currentAditionals != null ? currentAditionals : [];
                  aditionals.push(currentAditional.toLocaleUpperCase());
                  setCurrentAditional('');
                  setCurrentAditionals(aditionals);
                }}
              />
              <Button
                style={styles.opentablebutton}
                onPress={() => {
                  const current = selectedFlavors || [];
                  const add = flavorAditionals || [];

                  if (current.find(item => item === flavor) != null) {
                    Alert.alert('Erro', 'sabor já adicionado');
                    return;
                  }
                  current.push(flavor);
                  setSelectedFlavors(current);

                  currentAditionals.forEach(item => {
                    add.push(`${flavor.code}:${item}`);
                  });
                  setFlavorAditionals(add);

                  setModal({visible: false});
                  return;
                }}>
                <Text>Adicionar</Text>
              </Button>
              <Button
                style={styles.closebutton}
                onPress={() => setModal({visible: false})}>
                <Icon name="times" size={12} color="#fff" />
              </Button>
            </View>
          </View>
        </Modal>
        <Button
          style={styles.opentablebutton}
          onPress={() => {
            let flavors = '';
            selectedFlavors.forEach(flavor => {
              flavors += flavor.code;
            });
            const product = {
              code: `${pizzaCode}*${flavors}`,
              quantity: 1,
              aditionals: flavorAditionals,
            };
            console.log(order.orderId);
            console.log(product);
            AsyncStorage.getItem('token').then(result => {
              addProduct(result, order.orderId, [product])
                .then(load => console.log(load.data))
                .catch(error => {
                  console.log(error.data);
                  Alert.alert('Erro', 'Erro ao salvar o produto');
                });
            });
            close();
          }}>
          <Text>Adicionar produto</Text>
        </Button>
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
    paddingVertical: 30,
    paddingHorizontal: 10,
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
    marginVertical: 15,
    height: 120,
    width: '100%',
  },
  pizzasizes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  pizzaflavorsearch: {
    borderColor: 'whitesmoke',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    flex: 0,
    width: '100%',
    marginBottom: 15,
  },
  pizzaflavortags: {
    maxHeight: 60,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    marginVertical: 8,
  },
  center: {
    textAlign: 'center',
  },
  separator: {
    height: 32,
    width: '100%',
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flavorcontainer: {
    height: '45%',
    width: '85%',
    position: 'relative',
    padding: 30,
    backgroundColor: '#fff',
  },
  tagcontainer: {
    flex: 1,
    borderRadius: 5,
    borderColor: 'silver',
    borderWidth: 1,
    padding: 5,
    marginVertical: 15,
  },
  tagitem: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
    borderColor: 'whitesmoke',
    borderWidth: 1,
  },
  tagclosebutton: {
    height: 30,
    marginLeft: 3,
  },
  taginput: {
    flex: 1,
    minWidth: 30,
    alignSelf: 'flex-start',
  },
  flavorlistitem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: 'whitesmoke',
    borderRadius: 5,
    borderWidth: 1,
    margin: 3,
  },
  flavorlistitemtext: {
    color: '#777',
  },
});

export default Home;
