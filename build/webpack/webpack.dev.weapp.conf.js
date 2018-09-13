const utils = require('./utils')
const webpack = require('webpack')
const glob = require('glob')
const config = require('../../config')
const merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')
let vueLoaderConfig = require('./vue-loader.conf')

const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const DashBoardPlugin = require('webpack-dashboard/plugin')
const MpvuePlugin = require('webpack-mpvue-asset-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const pkg = require('../../package.json')

const argv = require('yargs').argv

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

function getEntry (rootSrc, pattern) {
  let files = glob.sync(path.resolve(rootSrc, pattern))
  return files.reduce((res, file) => {
    let info = path.parse(file)
    let key = info.dir.slice(rootSrc.length + 1) + '/' + info.name
    res[key] = path.resolve(file)
    return res
  }, {})
}

const appEntry = {
  app: resolve('./examples/weapp/main.js')
}
const pagesEntry = getEntry(resolve('./components'), '**/**/page.js')
const entry = Object.assign({}, appEntry, pagesEntry)

// 微信小程序解析.vue文件使用mpvue-loader解析
// 所以将webpack.base.conf中的vue-loader切换至mpvue-loader
baseWebpackConfig = merge.smart(baseWebpackConfig, {
  resolve: {
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [resolve('components'), resolve('examples'), resolve('test')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true
            }
          },
        ]
      }
    ]
  }
})

baseWebpackConfig.resolve.alias = {
  'vue': 'mpvue',
  '@examples': resolve('examples'),
  'mand-mobile/lib': resolve('components'),
  'mand-mobile/components': resolve('components'),
  'mand-mobile': resolve('components'),
}

module.exports = merge(baseWebpackConfig, {
  entry,
  target: require('mpvue-webpack-target'),
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.devWeapp.cssSourceMap,
      extract: true
    })
  },
  devtool: '#source-map',
  output: {
    path: config.devWeapp.assetsRoot,
    filename: path.posix.join('', '[name].js'),
    chunkFilename: path.posix.join('', '[id].js'),
    publicPath: config.devWeapp.assetsPublicPath
  },
  plugins: [
    new DashBoardPlugin(),
    new MpvuePlugin(),
    new webpack.DefinePlugin({
      'process.env': config.devWeapp.env,
      'COMPONENT_NAME': `'${argv.component}'`,
      'MAN_VERSION': `'${pkg.version}'`
    }),
    // copy from ./webpack.prod.conf.js
    // extract css into its own f ile
    new ExtractTextPlugin({
      filename: path.posix.join('', '[name].wxss')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        ) || count > 1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/manifest',
      chunks: ['common/vendor']
    }),
    // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../../static'),
    //     to: config.devWeapp.assetsRoot,
    //     ignore: ['.*']
    //   }
    // ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../examples/weapp/*.json'),
        to: path.resolve(__dirname, '../../examples/weapp/example'),
        ignore: ['.*'],
        flatten: true
      }
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
