This is a simple HTTP transport layer following the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API. You will need to polyfill or ponyfill `fetch` ino order to use on older browsers and versions of node e.g. https://github.com/developit/unfetch

# Installation

`yarn add @wp-fetch/core @wp-fetch/transport-fetch unfetch`

OR

`npm install @wp-fetch/core @wp-fetch/transport-fetch unfetch`

# Usage

**With unfetch polyfill**
```javascript
import 'unfetch/polyfill'
import Client from '@wp-fetch/core';
import FetchTransport from '@wp-fetch/transport-fetch';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json/',
  transport: new FetchTransport
});
```

**Without polyfill**
```javascript
import Client from '@wp-fetch/core';
import FetchTransport from '@wp-fetch/transport-fetch';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json/',
  transport: new FetchTransport
});
```

# yllet

Please refer to the core [documentation](https://github.com/wp-fetch/wp-fetch) for details on how to use the `yllet` client.