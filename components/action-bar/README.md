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

### 使用指南

默认使用`position: fixed`固定在页面底部，为避免遮挡内容区底部预留不小于`100px`的空白（iPhone还需额外增加`constant(safe-area-inset-bottom)`）


### 代码演示
<!-- DEMO -->


### API

#### ActionBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|actions|按钮组|Array<{text, disabled, onClick}>|-|`text`为按钮文案，<br/>`disabled`为是否禁用该按钮，<br/>`onClick`为点击事件响应函数，传参数与`click`事件相同|

#### ActionBar Slots

##### default
左侧文案内容

#### ActionBar Events

##### @click(event, action)
按钮点击事件

|属性 | 说明 | 类型 |
|----|-----|------|
|action|actions列表中与被点击按钮对应的对象|Object: {text, disabled, ...}|
