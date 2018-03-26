module.exports = {
  parserOptions: {ecmaVersion: 8, sourceType: 'module', ecmaFeatures: {jsx: true, experimentalObjectRestSpread: true}},
  env: {es6: true, node: true, browser: true},
  plugins: ['html', 'json'],
  extends: ['eslint-config-aesir-mandatory'],
}
