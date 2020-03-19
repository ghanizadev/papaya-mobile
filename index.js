import {AppRegistry} from 'react-native';
import App from './src/routes';
import {name as appName} from './app.json';
import {encode, decode} from 'base-64';

global.btoa = encode;
global.atob = decode;

AppRegistry.registerComponent(appName, () => App);
