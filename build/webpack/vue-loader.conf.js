'use strict'
const utils = require('./utils')
const config = require('../../config')
let isProduction = process.env.NODE_ENV === 'production'
if (process.env.NODE_ENV === 'weapp') {
  isProduction = true
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
