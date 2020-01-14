import axios from 'axios';
import qs from 'qs';
import Alert from 'react-native-prompt-android';
import AsyncStorage from '@react-native-community/async-storage';

export const findAllTables = token =>
  axios.get(`http://${global.host}/api/v1/table`, {
    headers: {Authorization: `Bearer ${token}`},
  });

export const addProduct = (token, orderId, body) =>
  axios.put(
    `http://${global.host}/api/v1/order/addProducts?id=${orderId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const findFlavor = (token, name = ' ') =>
  axios.get(`http://${global.host}/api/v1/flavor?q=${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const Login = (username, password) => {
  const body = qs.stringify({
    username: username,
    password: password,
    grant_type: 'password',
  });

  return axios.post(`http://${global.host}/oauth/token`, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    auth: {
      username: 'lasolana',
      password: 'minhamarguerita',
    },
  });
};

export const OpenTable = (token, number, costumer = '') =>
  axios.post(
    `http://${global.host}/api/v1/order`,
    {
      tableNumber: number,
      costumer: costumer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const detectHost = () =>
  new Promise((resolve, reject) => {
    console.log('Initializing...');

    const ping = ip => {
      var init = {method: 'OPTIONS', mode: 'cors', cache: 'default'};

      fetch(`http://${ip}/status`, init)
        .then(result => {
          if (result.status === 204) {
            console.log('Server found at ', `${ip}`);
            resolve(ip);
          }
        })
        .catch(error => {
          console.log('Server is currently offline, reason: ', error);
          reject({
            title: 'Erro de conexão',
            message: `Servidor está indisponível (${error})`,
          });
        });
    };

    try {
      AsyncStorage.getItem('host', (error, found) => {
        if (error || found == null) {
          Alert(
            'Servidor',
            'Por favor, insira o código do servidor:',
            input => {
              ping(input);
            },
          );
        } else {
          ping(found);
        }
      });
    } catch (e) {
      reject(e.message);
    }
  });
