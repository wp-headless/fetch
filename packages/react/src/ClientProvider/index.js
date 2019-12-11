import React, { useEffect } from 'react';
import Context from './Context';
import createClient from './createClient';
import renderChildren from '../utils/renderChildren';

const ClientProvider = ({ children, transport, ...options }) => {
  const client = createClient(options, transport);
  const context = { client };
  return (
    <Context.Provider value={context}>
      {renderChildren(children, context)}
    </Context.Provider>
  );
};

export default ClientProvider;
