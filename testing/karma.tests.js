import 'isomorphic-fetch';

let context;

/**
 * Setup testing context for browser tests
 *
 * - We do not test react as its DOM API is already heavily tested.
 * - Integration tests entire functionality within a browser on a live API
 */

/**
 * @note Awaiting merge of IE / Edge bug in fetch-mock to browser test Transport
 */

context = require.context(
  '../packages/client/__tests__/Client',
  true,
  /\.spec\.js$/
);
context.keys().forEach(context);

context = require.context(
  '../packages/client/__tests__/HTTPError',
  true,
  /\.spec\.js$/
);
context.keys().forEach(context);

context = require.context(
  '../packages/client/__tests__/utils',
  true,
  /\.spec\.js$/
);
context.keys().forEach(context);
