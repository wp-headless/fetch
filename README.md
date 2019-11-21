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