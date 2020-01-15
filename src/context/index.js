import React, {useState} from 'react';
import {View} from 'react-native';

const config = {
  serverData: [],
  setServerData: () => {},
};

const Context = React.createContext(config);

const Provider = props => {
  const setServerData = newConfig => {
    setState({...state, serverData: newConfig});
  };

  const [state, setState] = useState({...config, setServerData});

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};

const Consumer = props => <Context.Consumer>{props.children}</Context.Consumer>;

export {Context, Provider, Consumer};
