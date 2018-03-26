const rollup = require('rollup')
const path = require('path')
const {
  LIB_DIR,
  PROJECT_DIR,
  rollupPlugin
} = require('./rollup-plugin-config')

const inputOptions = {
  input: path.resolve(PROJECT_DIR, 'components/index.js'),
  external: ['vue'],
  plugins: rollupPlugin
}
const outputUmdOptions = {
  file: path.resolve(LIB_DIR, 'mand-mobile.umd.js'),
  format: 'umd',
  name: 'mand-mobile'
}

const outputEsOptions = {
  file: path.resolve(LIB_DIR, 'mand-mobile.esm.js'),
  format: 'es',
}

function build() {
  return rollup.rollup(inputOptions)
          .then(bundle => {
            return Promise.all([
              bundle.write(outputUmdOptions).then(() => {
                console.info('build umd module succ')
              }),
              bundle.write(outputEsOptions).then(() => {
                console.info('build es module succ')
              })
            ])
          })
          .catch(err => {
            console.info(err)
            console.info('build error')
          })
}

build()