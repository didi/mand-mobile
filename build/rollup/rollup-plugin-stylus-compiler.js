const stylus = require('stylus')
const path = require('path')
const {createFilter} = require('rollup-pluginutils')
module.exports = function svgSprite(options = {
  fn: () => {}
}) {
  const filter = createFilter( options.include, options.exclude );
  return {
    name: 'rollup-plugin-stylus-compiler',
    transform(source, id) {
      if (!(filter(id))) {
        return
      }
      const ext = path.extname(id)
      if (ext !== '.styl') {
        return
      }
      return new Promise((resolve, reject) => {
        stylus(source)
        .set('filename', id)
        .define('url', stylus.url())
        .use(options.fn)
        .render((err, css) => {
          if (err) {
            reject(err)
          }
          resolve(css)
        })
      })
    } 
  }
}