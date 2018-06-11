---
title: ActionBar 操作栏
preview: https://didi.github.io/mand-mobile/examples/#/action-bar
---

汇集若干文案或操作按钮的吸底边栏，可用于展示表单信息与提交按钮

### 引入

```javascript
import { ActionBar } from 'mand-mobile'

Vue.component(ActionBar.name, ActionBar)
```

### 代码演示
<!-- DEMO -->


### API

#### ActionBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|actions|按钮组|Array<{text, disabled, onClick}>|-|`text`为按钮文案，<br/>`disabled`为是否禁用该按钮，<br/>`onClick`为点击事件响应函数，传参数与`click`事件相同|
|has-text|是否显示文案|Boolean|是否含有`slot`|文案可通过`slot`传入|


#### ActionBar Events

##### @click(event, action)
按钮点击事件

|属性 | 说明 | 类型 |
|----|-----|------|
|action|actions列表中与被点击按钮对应的对象|Object: {text, disabled, ...}|
