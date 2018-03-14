import React from 'react';
import { Provider } from 'react-redux'

import App from 'screens/App';

import Store from './Store';

const Root = () => (
    <Provider store={Store()}>
      <App />
    </Provider>
);

export default Root;
