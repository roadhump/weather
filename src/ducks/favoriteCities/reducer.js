import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { omit } from 'lodash';

const loading = handleActions({
  'favoriteCities/fetchStart': {
    next: () => true,
  },
  'favoriteCities/fetchComplete': {
    next: () => false,
  }
}, false);

const error = handleActions({
  'favoriteCities/fetchComplete': {
    throw: (state, {error}) => error,
  }
}, null);

const index = handleActions({
  'favoriteCities/fetchComplete': {
    next: (state, {payload}) => payload,
  },
  'favoriteCities/removeComplete': {
    next: (state, {payload}) => omit(state, payload),
  },
  'favoriteCities/addComplete': {
    next: (state, {payload: item}) => ({
      ...state,
      [item.id]: item
    }),
  }
}, {});

export default combineReducers({
  loading,
  error,
  index,
});
