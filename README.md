<p align="center">
  <img src="https://beam-wordpress-legacy.s3.ap-southeast-2.amazonaws.com/fetch-k9.png" width="200" alt="wp-headless">
  <br />  <br />
  <a href="https://cloud.drone.io/wp-headless/fetch"><img src="https://cloud.drone.io/api/badges/wp-headless/fetch/status.svg" alt="drone"></a>
  <a href="https://codecov.io/gh/wp-headless/fetch/branch/master"><img src="https://img.shields.io/codecov/c/github/wp-headless/fetch/master.svg" alt="Coverage Status"></a>  
  <img src="https://img.shields.io/npm/v/@wp-headless/client" alt="npm">
  <img src="https://img.shields.io/bundlephobia/minzip/@wp-headless/client" alt="Bundle size">
</p>

> (Currently in alpha release - use in production at your own risk)

# Fetch

A Wordpress API client that works both in the browser and in Node. Tiny footprint, > 95% code coverage, [browser tested](https://browserstack.com) down to IE11, tree shakable CJS and ES6 builds, expressive syntax.

## Why?

There are great alternatives such as [wpapi](https://github.com/WP-API/node-wpapi) and [yllet](https://github.com/ylletjs/yllet) although both of these projects have issues:

- Long unresolved [browser issues](https://github.com/WP-API/node-wpapi/issues/438)
- Bloated [packages size](https://bundlephobia.com/result?p=wpapi@0.12.1)
- No [tree-shakable](https://webpack.js.org/guides/tree-shaking/) ESM or CJS build available
- Opinionated API that attempts to do more then is needed.
- Lack of automated browser testing and coverage

We intend to build support lean and well tested packages that fit into the modern ES6 javascript ecosystem.

## Installation

Yarn

```bash
yarn add @wp-headless/client
```

NPM

```bash
npm install @wp-headless/client
```

## Usage

Creating a client instance bound to the endpoint of your Wordpress install:

```javascript
import Client from '@wp-headless/client';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json'
});
```

Fetching posts using async await:

```javascript
const posts = await client.posts().get();
```

Or with promises:

```javascript
client
  .posts()
  .get()
  .then(posts => {
    console.log(posts);
  });
```

### Resources

Client instances provide the following API resource methods:

- `client.categories()`
- `client.comments()`
- `client.media()`
- `client.statuses()`
- `client.posts()`
- `client.pages()`
- `client.settings()`
- `client.tags()`
- `client.taxonomies()`
- `client.types()`
- `client.users()`

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

Its also possible to set global params that will be sent with each request:

```javascript
// Sets single param key/value
client.param('source', 'wp-headless');

// Merges object with current global param values
client.param({
  source: 'wp-headless',
  per_page: 15,
  orderby: 'title'
});
```

To retrieve global params:

```javascript
// Single value
client.param('source'); // wp-headless

// All values
client.params;
```

### Embed data

WordPress API supports embedding of resources and instead of having to provide \_embed=true as a param on every request you can simpley use embed() before any request methods.

More about WordPress API embedding can you read [here](https://developer.wordpress.org/rest-api/using-the-rest-api/linking-and-embedding/#embedding).

```javascript
const posts = await client
  .posts()
  .embed()
  .get({
    slug: 'hello-world'
  });
```

### File uploading

When Uploading a file you can use `client.file(file, [name])` to specify a file or a file buffer to attach to the request with a name (optional).

In the browser:

```javascript
const file = document.getElementById('upload-input').files[0];

const upload = await client
  .media()
  .file(file, 'Puppy Dog')
  .create({
    title: 'Puppy dog with a bone'
  });
```

In Node:

```javascript
const file = fs.createReadStream('test.jpg');

client
  .media()
  .file(file, 'Puppy Dog')
  .create({
    title: 'Puppy dog with a bone'
  });
```

## Transport Layers

The architecture of Fetch allows you to specify your own transport layer such as fetch or axios. This allows devs to use a library that they are familiar with, and perhaps are already using in their app, saving bundle size.

### Fetch

The client uses the [Fetch API Standard](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make requests. This is supported in all modern browsers and newer versions of Node.

To support older browsers you will have to implement a polyfill such as [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) or (isomorphic-unfetch)[https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch]:

```bash
yarn add @wp-headless/client isomorphic-unfetch
```

```javascript
import 'isomorphic-unfetch';
import Client from '@wp-headless/client';

const client = new Client({
  endpoint: 'https://demo.wp-api.org/wp-json'
});
```

## Examples

Examples of usage in a real world application can be found in the `examples` folder.

## Thanks

<a href="https://browserstack.com"><img src="https://beam-wordpress-legacy.s3-ap-southeast-2.amazonaws.com/Browserstack-logo2.png" width="150" alt="BrowserStack Logo"></a>

Thanks to [BrowserStack](https://browserstack.com) for lending us their amazing infrastructure to give us automated browser coverage

<a href="https://drone.io"><img src="https://beam-wordpress-legacy.s3-ap-southeast-2.amazonaws.com/drone-2.png" width="150" alt="BrowserStack Logo"></a>

Thanks to [Drone](https://drone.io/) an incredible pure docker CI/CD platform built on golang for building our stack!
