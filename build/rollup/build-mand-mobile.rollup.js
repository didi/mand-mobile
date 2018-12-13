const rollup = require('rollup')
const path = require('path')
const {
  LIB_DIR,
  PROJECT_DIR,
  rollupPlugin
} = require('./rollup-plugin-config')
const isSpecial = process.env.BUILD_TYPE === 'special'

const inputOptions = {
  input: path.resolve(PROJECT_DIR, 'components/index.js'),
  external: ['vue'],
  plugins: rollupPlugin
}

function build() {
  return rollup.rollup(inputOptions)
  .then(bundle => {
    return Promise.all([
      bundle.write({
        file: path.resolve(LIB_DIR, 'mand-mobile.esm.js'),
        format: 'es',
      }).then(() => {
        console.info('Build ES Module')
      }),
      bundle.write({
        file: path.resolve(LIB_DIR, 'mand-mobile.umd.js'),
        format: 'umd',
        name: 'mand-mobile'
      }).then(() => {
        console.info('Build UMD Module Success')
      })
    ])
  })
  .catch(err => {
    console.info(err)
    console.info('build error')
  })
}

build()