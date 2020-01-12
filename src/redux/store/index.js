import {createStore} from 'redux';
import reducer from '../reducer';

export const configureStore = (initialState = {}) => {
  const store = createStore(reducer, initialState);
  return store;
};

export const store = configureStore();
