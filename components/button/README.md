---
title: Button 按钮
preview: https://didi.github.io/mand-mobile/examples/button
---

按钮组件，可配置多种不同的按钮样式

### 引入

```javascript
import { Button } from 'mand-mobile'

Vue.component(Button.name, Button)
```

### 代码演示
<!-- DEMO -->

### API

#### Button Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|type|按钮类型|String|`primary`|`primary`, `ghost`, `ghost-primary`, `link`|
|size|按钮大小|String|`large`|`large`, `small`。仅在`type`为`ghost/ghost-primary`时生效|
|icon|按钮图标|String|-|可选值请参考组件`Icon`|
|disabled|是否禁用|Boolean|`false`|-|
