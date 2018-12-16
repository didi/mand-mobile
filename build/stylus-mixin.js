const path = require('path')
const isSpecial = process.env.BUILD_TYPE === 'special'

module.exports = function useMixin(style) {
  if (process.env.BUILD_TYPE === 'variables') {
    return style
    .import(path.join(__dirname, '../components/_style/mixin/theme.variable.styl'))
    .import(path.join(__dirname, '../components/_style/mixin/theme.components.styl'))
    .import(path.join(__dirname, '../components/_style/mixin/theme.basic.styl'))
    .import(path.join(__dirname, '../components/_style/mixin/util.styl'))
    .import(path.join(__dirname, '../node_modules/nib/lib/nib/vendor'))
    .import(path.join(__dirname, '../node_modules/nib/lib/nib/gradients'))
  } else {
    return style
    .import(path.join(__dirname, '../components/_style/mixin/theme.components.styl'))
    .import(path.join(__dirname, '../components/_style/mixin/theme.basic.styl'))
    .import(path.join(__dirname, '../components/_style/mixin/util.styl'))
    .import(path.join(__dirname, '../node_modules/nib/lib/nib/vendor'))
    .import(path.join(__dirname, '../node_modules/nib/lib/nib/gradients'))
  }
}