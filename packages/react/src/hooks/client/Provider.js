import React from 'react';
import Context from './Context';
import createClient from '../../utils/createClient';

const ClientProvider = ({ children, endpoint, transport }) => {
  const client = createClient(endpoint, transport);
  return <Context.Provider value={{ client }}>{children}</Context.Provider>;
};

export default ClientProvider;
