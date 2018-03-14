import React from 'react';

import Message from './Message';

const photoUrl = 'https://farm3.staticflickr.com/2929/14622765522_5dbd364fec_k.jpg';

const Initial = () => (
  <Message
    photoUrl={photoUrl}
    text={'Sorry, nothing to show. Please search something first.'}
  />
);

export default Initial;
