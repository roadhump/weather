import React from 'react';
import cx from 'classnames';

import FavoriteCities from 'screens/FavoriteCities';
import Weather from 'screens/Weather';

import Header from './Header';
import SearchForm from './SearchForm';

import './brutalist/core.css'; // eslint-disable-line import/no-webpack-loader-syntax

import S from './App.css';

const App = () => (
  <div className={S.block}>
    <div className={cx([S.inner, 'container-fluid'])}>
        <Header />
        <SearchForm />
        <FavoriteCities />
        <Weather />
    </div>
  </div>
);

export default App;
