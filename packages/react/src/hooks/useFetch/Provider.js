import React from 'react';
import Context from './Context';
import useFetch from '.';

const FetchProvider = ({ children, ...props }) => {
  const value = useFetch(props);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default FetchProvider;
