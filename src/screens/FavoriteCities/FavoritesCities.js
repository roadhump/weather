import React from 'react';

import FavoriteCity from './FavoriteCity';

const FavoritesCities = ({items, onRemove, onSelect}) => (
  <div className="lemon-lime-gradient box-shadow-thick">
    <div className="row">
      <div className="col s12 m12 l12">
        <div className="row">

            {items.map((v) => (
              <div className="col col-md-2" key={v.id} id={v.id}>
                <FavoriteCity
                  name={v.name}
                  photoUrl={v.photoUrl}
                  isSelected={v.isSelected}
                  onClickRemove={() => onRemove(v.id)}
                  onClick={() => onSelect(v.id)}
                />
              </div>
            ))}

        </div>
      </div>
    </div>
  </div>
);

export default FavoritesCities;
