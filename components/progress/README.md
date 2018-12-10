---
title: Progress 进度
preview: https://didi.github.io/mand-mobile/examples/#/progress
---

进度圆环，用于将数据直观地传达给用户

### 引入

```javascript
import { Progress } from 'mand-mobile'

Vue.component(Progress.name, Progress)
```

### 代码演示
<!-- DEMO -->

### API

#### Progress Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|value|进度值|Number|`0`|`0-1`|
|size|圆环大小|Number|`70`|单位`px`|
|width|圆环宽度|Number|-|单位`px`|
|color|圆环高亮颜色|String|`#fc9153`|-|
|border-color|圆环颜色|String|`rgba(0, 0, 0, .1)`|-|
|fill|圆环内部填充|String|`transparent`|-|
|linecap|圆环两端形状|String|`round`|`round`, `butt`|
|transition|进度变化是否使用动效|Boolean|`false`|-|
|duration|进度变化动效时长|Number|`1000`|单位`ms`|

#### Progress Slots

##### default
圆环内部内容插槽，一般用于添加文本

##### defs
圆环SVG内部的插槽，一般用于添加`defs`, `use`元素等
