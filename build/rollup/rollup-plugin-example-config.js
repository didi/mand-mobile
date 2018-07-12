
const path = require('path')
const aliasPlugin = require('rollup-plugin-alias')
const replacePlugin = require('rollup-plugin-replace')
const jsonPlugin = require('rollup-plugin-json')
const urlPlugin = require('rollup-plugin-url')
const nodeResolvePlugin = require('rollup-plugin-node-resolve')
const vuePlugin = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const stylusMixin = require('../stylus-mixin')
const uglify = require('rollup-plugin-uglify')
const progress = require('rollup-plugin-progress')
const fillHtmlPlugin = require('rollup-plugin-template-html')
const filesize = require('rollup-plugin-filesize')
const postcss = require('rollup-plugin-postcss')
const common = require('rollup-plugin-commonjs')
const svgSpritePlugin = require('./rollup-plugin-svg-sprite')
const stylusCompilerPlugin = require('./rollup-plugin-stylus-compiler')
const pkg = require('../../package.json')
// const postcssUrl = require('postcss-url')
const px2rem = require('postcss-pxtorem')

const babelrc = require('babelrc-rollup').default
function resolve(dir) {
  return path.resolve(__dirname, '../..', dir)
}
const LIB_DIR = resolve('lib')
const PROJECT_DIR = resolve('.')
const EXAMPLE_OUTPUT_DIR = resolve('docs/examples')

function vueWarpper() {
  const distDir = EXAMPLE_OUTPUT_DIR
  const fileName = 'mand-mobile-example.css'
  return vuePlugin({
    css: path.resolve(distDir, fileName),
    stylus: {
      use: [stylusMixin],
    },
    postcss: [
      px2rem({ rootValue: 100, propWhiteList: [] })
    ]
  })
}

const vue = vueWarpper()
// const css = cssWarpper()


const rollupPlugin = [
  // resolve
  aliasPlugin({
    resolve: ['.js', '/index.js', '.css', '.vue', '.svg'], // @TODO '/index.js' hack
    'mand-mobile/components': resolve('components'),
    'mand-mobile/lib': resolve('lib'),
    'mand-mobile': resolve('components'),
    '@examples/assets/images/bank-zs.svg': resolve('examples/assets/images/bank-zs.svg')
  }),
  nodeResolvePlugin({
    extensions: [ '.js', '.json', '.vue' ],
  }),

  common({
    include: 'node_modules/**',
  }),

  // inject
  replacePlugin({
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'MAN_VERSION': `"${pkg.version}"`
  }),
  svgSpritePlugin(),
  // resource
  urlPlugin({
    limit: 10 * 1024,
  }),
  jsonPlugin(),
  vue,
  stylusCompilerPlugin({
    fn: stylusMixin,
  }),
  postcss(),
  babel(babelrc({
    addModuleOptions: false,
    findRollupPresets: true,
    addExternalHelpersPlugin: false,
  })),

  // dest
  uglify({
    compress: {},
  }),
  fillHtmlPlugin({
    template: resolve('examples/index.html'),
    publicPath: '/mand-mobile/examples/',
    destFile: path.resolve(EXAMPLE_OUTPUT_DIR, 'index.html')
  }),
  // cli
  progress(),
  filesize(),
]

module.exports = {
  LIB_DIR,
  PROJECT_DIR,
  EXAMPLE_OUTPUT_DIR,
  rollupPlugin,
}
