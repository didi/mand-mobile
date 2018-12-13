const { rollupPlugin, EXAMPLE_OUTPUT_DIR, PROJECT_DIR } = require('./rollup-plugin-example-config')
const rollup = require('rollup')
const path = require('path')
const { resultLog } = require('../utils')

const inputOptions = {
  input: path.resolve(PROJECT_DIR, 'examples/main.js'),
  plugins: rollupPlugin,
  onwarn (warning) {
    // skip certain warnings
    if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
      return
    }
    // throw on others
    if (warning.code === 'NON_EXISTENT_EXPORT') {
      throw new Error(warning.message)
    }
  }
}

const outputCommonjsOptions = {
  file: path.resolve(EXAMPLE_OUTPUT_DIR, 'mand-mobile-example.js'),
  format: 'umd',
}

function build() {
  return rollup.rollup(inputOptions)
  .then(bundle => {
    return bundle.write(outputCommonjsOptions).then(() => {
      resultLog('success', 'Building **Examples** Complete!')
    })
  })
  .catch(err => {
    console.info(err)
    resultLog('error', 'Building **Examples** Fail!')
  })
}

build()