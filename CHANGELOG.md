---
title: 更新日志
toc: hidden
---

### 2.2.0

`2019-04-13`

- Feature
  - 新增`Ruler`组件
  - `ScrollViewRefresh`新增属性`rollerColor`，用于设置下拉刷新是进度条颜色[#366](https://github.com/didi/mand-mobile/issues/399)
  - `WaterMark`组件采用`canvas`渲染水印
  - `Stepper`组件新增`increase`, `decrease`事件

- Fix
  - 修复`Swiper`连续跳转导致索引不正确问题[#366](https://github.com/didi/mand-mobile/issues/366)
  - 修复`Progress`值为`0`时显示问题[#381](https://github.com/didi/mand-mobile/issues/381)

### 2.1.7

`2019-03-22`

- Fix
  - `InputItem`无法侦听插槽内容变动问题
  - `Codebox`在一些手机上无法显示下描边问题

### 2.1.6

`2019-03-15`

- Fix
  - 修复`Swiper`未正确销毁问题[#338](https://github.com/didi/mand-mobile/issues/338)
  - `InputItem`数字键盘参数支持传递字符串引用名[#355](https://github.com/didi/mand-mobile/issues/355)

### 2.1.4

`2019-03-08`

- Feature
  - 优化`Swiper`滚动边界

- Fix
  - 修复一些构建问题
  - 修复`ScrollView`手势滚动边界问题
  - 修复`Popup`连续调用显示隐藏问题[#341](https://github.com/didi/mand-mobile/issues/341)

### 2.1.2

`2019-02-25`

- Fix
  - 修复`ScrollView`在内容不满一屏是无法触发到底的问题[#335](https://github.com/didi/mand-mobile/issues/335)
  - 修复`InputItem`标题浮动时换行的问题

### 2.1.1

`2019-02-23`

- Fix
  - 修复构建时`postcss`未生效的问题，导致`mand-mobile.css`中图片等资源未被做url inline处理。

### 2.1.0

`2019-02-22`

- Feature
  - `Seletor`属性`defaultValue`去除类型限制[#305](https://github.com/didi/mand-mobile/issues/305)
  - `ScrollView`增加属性`immediateCheckEndReaching`，用于控制初始化时就立即触发是否到达底部检查，并在内容不超过容器是也会触发`endReached`，并对事件触发防抖处理[#312](https://github.com/didi/mand-mobile/issues/312)
  - `Picker`和`DatePicker`增加属性`lineHeight`，用于自定义选项高度[#323](https://github.com/didi/mand-mobile/issues/323)
  - `ScrollView`增加属性`touchAngle`，用于限制仅一个方向滚动是的滚动触发角度范围[#326](https://github.com/didi/mand-mobile/issues/326)
  - `Amount`默认使用系统内置字体

- Fix
  - 补充类型声明，修复无默认导出报错
  - 修复`WaterMark`内容区域无法点击的问题[#304](https://github.com/didi/mand-mobile/issues/304)
  - 修复`Swiper`当`isLoop`为`false`且`transition`为`slideY`时无法滑动问题[#311](https://github.com/didi/mand-mobile/issues/311)
  - 修复`TabPicker`滚动或点击穿透的问题[#319](https://github.com/didi/mand-mobile/issues/319)
  - 修复`InputItem`输入过快时偶尔导致光标位置异常的问题[#322](https://github.com/didi/mand-mobile/issues/322)
  - 修复`InputItem`在`Vue 2.6+`中金融键盘闪现问题[#324](https://github.com/didi/mand-mobile/issues/324)
  - 修复部分文档问题

### 2.0.0

`2019-01-30`

- Feature
  - `DetailItem`属性`content`增加支持类型[#285](https://github.com/didi/mand-mobile/issues/285)
  - `Dialog`属性`preventScroll`默认值改为`true`[#286](https://github.com/didi/mand-mobile/issues/286)
  - `Radio`属性`value`增加支持类型[#289](https://github.com/didi/mand-mobile/issues/289)
  - `Icon`的字体图标类型增加无前缀类名[#295](https://github.com/didi/mand-mobile/issues/295)
  - `Check`，`CheckBox`属性`name`，`value`增加支持类型[#297](https://github.com/didi/mand-mobile/issues/297)
  - `InputItem`增加属性`virtual-keyboard-vm`，用于支持外部自定义金融键盘
  - `Cashier`增加插槽`footer`，`channels`增加属性`img`

- Fix
  - 去除`InputItem`内对原生输入框光标位置设置 [#268](https://github.com/didi/mand-mobile/issues/268)
  - 补充`index.d.ts`
  - 修复部分组件样式问题

### 2.0.0-rc.5

`2019-01-04`

- Feature
  - 全量引入时的注册全局组件名增加`PascalCase`[#261](https://github.com/didi/mand-mobile/issues/261)
  - `ScrollView`增加属性`manual-init`和方法`init`
  - `TabBar`, `Tabs`增加属性`immediate`
  - `Swiper`增加属性`transition-duration`

- Fix
  - 修复部分组件样式问题

### 2.0.0-rc.4

`2018-12-21`

- Feature
  - 优化`NumberKeyboard`输入体验
  - `Cashier`增加插槽`scene`
  - `Picker`增加`default-value`[#255](https://github.com/didi/mand-mobile/issues/255)

- Fix
  - 修复`Popup`连续展示隐藏时失效问题
  - 修复`Steps`样式兼容问题
  - 修复`InputItem`样式问题，增大关闭按钮点击区域
  - `Captcha`的`setError`中不再清除已输入内容

### 2.0.0-rc.3

`2018-12-14`

🎉🎉🎉 👏👏👏 更多内容查看 <a href="#/zh-CN/docs/migration">从1.x迁移</a>。

### 1.x

去[GitHub](https://github.com/didi/mand-mobile/blob/1.x/CHANGELOG.md)查看`1.x`的 Change Log。
