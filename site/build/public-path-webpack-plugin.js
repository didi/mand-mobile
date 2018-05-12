function PublicPathWebpackPlugin (options) {
}

PublicPathWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
      if (process.env.NODE_ENV === 'production' && htmlPluginData.body) {
        const body = []
        htmlPluginData.body.forEach(function (tag) {
          console.log(tag)
          if (tag.attributes.src) {
            tag.attributes.src = htmlPluginData.plugin.options.publicPath + tag.attributes.src
          } else if (tag.attributes.href) {
            tag.attributes.href = htmlPluginData.plugin.options.publicPath + tag.attributes.href
          }
        })
      }
      callback(null, htmlPluginData)
    })

  })
}

module.exports = PublicPathWebpackPlugin