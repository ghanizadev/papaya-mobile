import axios from 'axios';
import qs from 'qs';
import Prompt from 'react-native-prompt-android';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const findAllTables = async token => {
  const addr = await AsyncStorage.getItem('host');

  return axios.get(`http://${addr}:3000/api/v1/table`, {
  headers: { Authorization: `Bearer ${token}` },
})
};

export const addProduct = async (token, orderId, body) => {
  const addr = await AsyncStorage.getItem('host');
  
  return axios.put(
  `http://${addr}:3000/api/v1/order/${orderId}/add`,
  body,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  },
)};

export const findFlavor = async (token, name = ' ') => {
  const addr = await AsyncStorage.getItem('host');
  
  return axios.get(`http://${addr}:3000/api/v1/flavor?q=${name}`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
}

export const Login = async (username, password) => {
  const body = qs.stringify({
    username,
    password,
    grant_type: 'password',
  });

  const addr = await AsyncStorage.getItem('host');
  console.log(`http://${addr}:3000/oauth/token`)

  return axios.post(`http://${addr}:3000/oauth/token`, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    auth: {
      username: 'lasolana',
      password: 'minhamarguerita',
    },
    validateStatus: status => status < 500
  });
};

export const OpenTable = async (token, number, costumer = '') => {
  const addr = await AsyncStorage.getItem('host');

  return axios.post(
  `http://${addr}:3000/api/v1/order`,
  {
    tableNumber: number,
    costumer,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  },
);
}

export const detectHost = () => {
  const ping = ip => {
    const init = { method: 'OPTIONS' };
    return fetch(`http://${ip}:3000/status`, init);
  };

  try {
    AsyncStorage.getItem('host')
    .then(found => {
      if (found == null) {
        Prompt(
          'Servidor',
          'Por favor, insira o código do servidor:',
          (input) => {
            const result = input.split(':').map( str => parseInt(str.toLowerCase(), 16)).join('.');
            ping(result).then(async response => {
              if(response.status !== 200) throw new Error('Cannot reach');

              Alert.alert('Conectado!', `Servidor encontrado em ${result}`);
              await AsyncStorage.setItem('host', result);
              global.host = result;
            })
          },
          {
            cancelable: false
          }
        );
      } else {
        ping(found)
        .catch(() => {
          Prompt(
            'Servidor',
            'Por favor, insira o código do servidor:',
            (input) => {
              const result = input.split(':').map( str => parseInt(str.toLowerCase(), 16)).join('.');
              ping(result).then(async response => {
                if(response.status !== 200) throw new Error('Cannot reach');

                Alert.alert('Conectado!', `Servidor encontrado em ${result}`);
                await AsyncStorage.setItem('host', result);
                global.host = result;
              })
            },
            {
              cancelable: false
            }
          );
        });
      }
    });
  } catch (e) {
    reject(e.message);
  }
};
