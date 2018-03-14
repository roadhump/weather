import React from 'react';
import cx from 'classnames';
import {
  compose,
  withHandlers,
} from 'recompose';

import S from './FavoriteCity.css';

const FavoriteCity = ({name, photoUrl, isSelected, onClick, onClickRemove}) => (
    <div
      className={cx(S.block, {
        'border-dashed-thin': isSelected,
      })}
      role="button"
      onClick={onClick}
    >
      <img
        alt="img"
        className={cx(S.img, 'circle')}
        src={photoUrl}
      />
      <div>{name}</div>
      <button
        className="btn smaller blood-black-gradient silver-text"
        type="button"
        onClick={onClickRemove}
      >
        {'Remove'}
      </button>
    </div>
);

export default compose(
  withHandlers({
    onClickRemove: ({onClickRemove}) => (e) => {

      e.stopPropagation();
      onClickRemove();

    },
  }),
)(FavoriteCity);
