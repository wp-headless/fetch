import React from 'react';
import { Context } from './Context';
import renderChildren from '../renderChildren';

const ClientProvider = ({ client, children }) => {
  const context = { client };
  return (
    <Context.Provider value={context}>
      {renderChildren(children, context)}
    </Context.Provider>
  );
};

export default ClientProvider;
