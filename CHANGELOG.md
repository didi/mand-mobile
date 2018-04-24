---
title: 更新日志
---

<!-- CUTOFF -->
### 1.0.8
`2018-04-24`
- Button组件点击事件无需`.native`修饰符
- 为Landscape组件增加`mask-closable`选项

### 1.0.6
`2018-04-20`
- 修复issue#29

### 1.0.5
`2018-04-18`
- 修复issue#24

### 1.0.4
`2018-04-12`
- 修复components/index.js

### 1.0.2
`2018-04-12`
- 注入全局变量version

### 1.0.1
`2018-04-12`
- 修复错误的main指向

### 1.0.0
`2018-04-11`
- 正式公开发布

### 0.4.13

`2018-01-19`

- **Feature**
  - `ActionBar`属性`has-text`默认值为是否存在`slot`，即如果使用插槽可忽略`has-text`

- **Fix**
  - 修复`DatePicker`月份`undefined` #26
  - 修复`Icon`部分安卓机无法展示内置SVG问题 #27
  - 修复`ActionBar`的`Props`默认值设置无效 #28
  - 修复`TabPicker`在安卓`6.1`异步级联滑动问题


### 0.4.8

`2018-01-16`

- **Feature**

  - 新增组件`Codebox`, `Cashier`, `Chart`
  - `FieldItem`的属性`customized`默认值为是否存在`slot`，即如果使用插槽可忽略`customized` #23
  - `InputItem`新增属性`is-title-latent`用于支持表单标题延迟显示
  - `Radio`的`v-model`绑定由`options: Array<{text, value}>`中的`text`修改为`value`
  - `NumberKeyboard`新增属性`type`和`is-view`用于支持不同主题和键盘页面内嵌展示

- **Fix**
  - 修复`PopupTitleBar`无法引入
  - 修复`ImageViewer`部分安卓机无法关闭问题 #20
  - 修复`Picker`的`refresh`方法导致列表滚动异常 #24
  - 修复`InputItem`输入汉字异常 #25


<!-- CUTOFF -->
### 0.3.0

`2017-12-18`

- **Feature**

  - `Radio`, `Selector`, `DropMenu`, `Tabs`, `TabPicker`支持`slot-scope`
  - `TabPicker`新增`data-struct`，`asyncFunc`支持普通，级联和异步三种数据结构
  - `Tip`新增`show/hide`事件
  - `Picker`新增`initial`事件
  - `DatePicker`新增`text-render`钩子方法满足列项内容自定义

- **Fix**
  - 修复`SwiperItem`无法引入错误
  - 修复`InputItem`, `NumberKeyboard`双向绑定异常
  - 修复`Popup`动画监听异常导致`hide`事件可能不会触发
  - 修复`Dialog`和`Toast`被遮盖问题
  - 修复`FieldItem`, `Tag`样式问题

### 0.2.0

`2017-11-28`

- **Feature**

  - 新增组件`Radio`, `DatePicker`, `Captcha`
  - `Field`新增`solid`属性用来固定布局
  - `Steps`新增配置`icon`属性
  - `Agree`新增`slot`用来展示文案

- **Fix**
  - 修复部分文档，样式和错误

<!-- CUTOFF -->
### 0.1.0

`2017-11-21`

- **Feature**

  - 完成开发版开发，用于内部体验和测试
