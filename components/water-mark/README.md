---
title: WaterMark 水印
preview: https://didi.github.io/mand-mobile/examples/#/water-mark
---

自带水印背景的容器

### 引入

```javascript
import { WaterMark } from 'mand-mobile'

Vue.component(WaterMask.name, WaterMark)
```

### 代码演示
<!-- DEMO -->

### API

#### WaterMask Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|content|水印内容|String|-|复杂内容使用`scoped slot`|
|spacing|水印间距|String|`20vw`|-|
|repeat-x|横向重复|Boolean|`true`|-|
|repeat-y|纵向重复|Boolean|`true`|-|
|rotate|旋转角度|String|`-30`|-|
|opacity|透明度|String|`0.1`|-|

#### WaterMark Slots

##### default
默认内容插错

##### watermark
水印内容scoped插槽

```html
<div slot="watermark" slot-scope="{ coord }">
  <!-- coord.row 行索引 -->
  <!-- coord.col 列索引 -->
</div>
```