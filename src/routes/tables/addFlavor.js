import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Input,
  H3
} from 'native-base';

import {FlatList, Modal} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import {
    findFlavor,
    addProduct,
  } from '../../functions';

import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
    const {max, pizzaCode, close} = props;
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [currentAditionals, setCurrentAditionals] = useState([]);
    const [currentAditional, setCurrentAditional] = useState('');
    const [flavorAditionals, setFlavorAditionals] = useState([]);
    const [modal, setModal] = useState({visible: false, component: <View />});
    const [flavor, setFlavor] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [searchString, setSearchString] = useState('');

    return (
      <View style={{flex: 1, width: '100%'}}>
        <Text style={{alignSelf: 'center'}}>Escolha os sabores:</Text>
        <Text style={{...styles.showdetailsdate, alignSelf: 'center'}}>
          (no máximo {max} sabores)
        </Text>
        <FlatList
          style={styles.pizzaflavortags}
          containerStyle={styles.pizzaflavortagscontainer}
          horizontal
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
          clearTextOnFocus
          placeholder="Pesquise o sabor..."
          style={styles.pizzaflavorsearch}
          onChangeText={setSearchString}
          onEndEditing={()=> {
            if (searchString !== '') {
              AsyncStorage.getItem('token')
                .then(result => {
                  findFlavor(result, searchString).then(flavors => {
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
            AsyncStorage.getItem('token').then(result => {
              addProduct(result, order.orderId, [product])
                .then(load => {console.log("Ok");})
                .catch(error => {
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