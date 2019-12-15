import React from 'react';
import Context from './Context';
import createClient from '../../utils/createClient';

const ClientProvider = ({ children, transport, ...options }) => {
  const client = createClient(options, transport);
  return <Context.Provider value={{ client }}>{children}</Context.Provider>;
};

export default ClientProvider;
