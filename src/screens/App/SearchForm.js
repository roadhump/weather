import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';

import { fetch as fetchWeather } from 'ducks/weathers';

const SearchForm = ({onSubmit, onChange, value}) => (
  <div className="lemon-lime-gradient box-shadow-thick">
    <div className="row">
      <div className="col s12 m12 l12">
        <form
          style={{
            margin: '5px 10px',
          }}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder={'Enter Your City'}
            className="impact-text huge"
            style={{margin: 0, width: '100%'}}
            onChange={onChange}
            value={value}
          />
        </form>
      </div>
    </div>
  </div>
);

export default compose(
  connect(),
  withState('value', 'onChange'),
  withHandlers({
    onChange: ({onChange}) => (e) =>
      onChange(e.target.value),
    onSubmit: ({onSubmit, value, dispatch}) => (e) => {

      e.preventDefault();

      dispatch(fetchWeather({query: value}))

    }
  }),
)(SearchForm);
