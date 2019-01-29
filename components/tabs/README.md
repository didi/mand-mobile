---
title: Tabs 标签页
preview: https://didi.github.io/mand-mobile/examples/#/tabs
---

用于创建包含内容区域的标签页

### 引入

```javascript
import { Tabs, TabPane } from 'mand-mobile'

Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
```

### 代码演示
<!-- DEMO -->

### API

#### Tabs Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|双向绑定的标签对象`name`|String|-|-|
|immediate|初始化后立即就触发一次`change`事件|Boolean|`false`|-|

#### TabPane Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|name|唯一键名|String|-|必须|
|label|菜单标题|String|-|必须|
|disabled|是否禁用|Boolean|`false`|-|

#### Tabs Methods

##### reflowTabBar()
重新计算`TabBar`样式布局

#### Tabs Events

##### @change(tab)
当用户选择标签触发

|属性 | 说明 | 类型|
|----|-----|------|
|tab|选中的标签菜单对象|Object:{name: String, label: String, disabled: Boolean}|
