// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
const webpackConfig = require('../../build/webpack/webpack.test.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const scope = process.argv[4] || ''
module.exports = function(config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
      [`components/${scope}/!(demo)/*.vue`]: ['coverage'],
      'components/!(_util)/*.js': ['coverage'],
    },
    concurrency: 1,
    webpack: merge(
      {
        plugins: [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"testing"',
              SCOPE: `"${scope}"`,
            },
          }),
        ],
      },
      webpackConfig
    ),
    webpackMiddleware: {
      // noInfo: true
    },
    coverageReporter: {
      dir: '../../output/coverage',
      reporters: [{type: 'lcov', subdir: '.'}, {type: 'text'}],
      includeAllSources: false,
    },
  })
}
