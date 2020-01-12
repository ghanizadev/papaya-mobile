import {combineReducers} from 'redux';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {data: action.payload};
    default:
      return state;
  }
};

export default combineReducers({
  data: reducer,
});
