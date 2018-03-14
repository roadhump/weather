import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const loading = handleActions({
  'weathers/fetchStart': {
    next: () => true,
  },
  'weathers/fetchComplete': {
    next: () => false,
  }
}, false);

const error = handleActions({
  'weathers/fetchComplete': {
    next: () => null,
    throw: (state, {error}) => error,
  }
}, null);

const latestCityId = handleActions({
  'weathers/fetchComplete': {
    next: (state, {payload}) => payload.id,
  }
}, null);

const currentCityId = handleActions({
  'weathers/fetchStart': {
    next: (state, {payload: {id}}) => id || null,
  }
}, null);

const byCityId = handleActions({
  'weathers/fetchComplete': {
    next: (state, {payload}) => ({
      ...state,
      [payload.id]: {
        ...payload,
        photoUrl: state[payload.id] ? state[payload.id].photoUrl : payload.photoUrl,
      },
    }),
  }
}, {});

export default combineReducers({
  loading,
  error,
  latestCityId,
  currentCityId,
  byCityId,
});
