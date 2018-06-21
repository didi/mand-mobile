---
title: 更新日志
toc: hidden
---

### 1.3.3
`2018-06-15`
- Feature
  - 新增`Toast`自定义位置参数 [#89](https://github.com/didi/mand-mobile/issues/89)
- Fix
  - 修复`InputItem`长度限制

### 1.3.2
`2018-06-11`
- Feature
  - `css varialbe`覆盖率提升

### 1.3.1
`2018-06-08`
- Feature
  - 新增`css varialbe`样式支持
  - `ImageReader`组件新增图片对象参数
  - `Cashier`新增自定义文案
- Fix
  - 修复`InputItem`销毁未删除虚拟键盘问题issue [#104](https://github.com/didi/mand-mobile/issues/104)

### 1.3.0
`2018-06-01`
- Feature
  - `Selector`, `TabPicker`增加`mask-closable`，支持蒙层点击关闭 [#64](https://github.com/didi/mand-mobile/issues/64)
  - `Cashier`更改渠道展示方式，当支付渠道为两个直接展示 [#77](https://github.com/didi/mand-mobile/issues/77)
  - `Capatcha`支持自定义按钮文案，支持通过`auto-countdown`控制验证码是否自动发送 [#84](https://github.com/didi/mand-mobile/issues/84)
  - `ActionSheet`增加`maxHeight`控制展示区域最大高度 [#86](https://github.com/didi/mand-mobile/issues/86)
  - `InputItem`增加类型`Number`, 支持其他Html Input标准类型 [#95](https://github.com/didi/mand-mobile/issues/95)
  - `Picker`，`DatePicker`，`TabPicker`点击取消或蒙层将会撤销选择更改
- Fix
  - 修复`DatePicker`默认时间不在可选范围内的异常，将默认值教正至临近边界值 [#75](https://github.com/didi/mand-mobile/issues/75)
  - 修复部分文档错误信息

### 1.2.3
`2018-05-11`
- Fix
  - 修复issue [#78](https://github.com/didi/mand-mobile/issues/78)
  - 站点更新

### 1.2.2
`2018-05-09`
- Fix
  - 修复issue [#67](https://github.com/didi/mand-mobile/issues/67)
  - 修复issue [#69](https://github.com/didi/mand-mobile/issues/77)
  - 修复issue [#72](https://github.com/didi/mand-mobile/issues/72)
- Feature
  - 新增`vw`适配方案
  - Popup适配iPhone X

<!-- CUTOFF -->
### 1.1.1
`2018-05-06`
- Fix
  - 修复issue [#62](https://github.com/didi/mand-mobile/issues/62)
  - 修复issue [#63](https://github.com/didi/mand-mobile/issues/63)

### 1.1.0
`2018-05-04`
- Feature
  - `Swiper` 增加`fade`模式下的触摸滚动 [#20](https://github.com/didi/mand-mobile/issues/20)
  - `ImageViewer` 增加`v-model`控制展示和隐藏 [#42](https://github.com/didi/mand-mobile/issues/42)
  - `Toast` content 属性支持数字 [#43](https://github.com/didi/mand-mobile/issues/43)

- Fix
  - 修复`Picker`在联动数据时，重置`DefaultIndex`引起的滚动异常 [#50](https://github.com/didi/mand-mobile/issues/50)
  - 修复构建时`Autoprefixer`的`display:box`的警告 [#54](https://github.com/didi/mand-mobile/issues/54)

<!-- CUTOFF -->
### 1.0.9
`2018-04-26`
- 修复issue [#47](https://github.com/didi/mand-mobile/issues/47)

### 1.0.8
`2018-04-24`
- Button组件点击事件无需`.native`修饰符
- 为Landscape组件增加`mask-closable`选项

### 1.0.6
`2018-04-20`
- 修复issue [#29](https://github.com/didi/mand-mobile/issues/29)

<!-- CUTOFF -->
### 1.0.5
`2018-04-18`
- 修复issue [#24](https://github.com/didi/mand-mobile/issues/24)

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

