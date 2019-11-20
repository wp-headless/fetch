// Modeled on create-react-app preset
// https://github.com/facebook/create-react-app/tree/master/packages/babel-preset-react-app

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: process.env.BABEL_ENV === 'esm' ? false : 'cjs',
        exclude: ['transform-typeof-symbol']
      }
    ],
    ['@babel/preset-react', { useBuiltIns: true }]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        version: require('@babel/runtime/package.json').version,
        regenerator: true
      }
    ],
    '@babel/plugin-transform-object-assign'
  ]
};
