# WP-Fetch

[![Build Status](https://cloud.drone.io/api/badges/ylletjs/yllet/status.svg)](https://cloud.drone.io/ylletjs/yllet)
[![Coverage Status](https://img.shields.io/codecov/c/github/ylletjs/yllet/master.svg)](https://codecov.io/gh/ylletjs/yllet/branch/master)
![npm (scoped)](https://img.shields.io/npm/v/@yllet/client)
![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@yllet/client)

A javascript client for the Wordpress API that works both in the browser and in Node. The goals of this project are: Tiny footprint, 95% coverage, fully tested down to IE11, CJS and ES6 builds, expressive syntax.

## Installation

The architecture of WP-Fetch allows you to specify your own transport layer such as fetch or axios.

Yarn

```bash
yarn add @wp-fetch/client @wp-fetch/transport-fetch
```

NPM

```bash
npm install @wp-fetch/client @wp-fetch/transport-fetch
```

## Usage

Creating a client instance with transport layer and bound to the endpoint of your Wordpress install:

```javascript
import Client from '@wp-fetch/client';
import FetchTransport from '@wp-fetch/transport-fetch';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json',
  transport: new FetchTransport()
});
```

You may also use another transport layer such as axios:

```javascript
import Client from '@wp-fetch/client';
import AxiosTransport from '@wp-fetch/transport-axios';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json',
  transport: new AxiosTransport()
});
```

Fetching posts using async await:

```javascript
const posts = await client.posts().get();
```

Or with promises:

```javascript
client.posts().get().then(posts => {
  console.log(posts);
});
```
