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
|actions|按钮组|Array\<ActionOptions\>|-|-|

#### ActionOptions Props

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|text|文案|String|-|
|disabled|禁用|Boolean|`false`|
|onClick|点击回调|Function(action: ActionOptions)|-|
|type|类型|String|`disabled`为`true`时为`disabled`，否则为`primary`|
|plain|朴素|Boolean|最后一个按钮为`false`，其它为`true`|
|round|圆角|Boolean|`false`|
|icon|按钮图标|String|-|
|iconSvg|按钮svg图标|Boolean|`false`|
|inactive|未激活|Boolean|`false`|
|loading|加载中状态|Boolean|`false`|

#### ActionBar Slots

##### default
左侧文案内容

#### ActionBar Events

##### @click(event, action)
按钮点击事件

|属性 | 说明 | 类型 |
|----|-----|------|
|action|actions列表中与被点击按钮对应的对象|Object: ActionOptions|
