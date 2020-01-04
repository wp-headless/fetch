import { useMemo, useContext } from 'react';
import Context from './Context';
import createClient from '../../utils/createClient';

export default function useClient(endpoint, transport) {
  const context = useContext(Context);
  if (context.client) {
    return context.client;
  }
  return useMemo(() => {
    return createClient(endpoint, transport);
  }, []);
}
