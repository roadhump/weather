import React from 'react';

import Message from './Message';

const photoUrl = 'https://farm5.staticflickr.com/4785/26874514668_cb1fe793d4_k.jpg'

const NotFound = () => (
  <Message
    photoUrl={photoUrl}
    text={'Nothing found'}
  />
);

export default NotFound;
