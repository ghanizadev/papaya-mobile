import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginForm from './login';
import Settings from './settings';
import Home from './home';

const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: LoginForm,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'SignIn',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
