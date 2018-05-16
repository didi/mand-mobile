---
title: Custom theme
---

`Mand Mobile` provides a set of UI themes based on `DiDi financial business design specifications` by default. It also supports theme customization. You can freely adjust the colors, fonts, and element sizes to meet the visual requirements in different business scenarios.

<p>
  <img src="http://static.galileo.xiaojukeji.com/static/tms/other/mand-theme.jpg" width="800">
</p>


### Style Variables

`Mand Mobile` style is based on <a href="http://stylus-lang.com/" target="_blank">Stylus</a> and can adjust theme styles through global and component style variables

A complete list of variables can see the <a href="https://github.com/didi/mand-mobile/blob/master/components/_style/mixin/theme.styl" target="_blank">Default Style Variables</a>

### Variable Coverage

You can achieve theme customization by importing component source code and overriding style variables.

* First, install dependencies，`babel-plugin-import stylus stylus-loader css-loader`

```shell
npm install --save-dev babel-plugin-import stylus stylus-loader css-loader
```
* Configure `babel-plugin-import` to ensure that component source code is imported

```javascript
// .babelrc or babel-loader/ts-loader option
{
    "plugins": [
        ["import", {"libraryName": "mand-mobile", "libraryDirectory": "components"}],
    ]
}
```
* Create a custom theme file, such as `theme.custom.styl`

```stylus
@import '~mand-mobile/components/_style/mixin/util'
@import '~mand-mobile/components/_style/mixin/theme'

// Import nib (Optional)
@import '~nib/lib/nib/vendor'
@import '~nib/lib/nib/gradients'

// Override style variables
color-primary = #1AAD19
```

* Configure `webpack` and import custom theme file

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
        include: /node_modules\/mand-mobile/
      },
      // ...
    ]
  },

  plugins: [
    // ...
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          // pxtorem (According to needs of your project)
          use: [poststylus(pxtorem({ rootValue: 100, propWhiteList: [] }))]
        }
      }
    }),
    // ...
  ]
}
```

