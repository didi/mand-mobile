---
title: 更新日志
toc: hidden
---

### 2.7.1

`2024-06-11`

- Feature
  - `Icon`
    - `size` 属性增加 `xxs` 值
  - `Toast`
    - 内容由展示1行改为最多展示2行
  - `InputItem`
    - `is-virtual-keyboard` 属性为 `true` 时，支持粘贴内容到输入框
  - `Amount`
    - 新增 `mask` 属性，为 `true` 时将对数值进行掩码展示
  - `LicensePlate`
    - 新增插槽能力
- Fix
  - `LicensePlate`
    - 修复弹窗点击穿透问题
### 2.7.0

`2024-03-12`

- Design
  - 🍭金融设计规范更新
    - 更新数字优先使用 `DIDIFD-Medium` 字体
- Feature
    - `NumberKeyboard`
      - `professional` 类型键盘 `text-render`替换键增加 `0, 00`
    - `LicensePlate`
      - 新增车牌号键盘组件
- Fix
  - `Icon`
    - 修复 SVG 格式下，默认尺寸错误的问题

### 2.6.1

`2023-02-02`

- Design
  - 🍭金融设计规范更新
    - `CheckBox` 更新字体颜色、边框、背景色颜色

- Feature
    - `Check`、`Radio`
      - `CheckBox`、`RadioBox` 增加选中角标位置选项
    - `Icon`
      - 默认使用 SVG 格式，在 Apple [锁定模式](https://support.apple.com/zh-cn/HT212650)中，无法使用网页字体

### 2.6.0

`2022-08-26`

- Design
  - 🍭金融设计规范更新
    - 更新主题色，[详情](https://github.com/didi/mand-mobile/pull/755/files#diff-dafec5882d1f310bec1be2ca7fb586a99589509362a07d650e827813eee6136a)
    - `Toast` 背景色由半透明改为不透明
    - `Button` 圆角由 `4px` 修改为 `16px`
    - `Icon` 更新图标整体视觉效果

- Feature
    - `Toast`
      - 增加方形样式组件
    - `NumberKeyboard`
      - 增加禁用键盘选项
      - 增加 `00` 按键选项
    - `Agree`
      - 增加方形勾选框

### 2.5.20

`2021-07-22`

- Feature
  - 添加更多的国际化支持

### 2.5.19

`2021-05-14`

- Fix
  - 修复 `image-reader` 对图片尺寸修改不正确的问题
  - 修复 `stepper` 无法输入小数点的问题
  - 修复 `process.env.MAND_ENV` 环境变量没有正确注入的问题

### 2.5.18

`2021-04-02`

- Fix
  - 修复 `stepper` 初始值为 `-` `.` 解析不正确的问题
  - 修复 `image-reader` 对图片尺寸修改不正确的问题

### 2.5.17

`2021-03-02`

- Feature
  - 添加国际化支持

### 2.5.16

`2021-02-26`

- Fix
  - 修复图片角度修正的问题

### 2.5.15

`2021-02-04`

- Fix
  - 移除组件中对`NODE_ENV`的依赖

### 2.5.14

`2021-01-15`

- Feature
  - `Dialog`使用静态方法时支持传入`transition`[#716](https://github.com/didi/mand-mobile/issues/716)
- Fix
  - 修复`Tip`组件子组件属性为空时导致报错
  - 修复`InputItem`组件实例方法共享`debounce`内部变量的冲突

### 2.5.13

`2020-09-17`

- Feature
  - `TextareaItem`支持格式化[#699](https://github.com/didi/mand-mobile/issues/699)

- Fix
  - 修复文档中的拼写错误[#690](https://github.com/didi/mand-mobile/issues/690)
  - 修复`DatePicker`单元测试的错误
  - 修复`RadioGroup`对`value`的类型校验[#693](https://github.com/didi/mand-mobile/issues/693)

### 2.5.12

`2020-07-24`

- Fix
  - 避免在`NumberKeyboard`组件中重复触发`click`和`touchstart`事件

### 2.5.11

`2020-05-29`

- Fix
  - 修复`Amount`组件中文货币单位不正确的问题[#675](https://github.com/didi/mand-mobile/issues/675)

### 2.5.10

`2020-04-30`

- Fix
  - 修复`Button`在文字链接类型下字体行高不正确的问题[#663](https://github.com/didi/mand-mobile/issues/663)
  - 修复`ImageReader`中`jpgencoder`可能被重复加载的问题（如微前端模式下）
  - 修复`TabBar`尺寸计算不准确的问题

### 2.5.9

`2020-03-26`

- Feature
  - `CheckGroup`增加方法`toggleAll`用于全选/全不选和反选[#648](https://github.com/didi/mand-mobile/issues/648)

- Fix
  - 修复`TextAreaItem`当异步内容填充时，组件高度不正确的问题

### 2.5.8

`2020-02-04`

- Feature
  - `Captcha`增加属性`auto-send`，用于控制验证码弹窗第一次展示时是否自动触发`send`事件
  - `ResultPage`属性增加动态变更响应

- Fix
  - 修复`Picker`和`DatePicker`快速滑动多列时，选中项异常的问题[#632](https://github.com/didi/mand-mobile/issues/632)
  - 修复`ScrollViewRefresh`中的`refreshActive`事件触发错误问题[#642](https://github.com/didi/mand-mobile/issues/642)
  - 修复`Amount`使用千分符展示负数错误问题[#644](https://github.com/didi/mand-mobile/issues/644)
  - 修复`TextAreaItem`在`Popup`中嵌套时尺寸计算错误的问题
  - 修复`Swiper`上下滑动导致自动播放失效的问题
  - 修复`Tip`在`ScrollView`中展示位置错误的问题

### 2.5.7

`2019-12-26`

- Feature
  - `Landscape`增加属性`transition`，用于自定义展示动效

- Fix
  - 修复`Tabs`在切换时可能导致的重绘问题[#627](https://github.com/didi/mand-mobile/issues/627)
  - 修复`NoticeBar`动态变化内容时导致误触滚动的问题[#628](https://github.com/didi/mand-mobile/issues/628)
  - 修复`ActionBar`, `NumberKeyboard`安全区留白兼容写法

### 2.5.6

`2019-11-23`

- Fix
  - 修复`Stepper`有初始值，最大和最小值是无法输入数字的问题，并优化了边界校验逻辑[#614](https://github.com/didi/mand-mobile/issues/614)

### 2.5.5

`2019-11-08`

- Fix
  - 修复`TabBar`在`keep-alive`中使用因窗口尺寸变更导致尺寸异常的问题[#608](https://github.com/didi/mand-mobile/issues/608)
  - 修复`Skeleton`标题为空时也展示的问题

### 2.5.4

`2019-11-02`

- Feature
  - `ScrollView`增加方法`getOffsets`，用于获取当前滚动距离

- Fix
  - 修复`Swiper`因窗口尺寸变更回到第一屏的问题[#596](https://github.com/didi/mand-mobile/issues/596)
  - 修复`Swiper`和`TabBar`在`keep-alive`中使用因窗口尺寸变更导致尺寸异常的问题[#599](https://github.com/didi/mand-mobile/issues/599)
  - 修复`TabBar`尺寸计算兼容性问题
  - 更新`TextareaItem`清空按钮的展示逻辑，只有当表单值不为空且获得焦点时才展示[#589](https://github.com/didi/mand-mobile/issues/589)

### 2.5.3

`2019-10-11`

- Feature
  - `TextareaItem`增加属性`clearable`[#589](https://github.com/didi/mand-mobile/issues/589)

- Fix
  - 修复`TabPicker`文字过长时无法拖动而展示不全的问题[#590](https://github.com/didi/mand-mobile/issues/590)
  - 去除部分非必须reset样式[#586](https://github.com/didi/mand-mobile/issues/586)

### 2.5.2

`2019-09-20`

- Feature
  - `Picker`和`DatePicker`增加属性`keep-index`，用于设置当列数据发生变更时，保持上次停留位置

- Fix
  - 修复`Toast`被`Landscape`覆盖的问题
  - 修复`TabBar`渲染崩溃的问题[#567](https://github.com/didi/mand-mobile/issues/567)
  - 移除`Textarea`部分无用样式变量

### 2.5.1

`2019-09-04`

- Feature
  - 增加部分全局[reset样式](https://github.com/didi/mand-mobile/pull/539/files)
  - 新增组件`Skeleton`
  - 新增组件`TextareaItem`
  - 新增组件`RadioGroup`和`RadioBox`
  - `ActionBar`和`ResultPage`增加按钮配置属性`type `, `plain`, `round`, `inactive`, `loading`, `icon`, `iconSvg`[#544](https://github.com/didi/mand-mobile/issues/544)
  - `Dialog`单例模式增加`onShow`和`onHide`
  - `InputItem`增加属性`preview-type`用于设置预填展示时类型

  ```html
  <md-input-item
    type="bankCard" <!-- 正常输入时表单类型 -->
    preview-type="text" <!-- 预填展示时表单类型 -->
    title="银行卡号"
    value="6222 **** **** 1234"  <!-- 带掩码的预填值 -->
  ></md-input-item>
  ```

- Fix
  - 修复`Swiper`滑出滚动区域时无法正常翻页问题[#540](https://github.com/didi/mand-mobile/issues/540)
  - 修改按钮背景色设置属性为`background`，容器元素为`div`

### 2.4.2

`2019-08-13`

- Fix
  - 修复`FieldItem`和`InputItem`标题和内容对齐的样式问题[#528](https://github.com/didi/mand-mobile/issues/528)
  - 修复`FieldItem`和`InputItem`在安卓设备中内容字体加粗问题

### 2.4.1

`2019-08-03`

- Fix
  - 修复`InputItem`使用虚拟键盘输入时无法限制字符长度的问题[#524](https://github.com/didi/mand-mobile/issues/524)
  - 修复`Amount`使用动效时数字的精度问题

### 2.4.0

`2019-07-29`

- Design
  - 🍭金融设计规范更新，`Popup`类组件标题栏`border-radius`由`8px`变为`40px`（大圆角模式），`Dialog`组件`border-radius`由`8px`变为`12px`

  ![Design](https://pt-starimg.didistatic.com/static/starimg/img/FLXmXRBcDX1564369346467.jpg)

- Feature
  - `PopupTitleBar`增加以下属性:
    - `large-radius`，用于支持大圆角模式
    - `only-close`，用于快捷设置单个关闭按钮
    - `title-align`，用于设置标题描述位置（left/right/center）
  - `Picker`, `DatePicker`, `TabPicker`, `Selector`, `Cashier`增加属性`large-radius`用于支持支持大圆角模式
  - `Selector`增加属性`hide-title-bar`，用于支持在无需确认模式下隐藏标题栏，增加插槽`header`，`footer`
  - `Button`增加属性`loading`，用于设置加载状态
  - `Dialog`属性`btns`中增加两个状态设置`disabled`（禁用态）/`loading`（加载态），并在`handler`中回传`btn`实例[#500](https://github.com/didi/mand-mobile/issues/500)

    ```javascript
    export default {
      data () {
        return {
          btns: [{
            text: '搜索',
            handler: this.btnHandler
          }]
        }
      },
      methods: {
        btnHandler (btn) {
          this.$set(btn, 'loading', true)
          this.$set(btn, 'text', '搜索中')
        },
      }
    }
    ```

- Fix
  - 修复`InputItem`和`Stepper`有默认值时会在组件初始化时误触发`change`事件[#495](https://github.com/didi/mand-mobile/issues/495)
  - `Amount`大写模式兼容负数[#510](https://github.com/didi/mand-mobile/issues/510)

### 2.3.3

`2019-07-18`

- Fix
  - 修复`Toast`自定义位置时的样式兼容问题[#485](https://github.com/didi/mand-mobile/issues/485)
  - 修复`TabPicker`设置`default-value`时，`TabBar`无法自动选中最后一项的问题[#488](https://github.com/didi/mand-mobile/issues/488)
  - 修复`Selector`和`CheckList`点击图标无法选中的问题[#491](https://github.com/didi/mand-mobile/issues/491)
  - 修复`Popup`无法覆盖`NoticeBar`的问题[#492](https://github.com/didi/mand-mobile/issues/492)
  - 修复`Stepper`中部分`stylus`变量赋值错误

### 2.3.2

`2019-07-05`

- Fix
  - 修复`Codebox`初始化无法赋值的问题
  - 修复`NumberKeyboard`按键点击易误触的体验问题[#477](https://github.com/didi/mand-mobile/issues/477)

### 2.3.1

`2019-06-22`

- Feature
  - `NumberKeyboard`增加属性`isHideConfirm`，用来控制确认键点击动作是否自动隐藏键盘[#474](https://github.com/didi/mand-mobile/issues/474)
  - `NumberKeyboard`增加默认插槽

- Fix
  - 修复`Slider`的进度条计算错误[#472](https://github.com/didi/mand-mobile/issues/472)
  - 修复`NumberKeyboard`按键点击易误触的体验问题[#477](https://github.com/didi/mand-mobile/issues/477)

### 2.3.0

`2019-06-13`

- Feature
  - `Check`和`CheckList`增加图标大小、位置等相关配置属性[#383](https://github.com/didi/mand-mobile/issues/383)
  - `CheckList`插槽增加`index`、`selected`字段

  ```html
    <template>
      <md-check-list :options="data">
        <template slot-scope="{ option, index, selected }">
          <!-- xxx -->
        </template>
      </md-check-list>
    </template>
  ```

  - `RadioList`插槽增加`index`、`selected`字段，且当`icon`置空时不展示图标
  - `Selector`增加属性`multi`，支持多选[#296](https://github.com/didi/mand-mobile/issues/296)
  - `Toast`增加属性`component`，支持以组件形式引入并定制[#445](https://github.com/didi/mand-mobile/issues/445)
  - `ScrollView`增加属性`is-prevent`，支持设置当在非可滚动区域触发滚动时是否也阻止默认行为[#454](https://github.com/didi/mand-mobile/issues/454)

- Fix
  - 修复`Swiper`属性`isLoop`为true时，autoplay失效的问题[#452](https://github.com/didi/mand-mobile/issues/452)
  - 修复`Dialog`属性`maskClosable`为true时，关闭弹窗导致报错[#471](https://github.com/didi/mand-mobile/issues/471)


### 2.2.4

`2019-05-26`

- Fix
  - 修复`TabBar`第一项和最后一项选中后无法自动修复位置的问题[#434](https://github.com/didi/mand-mobile/issues/434)
  - `TabBar`选项内部文字不可选中

### 2.2.3

`2019-05-25`

- Fix
  - 工具样式`hairline`使用`border`取代`width`和`height`


### 2.2.2

`2019-05-11`

- Feature
  - `TabPicker`新增事件`select`[#436](https://github.com/didi/mand-mobile/issues/436)

- Fix
  - `TabPicker`的每一级tab列表中的选项被选中时将内部容器复位至最顶部
  - `RadioList`当切换至非文本选项时，自动将已填写的文本框清空
  - `DatePicker`的`custom-types`内支持`HH`写法[#433](https://github.com/didi/mand-mobile/issues/433)
  - `Dialog`的类型声明内增加`onCancel`
  - 优化部分组件文档

### 2.2.1

`2019-04-22`

- Feature
  - `Stepper`新增slot `unreached`、`icon`[#405](https://github.com/didi/mand-mobile/issues/405)
  - `InputItem`新增属性`solid`，用来设置标题宽度不固定[#411](https://github.com/didi/mand-mobile/issues/411)
  - `Ruler`新增属性`stepTextPosition`、`stepTextRender`

- Fix
  - 修复`Picker`当设置错误的`default-index`时引发的异常[#416](https://github.com/didi/mand-mobile/issues/416)
  - 优化部分组件样式

### 2.2.0

`2019-04-13`

- Feature
  - 新增`Ruler`组件
  - `ScrollViewRefresh`新增属性`rollerColor`，用于设置下拉刷新是进度条颜色[#399](https://github.com/didi/mand-mobile/issues/399)
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
