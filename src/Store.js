import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import favoriteCities from 'ducks/favoriteCities';
import weathers from 'ducks/weathers';

export default () => {

  return createStore(
    combineReducers({
      favoriteCities,
      weathers,
    }),
    void 0,
    compose(
      applyMiddleware(thunk),
    ),
  );

};
