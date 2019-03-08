const rollup = require('rollup')
const path = require('path')
const { resultLog } = require('../utils')
const {
  LIB_DIR,
  PROJECT_DIR,
  rollupPluginFactory
} = require('./rollup-plugin-config')
// const isSpecial = process.env.BUILD_TYPE === 'special'

const inputOptions = async () => ({
  input: path.resolve(PROJECT_DIR, 'components/index.js'),
  external: ['vue'],
  plugins: await rollupPluginFactory(),
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
})

function ouputBundle(bundle) {
  switch (process.env.BUILD_TYPE) {
    case 'esm':
      return bundle.write({
        file: path.resolve(LIB_DIR, 'mand-mobile.esm.js'),
        format: 'es',
      }).then(() => {
        resultLog('success', 'Build **ES BUNDLE** Complete!')
      })
    case 'umd':
    case 'variables':
      return bundle.write({
        file: path.resolve(LIB_DIR, 'mand-mobile.umd.js'),
        format: 'umd',
        name: 'mand-mobile',
      }).then(() => {
        resultLog('success', 'Build **UMD BUNDLE** Complete!')
      })
    default:
      return null
  }
}

async function build() {
  const input = await inputOptions()
  return rollup.rollup(input)
  .then(bundle => {
    return Promise.all([ouputBundle(bundle)])
  })
  .catch(err => {
    console.info(err)
    resultLog('error', 'Build BUNDLE Fail!')
  })
}

build()