'use strict'
const utils = require('./utils')
const config = require('../../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const pkg = require('../../package.json')

const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    'mand-mobile': './components/index.js',
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    library: 'mand-mobile',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.build.cssSourceMap })
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  BUILD MAND_MOBILE [:bar] :percent (:elapsed seconds)',
      clear: false
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
      'MAN_VERSION': `'${pkg.version}'`
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
      filename: utils.assetsPath('[name].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

if (process.env.npm_package_config_analysis) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    // Can be `server`, `static` or `disabled`. 
    // In `server` mode analyzer will start HTTP server to show bundle report. 
    // In `static` mode single HTML file with bundle report will be generated. 
    // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`. 
    analyzerMode: 'server',
    // Host that will be used in `server` mode to start HTTP server. 
    analyzerHost: 'localhost',
    // Port that will be used in `server` mode to start HTTP server. 
    analyzerPort: 8888,
    // Path to bundle report file that will be generated in `static` mode. 
    // Relative to bundles output directory. 
    reportFilename: 'report.html',
    // Module sizes to show in report by default. 
    // Should be one of `stat`, `parsed` or `gzip`. 
    // See "Definitions" section for more information. 
    defaultSizes: 'parsed',
    // Automatically open report in default browser 
    openAnalyzer: true,
    // If `true`, Webpack Stats JSON file will be generated in bundles output directory 
    generateStatsFile: false,
    // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`. 
    // Relative to bundles output directory. 
    statsFilename: 'stats.json',
    // Options for `stats.toJson()` method. 
    // For example you can exclude sources of your modules from stats file with `source: false` option. 
    // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21 
    statsOptions: null,
    // Log level. Can be 'info', 'warn', 'error' or 'silent'. 
    logLevel: 'info'
  }))
}

module.exports = webpackConfig