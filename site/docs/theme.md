---
title: 主题定制
---

`Mand Mobile`默认提供了一套基于`滴滴的金融业务设计规范`的UI主题，同时还支持主题定制。用户可以对颜色、字体、元素尺寸等样式进行自由调整，从而满足在不同业务场景下的视觉需求。

<p>
  <img src="http://static.galileo.xiaojukeji.com/static/tms/other/mand-theme.jpg" width="800">
</p>


### 样式变量

`Mand Mobile`样式基于<a href="http://stylus-lang.com/" target="_blank">Stylus</a>开发，可通过全局和组件的样式变量对主题样式进行调整

完整的变量列表可以查看<a href="https://github.com/didi/mand-mobile/blob/master/components/_style/mixin/theme.styl" target="_blank">默认样式变量</a>

### 变量覆盖

可以通过引入组件源码，覆盖样式变量的方式来实现主题定制

* 首先，项目需要安装依赖，`babel-plugin-import stylus stylus-loader css-loader`

```shell
npm install --save-dev babel-plugin-import stylus stylus-loader css-loader
```
* 配置`babel-plugin-import`， 确保引入组件源码

```javascript
// .babelrc or babel-loader/ts-loader option
{
    "plugins": [
        ["import", {"libraryName": "mand-mobile", "libraryDirectory": "components"}],
    ]
}
```
* 创建自定义主题文件，如`theme.custom.styl`

```stylus
@import '~mand-mobile/components/_style/mixin/util'
@import '~mand-mobile/components/_style/mixin/theme'

// 建议安装并引入css拓展nib
@import '~nib/lib/nib/vendor'
@import '~nib/lib/nib/gradients'
@import '~nib/lib/nib/flex'

// 覆盖样式变量
color-primary = #1AAD19
```

* 配置`webpack`，引入主题文件

```javascript
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')

module.exports = {
	// ...
	module: {
    rules: [
      // ...
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /node_modules\/mand-mobile/
      },
      {
        test: /\.styl$/,
        use: [
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              import:['theme.custom.styl']
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        include: /node_modules\/@didi\/mand-mobile/
      },
      // ...
    ]
  },

  plugins: [
    // ...
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          // pxtorem 配置可根据项目需要而定
          use: [poststylus(pxtorem({ rootValue: 100, propWhiteList: [] }))]
        }
      }
    }),
    // ...
  ]
}
```

