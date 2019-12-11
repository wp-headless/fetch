import React from 'react';

export const Context = React.createContext({});

const withClient = WrappedComponent => props => (
  <Context.Consumer>
    {context => <WrappedComponent {...context} {...props} />}
  </Context.Consumer>
);

export default withClient;
