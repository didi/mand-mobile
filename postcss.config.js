
// https://github.com/michael-ciniawsky/postcss-load-config
const browserslist = require('./package.json').browserslist
module.exports = (ctx) => {
  const config = {
    plugins: [
      require('postcss-url')({url: 'inline'}),
      require('cssnano')({ zindex: false, mergeIdents: false, discardUnused: false, autoprefixer: false, reduceIdents: false
      }),
      require('autoprefixer')({ browsers: browserslist })
    ]
  }

  if (ctx.env !== 'production') {
    config.plugins.push(require('postcss-pxtorem')({ rootValue: 100, minPixelValue: 2, propWhiteList: [] }))
  }

  return config
}
