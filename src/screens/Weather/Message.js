import React from 'react';

const Message = ({photoUrl, text}) => (
  <div
    className="box-shadow-fat pool-water"
    style={{
      backgroundImage: `url(${photoUrl})`,
      minHeight: 600,
    }}
  >
    <div className="row">
      <div className="col s12 m12 l12">

        <h2 className="text-center vanilla-bean-text brutal-text-neon">{text}</h2>

      </div>
    </div>
  </div>
);

export default Message;
