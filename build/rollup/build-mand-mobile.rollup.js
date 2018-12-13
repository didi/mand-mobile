const rollup = require('rollup')
const path = require('path')
const chalk = require('chalk')
const {
  LIB_DIR,
  PROJECT_DIR,
  rollupPlugin
} = require('./rollup-plugin-config')
// const isSpecial = process.env.BUILD_TYPE === 'special'

const inputOptions = {
  input: path.resolve(PROJECT_DIR, 'components/index.js'),
  external: ['vue'],
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

function build() {
  return rollup.rollup(inputOptions)
  .then(bundle => {
    return Promise.all([
      bundle.write({
        file: path.resolve(LIB_DIR, 'mand-mobile.esm.js'),
        format: 'es',
      }).then(() => {
        console.log('\n' + chalk.green.bold('BUILD ') + chalk.bgGreen.bold('ES BUNDLE') + chalk.green.bold(' SUCCESS'))
      }),
      bundle.write({
        file: path.resolve(LIB_DIR, 'mand-mobile.umd.js'),
        format: 'umd',
        name: 'mand-mobile'
      }).then(() => {
        console.log('\n' + chalk.green.bold('BUILD ') + chalk.bgGreen.bold('UMD BUNDLE') + chalk.green.bold(' SUCCESS'))
      })
    ])
  })
  .catch(err => {
    console.info(err)
    console.log('\n' + chalk.red.bold('BUILD ') + chalk.bgRed.bold('BUNDLE') + chalk.red.bold(' FAIL'))
  })
}

build()