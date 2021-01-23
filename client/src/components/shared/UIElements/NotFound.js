import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1
        className="x-large text-primary"
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p style={{ textAlign: 'center' }} className="large">
        Sorry, this page does not exist
      </p>
    </Fragment>
  );
};

export default NotFound;
