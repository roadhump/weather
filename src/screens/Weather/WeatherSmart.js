import {
  compose,
  withHandlers,
  withState,
} from 'recompose';
import { onMount, renderIf } from '@roadhump/hocs';
import { connect } from 'react-redux';
import { values } from 'lodash';

import { fetch as fetchWeather } from 'ducks/weathers';
import { add as addToFavoriteCities } from 'ducks/favoriteCities';

import Weather from './Weather';
import Loader from './Loader';
import NotFound from './NotFound';
import Initial from './Initial';

const getCoords = () => new Promise((resolve, reject) => {

  navigator.geolocation.getCurrentPosition((position) => {

    resolve({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });

  }, reject, {timeout: 5000});

});

const fetchWeatherByFirstFavorite = () => (dispatch, getState) => {

  const {favoriteCities} = getState();

  const favoriteCityId = values(favoriteCities.index).length ? values(favoriteCities.index)[0].id : void 0;

  if (favoriteCityId) {

    dispatch(fetchWeather({
      id: favoriteCityId,
    }));

  };

};

export default compose(
  connect(({weathers, favoriteCities}) => {

    const currentWeather = weathers.currentCityId ? weathers.byCityId[weathers.currentCityId] : void 0;
    const latestWeather = weathers.latestCityId ? weathers.byCityId[weathers.latestCityId] : void 0;

    let item = currentWeather || latestWeather;

    if (item) {

      item = {
        ...item,
        isInFavorites: Boolean(favoriteCities.index[item.id]),
      };

    }

    return {
      item,
      loading: weathers.loading,
      error: weathers.error,
      currentItem: currentWeather,
    };

  }),
  withState('loadingByCoords', 'onLoadingByCoordsChange'),
  onMount(async ({dispatch, onLoadingByCoordsChange}) => {

    onLoadingByCoordsChange(true);

    let coords;

    try {

      coords = await getCoords();

    } catch (e) {

    }

    onLoadingByCoordsChange(false);

    if (coords) {

      dispatch(fetchWeather({coords}));

    } else {

      dispatch(fetchWeatherByFirstFavorite());

    }

  }),

  renderIf(({currentItem, error}) => error && !currentItem, NotFound),
  renderIf(({item, loading, loadingByCoords}) => (loading || loadingByCoords) && !item, Loader),
  renderIf(({item}) => !item, Initial),

  withHandlers({
    onClickAddToFavorites: ({dispatch, item}) => () =>
      dispatch(addToFavoriteCities(item)),
  }),
)(Weather);
