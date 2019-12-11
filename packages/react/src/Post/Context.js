import React from 'react';

export const Context = React.createContext({});

const withPost = WrappedComponent => props => (
  <Context.Consumer>
    {context => <WrappedComponent {...context} {...props} />}
  </Context.Consumer>
);

export default withPost;
