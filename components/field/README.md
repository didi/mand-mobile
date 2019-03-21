---
title: Field 区域列表组合
preview: https://didi.github.io/mand-mobile/examples/#/field
---

区域列表垂直排列，显示当前的内容、状态和可进行的操作。

### 引入

```javascript
import { Field, FieldItem } from 'mand-mobile'

Vue.component(Field.name, Field)
Vue.component(FieldItem.name, FieldItem)
```

### 代码演示
<!-- DEMO -->

### API

#### Field Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|title|标题|String|-|-|
|brief|描述内容|String|-|-|
|disabled|是否禁用区域|Boolean|`false`|-|
|plain|镂空样式|Boolean|`false`|-|

当使用了`disabled`选项时，其后代内容可以通过[inject](https://vuejs.org/v2/api/#provide-inject)的方式获取祖先`Field`的实例属性。

```javascript
export default {
  name: 'your-component',

  inject: {
    rootField: {
      from: 'rootField',
      default: () => ({})
    }
  },

  computed: {
    disabled() {
      return this.rootField.disabled
    }
  },
}
```

#### Field Slots

##### default
内容默认插槽

##### header
页眉内容插槽

##### action
页眉操作区域插槽

##### footer
页脚内容插槽

---

#### FieldItem Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|title|标题|String|-|-|
|content|描述内容|String|-|-|
|addon|附加文案|String|-|-|
|disabled|是否禁用项目|Boolean|false|-|
|solid|是否固定标题宽度，超出会自动换行|Boolean|false|-|
|arrow|动作箭头标识|Boolean|false|-|

#### FieldItem Events
##### @click(event)
非禁用状态下的点击事件

#### FieldItem Slots

##### default
内容默认插槽

##### left
起始区域插槽

##### right
末尾区域插槽

##### children
额外内容插槽
