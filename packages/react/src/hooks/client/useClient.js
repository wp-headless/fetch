import { useContext } from 'react';
import { ClientContext } from './Context';
import createClient from '../../utils/createClient';

export default function useClient(endpoint, transport) {
  const context = useContext(ClientContext);
  if (context.client) {
    return context.client;
  }
  return createClient(endpoint, transport);
}
