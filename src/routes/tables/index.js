/* eslint-disable react-native/no-color-literals */
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
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import cash from '../../assets/images/money.png';
import pizza from '../../assets/images/slice.png';
import {TouchableHighlight} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import Pizza from './addPizza'
import Pick from './pickItem';
import Flavor from './addFlavor';
import ShowDetails from './showDetails';
import NewOrder from './newOrder';
import styles from './styles'

import {
  findAllTables,
  findFlavor,
  addProduct,
} from '../../functions';
import {Consumer, Context} from '../../context';

const formatTime = time => {
  
  let factor = new Date().getTime() - new Date(time).getTime();
  factor = factor / 60000;

  if(factor > 60){
      return `${Math.floor(factor/60)}h ${Math.floor(factor - (Math.floor(factor/60) * 60))}m`
  }
  return Math.floor(factor) + ' minuto(s)';

};

const Tables = props => {
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
  }, []);

  return (
    <Consumer>
      {({serverData}) => (
        <View style={StyleSheet.absoluteFill}>
          <Container>
            <Header style={styles.header} androidStatusBarColor="#e39d07">
              <Body>
                <Title><Text style={styles.maintitle}>Mesas</Text></Title>
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
                      data.item.customer
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
    <Modal visible={config.visible} animated animationType="slide" transparent>
      <View style={styles.modalcontainer}>{config.component}</View>
    </Modal>
  );
};

const AddProducts = props => {
  const {order} = props;
  const [title, setTitle] = useState('Escolha o que deseja:');
  const {close} = props;
  const state = useContext(Context);

  const getComponent = () => {
    switch (title) {
      case 'Pizza':
        return <Pizza setTitle={setTitle} />;
      case 'Pizza Grande':
        return <Flavor max={3} pizzaCode={'12'} {...props} />;
      case 'Pizza Média':
        return <Flavor max={3} pizzaCode={'11'} {...props} />;
      case 'Pizza Pequena':
        return <Flavor max={2} pizzaCode={'10'} {...props} />;
      case 'Escolha o que deseja:':
        return <Pick setTitle={setTitle} />;
      default:
        return <View />;
    }
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

export default Tables;
