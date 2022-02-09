'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { mbConfig } = require('./bin/utils')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const htmlPluginOption = {
  template: `index.html`,
  title: mbConfig.title,
  subtitle: mbConfig.subtitle,
  logo: mbConfig.favicon,
  chunksSortMode: 'dependency'
}

module.exports = {
  entry: {
    app: [`${mbConfig.output}/config.js`, `./theme/${mbConfig.theme}/main.js`]
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? config.build.assetsPublicPath
    //   : process.env.NODE_ENV === 'testing'
    //     ? '/mand-mobile/'
    //     : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@examples': resolve('../examples'),
      '@theme': resolve('./theme'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('theme'), mbConfig.output]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('../examples/assets/images')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(Object.assign({}, htmlPluginOption, {
      filename: 'index.html',
      // publicPath: '/mand-mobile/',
      publicPath: '/mand-mobile/',
      host: 'github',
    })),
    new HtmlWebpackPlugin(Object.assign({}, htmlPluginOption, {
      filename: 'index.gitee.html',
      publicPath: '/docs/',
      host: 'gitee',
    })),
  ]
}
