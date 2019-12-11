const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias['testing'] = path.resolve(__dirname, 'testing');
  return config;
};
