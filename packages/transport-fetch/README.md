This is a simple HTTP transport layer following the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API. You will need to polyfill or ponyfill `fetch` ino order to use on older browsers and versions of node e.g. https://github.com/developit/unfetch

# Installation

`yarn add @yllet/core @yllet/transport-fetch unfetch`

OR

`npm install @yllet/core @yllet/transport-fetch unfetch`

# Usage

**With unfetch polyfill**
```javascript
import 'unfetch/polyfill'
import Client from '@yllet/core';
import FetchTransport from '@yllet/transport-fetch';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json/',
  transport: new FetchTransport
});
```

**Without polyfill**
```javascript
import Client from '@yllet/core';
import FetchTransport from '@yllet/transport-fetch';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json/',
  transport: new FetchTransport
});
```

# yllet

Please refer to the core [documentation](https://github.com/ylletjs/yllet) for details on how to use the `yllet` client.