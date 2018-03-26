const { rollupPlugin } = require('../../build/rollup/rollup-plugin-config')
// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
const scope = process.argv[5] || ''
let file = './index.rollup.js'
if (scope) {
  file = `../../components/${scope}/test/*.spec.js`
}

module.exports = function(config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    singleRun: true,
    browsers: ['PhantomJS'],
    // basePath: '../../',
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [{
      pattern: file,
      watched: false,
    }],
    preprocessors: {
      // './index.js': ['webpack', 'sourcemap'],
      // 'components/*/test/*.spec.js': ['rollup'],
      [file]: ['rollup']
      // [`components/${scope}/!(demo)/*.vue`]: ['coverage'],
      // 'components/!(_util)/*.js': ['coverage'],
    },
    client: {
      clearContext: true,
    },
    rollupPreprocessor: {
      output: {
        // file: 'bundle.js',
        format: 'iife',
        name: 'mand',
        // sourcemap: 'inline',
      },
      plugins: rollupPlugin,
    },
    coverageReporter: {
      dir: '../../docs/coverage',
      reporters: [{type: 'lcov', subdir: '.'}, {type: 'text'}],
      includeAllSources: false,
    },
  })
}
