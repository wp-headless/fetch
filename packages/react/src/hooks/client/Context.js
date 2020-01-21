import React, { createContext } from 'react';
import createClient from '../../utils/createClient';

export const ClientContext = createContext({ client: null });

export const ClientProvider = ({ children, endpoint, transport }) => {
  const client = createClient(endpoint, transport);
  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  );
};
