const path = require('path')
module.exports = function useMixin(style) {
  return style
    .import(path.join(__dirname, '../components/_style/mixin/*.styl'))
    .import(path.join(__dirname, '../node_modules/nib/lib/nib/vendor'))
    .import(path.join(__dirname, '../node_modules/nib/lib/nib/gradients'))
    .import(path.join(__dirname, '../node_modules/nib/lib/nib/flex'))
}