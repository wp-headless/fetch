<p align="center">
  <img src="https://beam-wordpress-legacy.s3.ap-southeast-2.amazonaws.com/fetch-k9.png" width="200" alt="wp-fetch">
  <br />  <br />
  <a href="https://cloud.drone.io/wp-fetch/wp-fetch"><img src="https://cloud.drone.io/api/badges/wp-fetch/wp-fetch/status.svg" alt="drone"></a>
  <a href="https://codecov.io/gh/wp-fetch/wp-fetch/branch/master"><img src="https://img.shields.io/codecov/c/github/wp-fetch/wp-fetch/master.svg" alt="Coverage Status"></a>  
  <img src="https://img.shields.io/npm/v/@wp-fetch/client" alt="npm">
  <img src="https://img.shields.io/bundlephobia/minzip/@wp-fetch/client" alt="Bundle size">
</p>


# WP-Fetch

Wordpress API client that works both in the browser and in Node. Tiny footprint, > 95% code coverage, [browser tested](https://browserstack.com) down to IE11, tree shakable CJS and ES6 builds, expressive syntax.

## Installation

The architecture of WP-Fetch allows you to specify your own transport layer such as fetch or axios. ([read more](#transport-layers))

Yarn

```bash
yarn add @wp-fetch/client @wp-fetch/transport-fetch
```

NPM

```bash
npm install @wp-fetch/client @wp-fetch/transport-fetch
```

## Usage

Creating a client instance bound to the endpoint of your Wordpress install:

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

### Resources

Client instances provide the following API resource methods:

* `client.categories()`
* `client.comments()`
* `client.media()`
* `client.statuses()`
* `client.posts()`
* `client.pages()`
* `client.settings()`
* `client.tags()`
* `client.taxonomies()`
* `client.types()`
* `client.users()`

These resource methods are simply syntax sugar for setting the path and namespace to an API resource. Therefore the following are equivalent:

```javascript
const post = await client.posts().get(1);
```

```javascript
const post = await client.get('posts/1');
```

Adding custom request methods is easy (example [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)), the following would fetch the enpoint http://demo.wp-api.org/wp-json/wc/v2/products:

```javascript
client.products = () => client.namespace('wc/v2').resource('products');

const products = await client.products().get();
```

Of course you could simply also do the following:

```javascript
const dogBone = await client.namespace('wc/v2').get('products/123');
```

### Methods

Client instances also provide access to HTTP methods to access API resources.

```javascript
client.get(); // Http GET
client.create(); // Http POST
client.update(); // Http PATCH
client.delete(); // Http DELETE
```

### Params

You can pass request parameters as an object to any of the above methods:

```javascript
const post = client.posts().create({ 
  title: 'Hello World!', 
  content: 'Lorem ipsum dolor sit amet...',
  excerpt: 'Etiam at feugiat neque...'
});
```

You may write parameters as camel case or snake case:

```javascript
const post = client.posts().create({ perPage: 10 });

const posts = client.posts().get({ per_page: 10 });
```

Its also possible to set global params that will be sent with each request:

```javascript
// Sets single param key/value
client.param('source', 'wp-fetch');

// Merges object with current global param values
client.param({
  source: 'wp-fetch',
  perPage: 15,
  orderby: 'title'
});
```

To retrieve global params:

```javascript
// Single value
client.param('source'); // wp-fetch

// All values
client.params;
```

### Embed data

WordPress API supports embedding of resources and instead of having to provide _embed=true as a param on every request you can simpley use embed() before any request methods.

More about WordPress API embedding can you read [here](https://developer.wordpress.org/rest-api/using-the-rest-api/linking-and-embedding/#embedding).

```javascript
const posts = await client.posts().embed().get({
  slug: 'hello-world'
});
```

### File uploading

When Uploading a file you can use `client.file(file, [name])` to specify a file or a file buffer to attach to the request with a name (optional).

In the browser:

```javascript
const file = document.getElementById('upload-input').files[0];

const upload = await client.media().file(file, 'Puppy Dog').create({
  title: 'Puppy dog with a bone'
});
```

In Node:

```javascript
const file = fs.createReadStream('test.jpg');

client.media().file(file, 'Puppy Dog').create({
  title: 'Puppy dog with a bone'
});
```

## Transport Layers

The architecture of `wp-fetch` allows for

## Thanks 

<img src="beam-wordpress-legacy.s3-ap-southeast-2.amazonaws.com/Browserstack-logo2.png" width="120" alt="BrowserStack Logo">

![alt text](https://beam-wordpress-legacy.s3-ap-southeast-2.amazonaws.com/Browserstack-logo%402x.png "BrowserStack Logo")

Thanks to [BrowserStack](https://browserstack.com) for lending us their amazing infrastructure to give us automated browser coverage
