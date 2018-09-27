'use strict'
const path = require('path')
const utils = require('./utils')
// const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const threadLoader = require('thread-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
const manifest = require(path.resolve(process.cwd(), 'manifest.json'))
function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}
const threadLoader = require('thread-loader');
threadLoader.warmup({
  // pool options, like passed to loader options
  // must match loader options to boot the correct pool
}, [
  // modules to load
  // can be any module, i. e.
  'vue-style-loader',
  'css-loader',
  'postcss-loader',
]);

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@examples': resolve('examples'),
      'mand-mobile/lib': resolve('components'),
      'mand-mobile/components': resolve('components'),
      'mand-mobile': resolve('components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              quiet: true,
              cache: true,
            }
          }
        ],
        enforce: 'pre',
        include: [resolve('components'), resolve('examples'), resolve('test')],
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ],
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader?cacheDirectory=true'
        ],
        include: [resolve('components'), resolve('examples'), resolve('test')]
      },
      {
        test: /\.css$/,
        use: [
          {
            // loader: 'thread-loader',
            options: {
              workerParallelJobs: 200,
              poolParallelJobs: 500,
              poolTimeout: 2000,
            }
          },
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ],
        include: [resolve('components'), resolve('examples'), resolve('test')]
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workerParallelJobs: 200,
          //     poolParallelJobs: 500,
          //     poolTimeout: 2000,
          //   }
          // },
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: utils.stylusMixins,
              preferPathResolver: 'webpack'
            }
          }
        ],
        include: [resolve('components'), resolve('examples'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('components'), resolve('examples/assets/images')]
      }
    ]
  },
  plugins: [
    new SpeedMeasurePlugin({
      // granularLoaderData: true,
      outputFormat: 'humanVerbose'
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      logLevel: 'info'
    }),
    new VueLoaderPlugin(),
  ]
}
