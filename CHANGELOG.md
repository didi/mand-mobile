---
title: 更新日志
toc: hidden
---

### 1.6.6
`2018-12-16`
- Fix
  - 修复`InputItem`双向绑定触发的重复格式化
  - 修复`Radio`更新数据源后未重置`selectedIndex`导致的错误选中 [#251](https://github.com/didi/mand-mobile/issues/251)
  - 修复`TabPicker`中`TabBar`更新时无法清除的问题[#252](https://github.com/didi/mand-mobile/issues/252)
  
### 1.6.5
`2018-12-01`
- Fix
  - `Popup` 异步隐藏 [#242](https://github.com/didi/mand-mobile/issues/242)
  - `Button` 蒙层点击击穿 [#244](https://github.com/didi/mand-mobile/issues/244)
  - `Toast` 异步隐藏 [#238](https://github.com/didi/mand-mobile/issues/242)
  - `Picker` 双向查找有效值 [#238](https://github.com/didi/mand-mobile/issues/238)
  - `DatePicker` BUG 修复 [#241](https://github.com/didi/mand-mobile/issues/241)

### 1.6.4
`2018-11-20`
- Fix
  - `Swiper`抖动触发`afterChange` [#232](https://github.com/didi/mand-mobile/issues/232)

### 1.6.3
`2018-10-29`
- Feature
  - `TabPicker`文案可配置[#216](https://github.com/didi/mand-mobile/issues/216)
- Fix
  - 静态方法未定义 BUG [#223](https://github.com/didi/mand-mobile/issues/223)

### 1.6.2
`2018-10-19`
-Fix
  - 移除`Cashier`最大高度限制 [#208](https://github.com/didi/mand-mobile/issues/208)
  - 修复`Button`在某些旧浏览器下无法响应点击事件

### 1.6.1
`2018-09-29`
- Fix
  - 内容产出最大宽度 [#200](https://github.com/didi/mand-mobile/issues/200)

### 1.6.0
`2018-09-03`
- Feature
  - `ScrollView` 新增header/footer插槽 [#188](https://github.com/didi/mand-mobile/issues/188)
- Fix
  - `InputItem` 清空按钮只在聚焦的时候显示 [#196](https://github.com/didi/mand-mobile/issues/196)
  - `DatePicker` 设置default-date出现复数列 [#192](https://github.com/didi/mand-mobile/issues/192)

### 1.5.6
`2018-08-20`
- Fix
  - `ScrollView` 修正键盘弹起时无法滚动问题 [#184](https://github.com/didi/mand-mobile/issues/184)

### 1.5.5
`2018-08-13`
- Fix
  - `ScrollView` 修正无标签名时的方法调用错误 [#183](https://github.com/didi/mand-mobile/issues/183)
  - `Cashier` 修正属性缺失问题 [#181](https://github.com/didi/mand-mobile/issues/181)

### 1.5.4
`2018-08-01`
- Feature
  - `Stepper`新增`v-model`绑定 [#171](https://github.com/didi/mand-mobile/issues/171)
  - `Stepper`新增`is-integer`限制输入为整数 [#171](https://github.com/didi/mand-mobile/issues/171)
  - `ScrollView`新增 `auto-reflow`自动重置滚动区域尺寸
- Fix
  - 修正`Selector`参数缺失 [#173](https://github.com/didi/mand-mobile/issues/173)
  - Typescript声明文件修正 [#169](https://github.com/didi/mand-mobile/issues/169)/[#167](https://github.com/didi/mand-mobile/issues/167)/[#166](https://github.com/didi/mand-mobile/issues/166)
  - 修正`InputItem`值自动裁剪前后空格问题 [#164](https://github.com/didi/mand-mobile/issues/164)

### 1.5.2
`2018-07-24`
- Fix
  - 修正`ScrollView`内容无法触发点击事件 [#158](https://github.com/didi/mand-mobile/issues/158)
  - 修正`Selector`组件滚动穿透 [#157](https://github.com/didi/mand-mobile/issues/157)

### 1.5.1
`2018-07-23`
- Fix
  - 完善 Typescript 类型声明 [#153](https://github.com/didi/mand-mobile/issues/153)

### 1.5.0
`2018-07-20`
- Feature
  - 新增`ScrollView`组件
  - 新增`CheckGroup`, `CheckList`, `CheckBox`组件
  - `Radio`新增`is-across-border`支持边框通栏样式
  - `Steps`新增`slot-scoped`中透传`index`
  - `TabBar`支持横向滚动
- Fix
  - 修正`Swiper`异步加载数据问题 [#150](https://github.com/didi/mand-mobile/issues/150)
  - 修正全局引用组件库的自动安装问题 [#141](https://github.com/didi/mand-mobile/issues/141)
  - 修正`Radio`样式问题

### 1.4.4
`2018-07-12`
- Fix
  - 修正`Swiper`文档错误 [#138](https://github.com/didi/mand-mobile/issues/138)
  - 修复`Cashier`成功图标样式问题
  - 修复`InputItem`数值支持 [#132](https://github.com/didi/mand-mobile/issues/132)
  - 修复`Picker`未设置`defaultIndex`时`getColumnValue`取值`undefined`的问题 [#131](https://github.com/didi/mand-mobile/issues/131)

### 1.4.3
`2018-07-04`
- Fix
  - 修复`Radio`样式问题

### 1.4.1
`2018-07-01`
- Feature
  - 新增金融数字`Amount`
  - 新增活动指示器`ActivityIndicator`
  - 新增`Dialog`关闭所有模态窗方法`closeAll`
  - 新增`ActionSheet`单例调用模式及静态方法 [#79](https://github.com/didi/mand-mobile/issues/79)
  - 新增`FieldItem`左右插槽并取消`arrow`限制 [#124](https://github.com/didi/mand-mobile/issues/124)
- Fix
  - 修复`Agree`布局问题

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
  - `InputItem`增加类型`digit`, 支持其他Html Input标准类型 [#95](https://github.com/didi/mand-mobile/issues/95)
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
