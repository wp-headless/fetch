const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  cacheDirectory: path.resolve(__dirname, '..', '.jest-cache'),
  coverageDirectory: path.resolve(__dirname, '..', '.jest-coverage'),
  projects: ['<rootDir>/packages/*/jest.config.js'],
  testPathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/lib/'],
  coveragePathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/lib/'],
  coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
};
