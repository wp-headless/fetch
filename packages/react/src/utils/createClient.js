import Client from '@wp-headless/client';

export default function createClient(options, transport = undefined) {
  return new Client(options, transport);
}
