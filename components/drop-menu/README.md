---
title: DropMenu 下拉菜单
preview: https://didi.github.io/mand-mobile/examples/#/drop-menu
---

下拉菜单可用于列表筛选

### 引入

```javascript
import { DropMenu } from 'mand-mobile'

Vue.component(DropMenu.name, DropMenu)
```

### 代码演示
<!-- DEMO -->

### API

#### DropMenu Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|data|数据源|Array<{text, disabled, options, ...}>|`[]`|`disabled`为是否禁用，`options`类型为`Array<{text, disabled, ...}>`|
|defaultValue|初始值|Array<String>|`[]`|-|
|option-render|返回各选项渲染内容|Function({text, disabled, ...}):String|-|`vue 2.1.0+`可使用`slot-scope`，参考`Radio`|

#### DropMenu Methods

##### getSelectedValue(index): listItem
获取某菜单项选中值

|参数 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|index|菜单项索引值|Number|-|

返回

|属性 | 说明 | 类型|
|----|-----|------|
|listItem|选项数据|Object: {text, disabled, options, ...}|

##### getSelectedValues(): listItems
获取所有菜单项选中值

返回

|属性 | 说明 | 类型|
|----|-----|------|
|listItems|选项数据|Array<{text, disabled, options, ...}>|

#### DropMenu Events

##### @change(barItem, listItem)
选中某项事件

|属性 | 说明 | 类型|
|----|-----|------|
|barItem|菜单项数据|Object: {text, disabled, options, ...}|
|listItem|选项数据|Object: {text, disabled, ...}|

##### @show()
下拉菜单展示事件

##### @hide()
下拉菜单隐藏事件
