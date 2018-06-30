---
title: ActionSheet 动作面板
preview: https://didi.github.io/mand-mobile/examples/#/action-sheet
---

用于提供场景相关的多个操作动作

### 引入

```javascript
import { ActionSheet } from 'mand-mobile'

Vue.component(ActionSheet.name, ActionSheet)
```

### 代码演示
<!-- DEMO -->

### API

#### ActionSheet Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|面板是否可见|Boolean| `false`|-|
|title|面板标题|String|-|-|
|options|面板选项| Array<{text, value}>| `[]`|-|
|default-index|默认选中项| Boolean| `0`|-|
|invalid-index|禁用选择项索引 |Number|`-1`|-|
|cancel-text|取消按钮文案 |String |-|-|
|max-height<sup class="version-after">1.3.0+</sup>|面板最高高度, 超出后可滚动|Number|400|单位`px`|

#### ActionSheet Events

##### @selected(item)
选择事件

|属性 | 说明 | 类型 |
|----|-----|------|
|item| 选中项的值 | Object: {text, value} |

##### @cancel()
取消选择事件

##### @show()
面板展示事件

##### @hide()
面板隐藏事件

#### ActionSheet Static Methods

##### create(props)
静态方法创建操作菜单, 返回ActionSheet实例。可以通过控制实例的`value`属性来控制显示或隐藏操作菜单。

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|value|面板是否立即可见|Boolean| `true`|-|
|title|面板标题|String|-|-|
|options|面板选项| Array<{text, value}>| `[]`|-|
|default-index|默认选中项| Boolean| `0`|-|
|invalid-index|禁用选择项索引 |Number|`-1`|-|
|cancel-text|取消按钮文案 |String |-|-|
|max-height|面板最高高度, 超出后可滚动|Number|400|单位`px`|

##### closeAll()
关闭所有全局操作菜单

##### destroyAll()
关闭并销毁所有全局操作菜单
