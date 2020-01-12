import React, {useState} from 'react';

const config = {
  serverData: [{}],
  setData: () => {},
};

const Context = React.createContext(config);

const Provider = props => {
  const setData = newConfig => {
    setState({...state, serverData: newConfig});
  };

  const [state, setState] = useState({...config, setData});

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};

const Consumer = props => <Context.Consumer>{props.children}</Context.Consumer>;

export {Context, Provider, Consumer};
