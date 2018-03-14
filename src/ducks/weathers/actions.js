import { createAction } from 'redux-actions';
import { sample } from 'lodash';
import axios from 'axios';

const fetchStart = createAction('weathers/fetchStart');
const fetchComplete = createAction('weathers/fetchComplete');

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  method: 'get',
  params: {
    APPID: process.env.REACT_APP_OPENWEATHERMAP_APP_ID,
  },
});

const getByQuery = (query) =>
  axiosInstance.request({
    url: 'weather',
    params: {
      q: query,
    }
  })

const getByCityId = (cityId) =>
  axiosInstance.request({
    url: 'weather',
    params: {
      id: cityId,
    }
  })

const getByCoords = (coords) =>
  axiosInstance.request({
    url: 'weather',
    params: coords
  });


const getImage = async ({lat, lon}) => {

  const photos = (await axios.request({
    baseURL: 'https://api.flickr.com/services/rest',
    url: '/',
    params: {
      method: 'flickr.photos.search',
      api_key: process.env.REACT_APP_FLICKR_API_KEY,
      lat,
      lon,
      accuracy: 11,
      format: 'json',
      nojsoncallback: 1,
      per_page: 5,
    }
  })).data.photos.photo;

  return sample(photos);

};

export const fetch = ({query, id, coords}) => async (dispatch) => {

  dispatch(fetchStart({query, id, coords}));

  try {

    let data;

    if (query) {

      data = (await getByQuery(query)).data;

    } else if (id) {

      data = (await getByCityId(id)).data;

    } else if (coords) {

      data = (await getByCoords(coords)).data;

    }

    const photo = await getImage(data.coord);

    const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

    dispatch(fetchComplete({
      ...data,
      photoUrl,
    }));

  } catch (e) {

    dispatch(fetchComplete(e));

  }

};
