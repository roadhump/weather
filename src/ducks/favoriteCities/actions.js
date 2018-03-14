import store2 from 'store2';
import { createAction } from 'redux-actions';

const fetchStart = createAction('favoriteCities/fetchStart');
const fetchComplete = createAction('favoriteCities/fetchComplete');

const store = store2.namespace('cities');

export const fetch = () => (dispatch) => {

  dispatch(fetchStart());

  setTimeout(() => {

    dispatch(fetchComplete(store.getAll({})));

  }, 1000)

};

const addComplete = createAction('favoriteCities/addComplete');

export const add = (item) => (dispatch) => {

  store.add(item.id, {
    id: item.id,
    name: item.name,
    photoUrl: item.photoUrl,
  });

  dispatch(addComplete(item));

};

const removeComplete = createAction('favoriteCities/removeComplete');

export const remove = (id) => (dispatch) => {

  store.remove(id);

  dispatch(removeComplete(id));

};
