
const path = require('path')
const fs = require('fs')
const aliasPlugin = require('rollup-plugin-alias')
const replacePlugin = require('rollup-plugin-replace')
const jsonPlugin = require('rollup-plugin-json')
const urlPlugin = require('rollup-plugin-url')
const nodeResolvePlugin = require('rollup-plugin-node-resolve')
const vuePlugin = require('rollup-plugin-vue')
const css = require('rollup-plugin-css-only')
const babel = require('rollup-plugin-babel')
const stylus = require('stylus')
const stylusMixin = require('../stylus-mixin')
const uglify = require('rollup-plugin-uglify')
const progress = require('rollup-plugin-progress')
const fillHtmlPlugin = require('rollup-plugin-template-html')
const filesize = require('rollup-plugin-filesize')
const postcss = require('rollup-plugin-postcss')
const common = require('rollup-plugin-commonjs')
const svgSpritePlugin = require('./rollup-plugin-svg-sprite')
const findPostcssConfig = require('postcss-load-config')
const stylusCompilerPlugin = require('./rollup-plugin-stylus-compiler')
const pkg = require('../../package.json')
// const postcssUrl = require('postcss-url')

const babelrc = require('babelrc-rollup').default
function resolve(dir) {
  return path.resolve(__dirname, '../..', dir)
}
const LIB_DIR = resolve('lib')
const PROJECT_DIR = resolve('.')
const EXAMPLE_OUTPUT_DIR = resolve('docs/examples')

async function vueWarpper() {
  const distDir = EXAMPLE_OUTPUT_DIR
  const fileName = 'mand-mobile-example.css'
  const {
    options,
    plugins,
  } = await findPostcssConfig({
    env: process.env.NODE_ENV
  })

  return [
    css({
      output(styles) {
        setTimeout(function () {
          fs.writeFileSync(path.resolve(distDir, fileName), styles)
        }, 0)
      }
    }),
    vuePlugin({
      css: false,
      style: {
        postcssOptions: options,
        postcssPlugins: plugins,
        preprocessOptions: {
          stylus: {
            use: [stylusMixin, styl => {
              styl.define('url', stylus.url())
            }],
          },
        }
      }
    })
  ]
}

// const css = cssWarpper()

const rollupPluginFactory = async () =>  {
  const vue = await vueWarpper()
  return [  // resolve
  aliasPlugin({
    resolve: ['.js', '.json', '/index.js', '.css', '.vue', '.svg'], // @TODO '/index.js' hack
    'mand-mobile/components': resolve('components'),
    'mand-mobile/lib': resolve('lib'),
    'mand-mobile': resolve('components'),
    '@examples/assets/images/bank-zs.svg': resolve('examples/assets/images/bank-zs.svg'),
    '@examples/assets/images/tip-package.svg': resolve('examples/assets/images/tip-package.svg')
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
    'process.env.MAND_ENV': `"${process.env.NODE_ENV}"`,
    'MAN_VERSION': `"${pkg.version}"`
  }),
  svgSpritePlugin(),
  // resource
  urlPlugin({
    limit: 10 * 1024,
  }),
  jsonPlugin(),
  ...vue,
  stylusCompilerPlugin({
    fn: stylusMixin,
  }),
  postcss({
    config: {
      path: resolve('postcss.config.js')
    }
  }),
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
    // publicPath: '/mand-mobile/examples/',
    publicPath: '/mand-mobile/examples/',
    destFile: path.resolve(EXAMPLE_OUTPUT_DIR, 'index.html')
  }),
  // cli
  progress(),
  filesize(),
]}

module.exports = {
  LIB_DIR,
  PROJECT_DIR,
  EXAMPLE_OUTPUT_DIR,
  rollupPluginFactory,
}
