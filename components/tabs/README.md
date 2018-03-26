---
title: Tabs 标签页
preview: https://didi.github.io/mand-mobile/examples/tabs
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
|titles|标签标题数组|Array|-|传入该数组会直接根据数组内容渲染组件，也可以不使用该属性，直接在控件中插入定制的标题按钮。在不使用scope-slot时，该值为字符串数组；在使用scope-slot时，该值为对象数组，每个对象会作为props供父组件使用|
|show-ink-bar|是否显示下划线|Boolean|true|-|
|ink-bar-length|下划线宽度|Number|`70`|该数值为下划线占标签按钮宽度的百分比，须在0-100之间|
|ink-bar-animate|是否启用下划线动画|Boolean|`true`|-|
|default-index|默认激活的标签索引|Number|`0`|-|
|noslide|动画样式|Boolean|`false`|如果为真，则不显示滑动动画|

#### Tabs Methods

##### selectTab(index)
选择某一标签

|属性 | 说明 | 类型 |
|----|-----|------|
|index|标签索引|Number|

#### Tabs Events

##### @change(index, preIndex)
标签索引发生变化事件

|属性 | 说明 | 类型|
|----|-----|------|
|index|改变后的标签索引|Number|
|preIndex|改变前的标签索引|Number|
