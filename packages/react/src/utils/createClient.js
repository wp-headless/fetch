import Client from '@wp-headless/client';

export default function createClient(endpoint, transport) {
  return new Client(endpoint, transport);
}
