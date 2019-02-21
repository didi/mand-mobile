---
title: ImageViewer 图片查看器
preview: https://didi.github.io/mand-mobile/examples/#/image-viewer
---

用于浏览多张图片，并可对图片进行滑动切换

### 引入

```javascript
import { ImageViewer } from 'mand-mobile'

Vue.component(ImageViewer.name, ImageViewer)
```


### 代码演示
<!-- DEMO -->

### API

#### ImageViewer Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
| v-model | 是否显示查看器 | Boolean | `false` |
| list |展示图片列表 | Array<String> | `[]` | -|
| initial-index | 初始索引值 | Number | `0` | - |
| has-dots | 是否展示图片索引值 | Boolean | `true` | - |

