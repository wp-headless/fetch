import Client from '@wp-headless/client';
import FetchTransport from '@wp-headless/transport-fetch';

export default new Client({
  transport: new FetchTransport(),
  endpoint: 'https://demo.wp-api.org/wp-json/wp/v2'
});
