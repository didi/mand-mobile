'use strict'
const path = require('path')
const config = require('../../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  const stylusMixins = [
    '~nib/lib/nib/vendor',
    '~nib/lib/nib/gradients.styl',
    resolve('../../components/_style/mixin/util.styl')
  ]

  if (isProd) {
    stylusMixins.push(resolve('../../components/_style/mixin/theme.variable.styl'))
  } else {
    stylusMixins.push(resolve('../../components/_style/mixin/theme.components.styl'))
    stylusMixins.push(resolve('../../components/_style/mixin/theme.basic.styl'))
    stylusMixins.push(resolve('../../examples/theme.custom.styl'))
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    stylus: generateLoaders('stylus', {
      import: stylusMixins
    }),
    styl: generateLoaders('stylus', {
      import: stylusMixins
    })
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    if (loaders.hasOwnProperty(extension)) {
      const loader = loaders[extension]
      output.push({
        test: new RegExp('\\.' + extension + '$'),
        use: loader
      })
    }
  }
  return output
}
