const path = require('path')
const os = require('os')
const fs = require('fs')
const aliasPlugin = require('rollup-plugin-alias')
const replacePlugin = require('rollup-plugin-replace')
const jsonPlugin = require('rollup-plugin-json')
const urlPlugin = require('rollup-plugin-url')
const nodeResolvePlugin = require('rollup-plugin-node-resolve')
const vuePlugin = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const common = require('rollup-plugin-commonjs')
const stylusMixin = require('../stylus-mixin')
const builtins = require('rollup-plugin-node-builtins')
const uglify = require('rollup-plugin-uglify')
const nodeGlobals = require('rollup-plugin-node-globals')
const glob = require('rollup-plugin-glob-import')
const progress = require('rollup-plugin-progress')
const fillHtmlPlugin = require('rollup-plugin-template-html')
const filesize = require('rollup-plugin-filesize')
const postcss = require('rollup-plugin-postcss')
// const postcssUrl = require('postcss-url')

const babelrc = require('babelrc-rollup').default

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'testing'
const isDev = !(isProduction || isTest)

function resolve(dir) {
  return path.resolve(__dirname, '../..', dir)
}
const LIB_DIR = resolve('lib')
const PROJECT_DIR = resolve('.')

const tmpDir = os.tmpdir()
const DEV_OUTPUT_DIR = fs.mkdtempSync(`${tmpDir}${path.sep}`)

const tmpTestDir = os.tmpdir()
const TEST_OUTPUT_DIR = fs.mkdtempSync(`${tmpTestDir}${path.sep}`)

function vueWarpper() {
  let distDir = '', fileName = ''
  if (isDev) {
    distDir = DEV_OUTPUT_DIR
    fileName = 'mand-mobile-dev.css'
  } else if (isProduction) {
    distDir = LIB_DIR
    fileName = 'mand-mobile.css'
  } else if (isTest) {
    distDir = TEST_OUTPUT_DIR
    fileName = 'mand-mobile-test.css'
  }
  return vuePlugin({
    css: path.resolve(distDir, fileName),
    stylus: {
      use: [stylusMixin],
    },
  })
}

const vue = vueWarpper()
// const css = cssWarpper()

function conditionHelper(condition, plugins) {
  return condition ? plugins : []
}

const rollupPlugin = [
  // resolve
  ...(conditionHelper(!isDev, [
    aliasPlugin({
      resolve: ['.js', '/index.js', '.css', '.vue', '.svg'], // @TODO '/index.js' hack
      'mand-mobile/components': resolve('components'),
      'mand-mobile/lib': resolve('lib'),
      'mand-mobile': resolve('lib/mand-mobile.esm.js'),
      '@examples/assets/images/bank-zs.svg': resolve('examples/assets/images/bank-zs.svg')
    }),
  ])),
  ...(conditionHelper(isDev, [
    aliasPlugin({
      resolve: ['.js', '/index.js', '.css', '.vue', '.svg'], // @TODO '/index.js' hack
      'mand-mobile/components': resolve('components'),
      'mand-mobile/lib': resolve('lib'),
      'mand-mobile': resolve('components'),
      '@examples/assets/images/bank-zs.svg': resolve('examples/assets/images/bank-zs.svg')
    }),
  ])),
  nodeResolvePlugin({
    extensions: [ '.js', '.json', '.vue' ],
  }),
  ...(conditionHelper(isTest, [
    common({
      exclude: ['components/_util/*.js'],
      namedExports: { 'avoriaz': ['mount', 'shallow'] },
    }),
    glob(),
  ])),

  // inject
  replacePlugin({
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
  }),
  ...(conditionHelper(isTest, [
    builtins(),
    nodeGlobals(),
  ])),

  // resource
  urlPlugin({
    limit: 10 * 1024,
  }),
  jsonPlugin(),
  vue,
  postcss(),
  babel(babelrc({
    addModuleOptions: false,
    findRollupPresets: true,
    addExternalHelpersPlugin: false,
  })),

  // dest
  ...(conditionHelper(isProduction, [
    uglify({
      compress: {},
    }),
  ])),
  ...(conditionHelper(isDev, [
    fillHtmlPlugin({
      template: resolve('examples/index.html'),
      publicPath: '/',
      destFile: path.resolve(DEV_OUTPUT_DIR, 'index.html')
    })
  ])),
  // cli
  progress(),
  ...(conditionHelper(isProduction, [
    filesize(),
  ])),
]

module.exports = {
  LIB_DIR,
  PROJECT_DIR,
  DEV_OUTPUT_DIR,
  rollupPlugin,
}