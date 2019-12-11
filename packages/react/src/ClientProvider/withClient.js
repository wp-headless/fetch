import React from 'react';
import Context from './Context';

const withClient = WrappedComponent => props => (
  <Context.Consumer>
    {context => <WrappedComponent {...context} {...props} />}
  </Context.Consumer>
);

export default withClient;
