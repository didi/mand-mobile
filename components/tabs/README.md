---
title: Tabs 标签页
preview: https://didi.github.io/mand-mobile/examples/#/tabs
---

用于创建包含内容区域的标签页

### 引入

```javascript
import { Tabs } from 'mand-mobile'

Vue.component(Tabs.name, Tabs)
```

### 代码演示
<!-- DEMO -->

### API

#### Tabs Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|items|标签标题数组|Array<{key: String, label: String}>|-|
|max-length|首屏最多容纳标签数量|Number|5|-|
|has-ink|是否显示下划线|Boolean|true|-|
|ink-length|下划线宽度|Number|`80`|该数值为下划线占标签按钮宽度的百分比，须在0-100之间|
|v-model|双向绑定的标签对象`key`|String|-|-|

#### Tabs Methods

##### reflow()
重新计算样式布局

#### Tabs Events

##### @change(item, index)
标签索引发生变化事件

|属性 | 说明 | 类型|
|----|-----|------|
|item|选中的标签对象|Object|
|index|选中的标签索引|Number|

#### Tabs Slot
```javascript
<md-tabs>
  <template slot="item" slot-scope="{ item, activeKey, index, items }">

  </template>
</md-tabs>
```
