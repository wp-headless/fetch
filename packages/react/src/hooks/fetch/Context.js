import React, { createContext } from 'react';
import { useFetch } from '.';

export const FetchContext = createContext();

export const FetchProvider = ({ children, ...props }) => {
  const value = useFetch(props);
  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
