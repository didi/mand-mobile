const { rollupPlugin, EXAMPLE_OUTPUT_DIR, PROJECT_DIR } = require('./rollup-plugin-example-config')
const rollup = require('rollup')
const path = require('path')

const inputOptions = {
  input: path.resolve(PROJECT_DIR, 'examples/main.js'),
  plugins: rollupPlugin,
}

const outputCommonjsOptions = {
  file: path.resolve(EXAMPLE_OUTPUT_DIR, 'mand-mobile-example.js'),
  format: 'umd',
}

function build() {
  return rollup.rollup(inputOptions)
  .then(bundle => {
    return bundle.write(outputCommonjsOptions).then(() => {
      console.info('build example succ')
    })
  })
  .catch(err => {
    console.info(err)
    console.info('build error')
  })
}

build()