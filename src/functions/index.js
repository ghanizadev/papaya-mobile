import axios from 'axios';
import qs from 'qs';

export const findAllTables = token =>
  axios.get('http://192.168.2.105:3000/api/v1/table', {
    headers: {Authorization: `Bearer ${token}`},
  });

export const addProduct = (token, orderId, body) =>
  axios.put(
    `http://192.168.2.105:3000/api/v1/order/addProducts?id=${orderId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const findFlavor = (token, name = ' ') =>
  axios.get(`http://192.168.2.105:3000/api/v1/flavor?q=${name}`, {
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

  return axios.post('http://192.168.2.105:3000/oauth/token', body, {
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
    'http://192.168.2.105:3000/api/v1/order',
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
