import axios from 'axios';
import qs from 'qs';
import {NetworkInfo} from 'react-native-network-info';
import AsyncStorage from '@react-native-community/async-storage';

const port = '3000';

export const findAllTables = token =>
  axios.get(`http://${global.host}:${port}/api/v1/table`, {
    headers: {Authorization: `Bearer ${token}`},
  });

export const addProduct = (token, orderId, body) =>
  axios.put(`http://${global.host}:${port}/api/v1/order/${orderId}/add`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const findFlavor = (token, name = ' ') =>
  axios.get(`http://${global.host}:${port}/api/v1/flavor?q=${name}`, {
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

  return axios.post(`http://${global.host}:${port}/oauth/token`, body, {
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
    `http://${global.host}:${port}/api/v1/order`,
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

    try {
      AsyncStorage.getItem('host').then(found => {
        axios
          .options(`http://${found}:${port}/status`)
          .then(result => {
            if (result.status === 204) {
              console.log('Server found at ', `${found}`);
              resolve(found);
            }
          })
          .catch(error => {
            console.log('failed! ::', error.message);
            NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
              console.log('Default gateway found! => ', defaultGateway);
              let ip = defaultGateway.split('.');
              ip.pop();
              ip = ip.join('.');

              const recursive = number => {
                console.log(`Trying with ${ip}.${number}:${port}...`);
                return fetch(`http://${ip}.${number}:${port}/status`)
                  .then(result => {
                    if (result.status === 204) {
                      console.log('Server found at ', `${ip}.${number}`);
                      resolve(`${ip}.${number}`);
                    } else if (number < 255) {
                      console.log('failed!');
                      recursive(number + 1);
                    } else {
                      console.log('could not fetch, reason: ', result.text);
                      reject('not found');
                    }
                  })
                  .catch(error => {
                    if (number < 255) {
                      console.log('could not fetch, reason: ', error);
                      recursive(number + 1);
                    } else {
                      reject('not found');
                    }
                  });
              };
              recursive(1);
            });
          });
      });
    } catch (e) {
      reject(e.message);
    }
  });
