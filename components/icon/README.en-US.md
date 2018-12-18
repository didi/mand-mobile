---
title: Icon
preview: https://mand-mobile.github.io/2x-doc/examples/#/icon
---

SVG Icons

### Import

```javascript
import { Icon } from 'mand-mobile'

Vue.component(Icon.name, Icon)
```

### Code Examples
<!-- DEMO -->

### API

#### Icon Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|icon name|String|-|-|
|size|icon size|String|`md`|`xs`, `sm`, `md`, `lg`|
|color|icon color|String|`currentColor`|this color value is set as the value of `fill` on the `svg` icon|
|svg|use svg icon|Boolean|`false`|refer to #Appendix|

### Appendix

As for custom svg icons, you need to use <a href="https://github.com/kisenka/svg-sprite-loader" target="_blank">svg-sprite-loader</a>, svg file name is the icon name.

1. Install Dependencies

```shell
npm install svg-sprite-loader --save-dev
```

2. Webpack Configuration

```javascript
const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.svg$/i,
        loader: 'svg-sprite-loader',
        include: [
          // All svg icons in a path are handled by svg-sprite-loader plugin
          path.resolve(__dirname, 'src/my-project-svg-folder')
        ],
      }
    ]
  }
}
```
3. Import Icons

```vue
<template>
  <div>
    <md-icon name="hello"></md-icon>
    <md-icon name="world"></md-icon>
  </div>
</template>

<script>
import 'src/my-project-svg-folder/hello.svg'
import 'src/my-project-svg-folder/world.svg'
import { Icon } from 'mand-mobile'

export default {
  name: 'icon-demo',
  components: {
    [Icon.name]: Icon
  }
}
</script>
```