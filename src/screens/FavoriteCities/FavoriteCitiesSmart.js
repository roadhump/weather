import {
  compose,
  withProps,
  withHandlers,
} from 'recompose';
import { connect } from 'react-redux';
import { values } from 'lodash';
import { onMount, renderNothingIf } from '@roadhump/hocs';

import {
  fetch as fetchFavoriteCities,
  remove as removeFromFavorites
} from 'ducks/favoriteCities'
import { fetch as fetchWeather } from 'ducks/weathers';

import FavoritesCities from './FavoritesCities';

export default compose(
  connect(({favoriteCities, weathers}) => ({
    items: values(favoriteCities.index),
    currentCityId: weathers.currentCityId,
  })),
  onMount(({dispatch}) =>
    dispatch(fetchFavoriteCities())),
  withProps(({items, currentCityId}) => ({
    items: items.map((v) => ({
      ...v,
      isSelected: v.id === currentCityId,
    }))
  })),
  withHandlers({
    onSelect: ({dispatch}) => (id) =>
      dispatch(fetchWeather({id})),
    onRemove: ({dispatch}) => (id) =>
      dispatch(removeFromFavorites(id)),
  }),
  renderNothingIf(({items}) => !items.length),
)(FavoritesCities)
