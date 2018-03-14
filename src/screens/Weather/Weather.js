import React from 'react';
import { compose, withProps } from 'recompose';
import cx from 'classnames';

const Weather = ({
  cityName,
  description,

  photoUrl,
  icon,

  loading,

  showAddToFavorites,
  onClickAddToFavorites,

  onClick,
}) => (
  <div
    className={
      cx('box-shadow-fat', {
        'blur': loading,
      })
    }
    style={{
      backgroundImage: `url(${photoUrl})`,
      minHeight: 600,
      backgroundSize: 'cover',
    }}
  >
    <div className="row">
      <div className="col s12 m12 l12" role="button" onClick={onClick}>

        <h2 className="text-center vanilla-bean-text brutal-text-neon">{`Weather in ${cityName}`}</h2>

        <div className="courier-new-text huge center vanilla-bean-text brutal-text">
          {description}
        </div>

        <div className="center huge" style={{fontSize: '800%'}}>
          {icon}
        </div>

        {showAddToFavorites ? (
          <div className="center">
            <button className="medium-btn courier-new-text blood-orange-border blood-orange-text" type="button" onClick={onClickAddToFavorites}>
              {'Add to Favorites'}
            </button>
          </div>
        ) : void 0}

      </div>
    </div>
  </div>
);

export default compose(
  withProps(({item, loading, currentItem}) => {

    const cityName = `${item.name}, ${item.sys.country}`;
    const description = `
      ${Math.round(item.main.temp - 273)}°C,
      ${
        item.weather.map(({description}) => description).join(', ')
      }
    `;

    const photoUrl = item.photoUrl;

    const hours = new Date(item.dt).getHours();
    const isNight = hours > 21 && hours < 6;
    let icon;

    if (isNight) icon = '🌙';
    else {
      if (item.clouds.all >= 90) icon = '🌧️';
      else if (item.clouds.all >= 50) icon = '🌧';
      else icon = '☀️'
    }

    return {
      cityName,
      description,
      photoUrl,
      icon,
      showAddToFavorites: !item.isInFavorites,
      loading: loading && !currentItem,
    };

  }),
)(Weather);
