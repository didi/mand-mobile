'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../../config')
const merge = require('webpack-merge')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = config.example.env

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    'index': './examples/main.js',
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.example.productionSourceMap,
      extract: true
    })
  },
  devtool: config.example.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.example.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js'),
    publicPath: config.example.assetsPublicPath
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  BUILD EXAMPLES [:bar] :percent (:elapsed seconds)',
      clear: false
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        ascii_only: true
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:7].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.example.index,
      template: './examples/index.html',
      inject: true,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.example.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: [],
            })
          ])]
        }
      }
    })
  ]
})

if (config.example.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.example.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.example.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
