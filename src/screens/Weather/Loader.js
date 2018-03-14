import React from 'react';
import { compose, withProps } from 'recompose';

const Loader = ({text}) => (
    <div className="center glitch huge chocolate-strawberry">
      {text}
    </div>
);

export default compose(
  withProps(({loadingByCoords, loading}) => {

    let text = 'Loading city... '

    if (loadingByCoords) text = 'Try to get geo coordinates...';

    return {text};

  }),
)(Loader);
