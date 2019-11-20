const webpack = require('webpack');
const path = require('path');

module.exports = build => ({
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test'),
        BROWSER_ENV: JSON.stringify(true)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    fs: 'empty' // Some tests import fs
  },
  resolve: {
    alias: {
      '@yllet/client': path.resolve(__dirname, `node_modules/@yllet/client/lib/${build}`),
      '@yllet/react': path.resolve(__dirname, `node_modules/@yllet/react/lib/${build}`),
      '@yllet/transport-axios': path.resolve(
        __dirname,
        `node_modules/@yllet/transport-axios/lib/${build}`
      ),
      '@yllet/transport-fetch': path.resolve(
        __dirname,
        `node_modules/@yllet/transport-fetch/lib/${build}`
      )
    }
  }
});
