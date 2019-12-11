import React from 'react';
import Context from './Context';

const withPost = WrappedComponent => props => (
  <Context.Consumer>
    {context => <WrappedComponent {...context} {...props} />}
  </Context.Consumer>
);

export default withPost;
