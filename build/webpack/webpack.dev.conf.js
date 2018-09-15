const utils = require('./utils')
const webpack = require('webpack')
const config = require('../../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const DashBoardPlugin = require('webpack-dashboard/plugin')
const pkg = require('../../package.json')
// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })
const pxtoremConfig = pxtorem({ rootValue: 100, propWhiteList: [], minPixelValue: 2 })
const argv = require('yargs').argv

let entry = {
  'index': ['./build/webpack/dev-client', './examples/main.js']
}

if (argv.component) {
  entry = {
    'index': ['./build/webpack/dev-client', './examples/single-component-main.js']
  }
}


module.exports = merge(baseWebpackConfig, {
  entry,
  output: {
    path: config.dev.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new DashBoardPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      'COMPONENT_NAME': `'${argv.component}'`,
      'MAN_VERSION': `'${pkg.version}'`
    }),
    // https://github.com/seaneking/poststylus#webpack
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [poststylus(pxtoremConfig)]
        }
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.dev.index,
      template: './examples/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
