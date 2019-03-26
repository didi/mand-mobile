
// https://github.com/michael-ciniawsky/postcss-load-config
const browserslist = require('./package.json').browserslist
module.exports = () => {
  const plugins = {
    'postcss-url': {url: 'inline'},
    'cssnano': {
      preset: ['default', {
        zindex: false,
        mergeIdents: false,
        discardUnused: false,
        autoprefixer: false,
        reduceIdents: false,
      }]
    },
    'autoprefixer': { browsers: browserslist }
  }

  if (process.env.NODE_ENV !== 'production' || process.env.BUILD_TYPE === 'example') {
    plugins['postcss-pxtorem'] = { rootValue: 100, minPixelValue: 2, propWhiteList: [] }
  }

  return {
    plugins
  }
}
