
// https://github.com/michael-ciniawsky/postcss-load-config
const browserslist = require('./package.json').browserslist
module.exports = () => ({
  plugins: {
    'postcss-pxtorem': process.env.NODE_ENV !== 'production' ? { rootValue: 100, minPixelValue: 2, propWhiteList: [] } : false,
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
})
