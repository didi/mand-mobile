---
title: TabBar 标签栏
preview: https://didi.github.io/mand-mobile/examples/#/tab-bar
---

用于创建不含内容区域的标签栏

### 引入

```javascript
import { TabBar } from 'mand-mobile'

Vue.component(TabBar.name, TabBar)
```

### 代码演示
<!-- DEMO -->

### API

#### TabBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
| titles | 标签标题数组 | Array | - | 传入该数组会直接根据数组内容渲染组件，也可以不使用该属性，直接在控件中插入定制的标题按钮。在不使用scope-slot时，该值为字符串数组；在使用scope-slot时，该值为对象数组，每个对象会作为props供父组件使用 |
| show-ink-bar | 是否显示下划线 | Boolean | true | - |
| ink-bar-length | 下划线宽度 | Number | 70 | 该数值为下划线占标签按钮宽度的百分比，须在0-100之间 |
| ink-bar-animate | 是否启用下划线动画 | Boolean | true | - |
| default-index | 默认激活的标签索引 | Number | 0 | - |

#### TabBar Methods

##### selectTab(index)
选择某一标签

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
| index | 标签索引 | Number | - |

#### TabBar Events

##### @indexChanged(index, preIndex)
标签索引发生变化

|属性 | 说明 | 类型 |
|----|-----|------|
| index | 改变后的标签索引 | Number |
| preIndex | 改变前的标签索引 | Number |
