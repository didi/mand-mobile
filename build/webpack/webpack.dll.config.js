const webpack = require('webpack');
const path = require('path')
function resolve(base) {
  return function (append) {
    console.info(path.resolve(base, append))
    return path.resolve(base, append)
  }
}
const _utilResolve = resolve(path.resolve(process.cwd(), 'components/_util'))
const dllDist = resolve(path.resolve(process.cwd()))('dll')
module.exports = {
  entry: {
    vendor: ['vue', 'vue-router'],
    _util: [
      _utilResolve('animate.js'),
      _utilResolve('debug.js'),
      _utilResolve('env.js'),
      _utilResolve('formate-value.js'),
      _utilResolve('index.js'),
      _utilResolve('lang.js'),
      _utilResolve('render.js'),
      _utilResolve('scroller.js'),
      _utilResolve('store.js'),
    ]
  },
  output: {
    publicPath: '/',
    path: dllDist,
    filename: '[name].[chunkhash].dll.js',
    library: '[name]'               // 必填项，将此dll包暴露到window上，给app.js调用
  },
  plugins: [
    new webpack.DllPlugin({
      context: process.cwd(),                // 必填项，用来标志manifest中的路径
      path: './manifest.json',    // 必填项，存放manifest的路径
      name: '[name]'                     // 必填项，manifest的name
    }),
  ]
};