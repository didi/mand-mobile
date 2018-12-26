---
title: 从 1.x 迁移
---

### 主要变化

* 全新的<a href="#/zh-CN/design">金融视觉规范</a>，组件设计更加美观大气，品牌色由`#FC9153`改为`#2F86F6`
* 支持服务端渲染
* 新增<a href="#/zh-CN/docs/components/basic/cell-item">CellItem</a>组件，用于承载功能入口、功能操作、信息展示等功能
* 新增<a href="#/zh-CN/docs/components/basic/detail-item">DetailItem</a>组件，用于展示一些列表信息
* 新增<a href="#/zh-CN/docs/components/business/bill">Bill</a>组件，用于展示电子账单或票据
* 新增<a href="#/zh-CN/docs/components/basic/progress">Progress</a>组件，用于进度可视化
* 新增<a href="#/zh-CN/docs/components/form/slider">Slider</a>组件
* 新增<a href="#/zh-CN/docs/components/feedback/transition">Transition</a>组件，将组件库内用到的动画封装和复用
* 新增<a href="#/zh-CN/docs/components/business/water-mark">WaterMask</a>组件，作为自带水印背景的容器
* 新增<a href="#/zh-CN/docs/components/basic/icon">字体图标</a>54个

### 组件改动

#### Button

- 不兼容改动
	- ⚠️ `type`属性可选值`ghost`, `ghost-primary`被移除
	- ⚠️ `disabled`属性被移除
	
- 新增功能
	- 🔅 `type`属性可选值新增`default`, `warning `, `disabled`
	- 🔅 新增属性`native-type`，用于更改原生Tag，默认值为`button`
	- 🔅 新增属性`plain`，用于展示朴素类型按钮，默认为`false`
	- 🔅 新增属性`round`，用于展示圆角按钮，默认为`false`
	- 🔅 新增属性`inline`，用于行内按钮，默认为`false`
	- 🔅 新增属性`icon-svg`，用于按钮使用SVG类型图标，默认为`false`
	- 🔅 新增属性`inactive`，用于展示按钮未激活状态，默认为`false`

#### Cashier

- 新增功能
	- 🔅 属性`channels`数组元素增加字段`iconSvg`、`action`，可用于使用SVG类型图标和为支付渠道增加特殊操作动作，如“更换银行卡”
	- 🔅 新增属性`pay-button-disabled`，用于禁用支付按钮
	- 🔅 场景`captcha`配置，新字段`brief `，用于发送验证码简要描述
	- 🔅 新增scoped插槽`header`，用于各个场景自定义头部内容
	
	```html
		<div slot-scope="{ scene }" slot="header">
		  <md-notice-bar
		    v-if="scene === 'choose'"
		    mode="closable"
		    icon="warn"
		    type="warning"
		  ></md-notice-bar>
		</div>
	```
	- 🔅 新增scoped插槽`channel`，用于添加特殊支付渠道
	- 🔅 新增scoped插槽`payButton`，用于自定义支付按钮内容

#### Check

- 不兼容改动
	- ⚠️ 组件拆分为`Check`，`CheckBox`，`CheckGroup`，`CheckList`
	
#### DatePicker

- 不兼容改动
	- ⚠️ 不再支持12小时制，属性`half-day-text`、`is-twelve-hours`被移除（为满足`min-date`和`max-date`可控制到时分）
	
- 新增功能
	- 🔅 新增属性`describe`，用于设置选择器描述

#### Dialog

- 新增功能
  - 🔅 新增属性`icon-svg`，用于使用SVG类型图标，默认为`false`
  - 🔅 新增属性`layout `，用于设置按钮排列方式，默认为`row`

#### Field

- 新增功能
	- 🔅 新增属性`brief`，用于副标题描述
	- 🔅 新增属性`plain`，用于镂空样式
	- 🔅 新增属性`disabled`，用于禁用区域
	- 🔅 新增插槽`header`, `action`, `footer`

#### FieldItem

- 不兼容改动
	- ⚠️ 属性`customized`被移出
	- ⚠️ 属性`align`被移出
	- ⚠️ 属性`value`被移出

- 新增功能
	- 🔅 新增属性`addon`，用于显示附加内容
	- 🔅 新增插槽`children`

	
#### Icon

- 不兼容改动
	- ⚠️ 默认使用字体图标，如需使用SVG类型图标，将`svg`置为`true`
	- ⚠️ 原内置SVG类型图标除`spinner`外其他移除（内置图标中SVG类型的仅包含具有固定颜色的图标，其他采用字体图标）

- 新增功能
	- 🔅 新增54个内置字体图标
	- 🔅 新增`svg`属性，用于SVG类型图标
	- 🔅 SVG类型图标新增`success-color`, `warn-color`

#### InputItem

- 不兼容改动
	- ⚠️ 属性`is-highlight`，用于表单获得焦点时高亮底部边框

- 新增功能
	- 🔅 新增属性`brief`，用于描述
	- 🔅 新增插槽`brief`，`error`

#### Landscape

- 不兼容改动

  - ⚠️ 属性`scroll`被移除

- 新增功能
  - 🔅 新增属性`full-screen`，用于全屏展示，默认为`false`
  - 🔅 新增事件`show`、`hide`

#### NoticeBar

- 新增功能
	- 🔅 新增属性`mode`，用于设置通知栏模式
	- 🔅 新增属性`type`，用于设置通知栏主题，可选`default`(蓝色)、`activity`(黄色)、`warning`(红色)，默认为`default`
	- 🔅 新增属性`round`，用于通知栏圆角展示，默认为`false`
	- 🔅 新增属性`multi-rows`，用于通知栏多行展示，默认为`false`
	- 🔅 新增属性`scrollable`，用于通知栏滚动展示，默认为`false`
	- 🔅 新增属性`icon-svg`，用于通知栏使用svg图标，默认为`false`
	- 🔅 新增插槽`left`和`right`，用于自定义左右内容
	- 🔅 新增事件`close`，通告栏被关闭时触发

#### NumberKeyboard

- 新增功能
  - 🔅 新增属性`text-render`，用于自定义指定按键的值

#### Popup

- 不兼容改动
	- ⚠️ 属性`prevent-scroll`、`prevent-scroll-exclude`不建议再使用，可使用组件`ScrollView`
	
- 新增功能
	- 🔅 属性`transition`可选值增加为`fade/fade-bounce/fade-slide/fade-zoom, slide-up/slide-down/slide-left/slide-right`
	- 🔅 子组件`PopupTitleBar`新增属性`describe`用于简要描述

#### Radio

- 不兼容改动
	- ⚠️ 组件拆分为`Radio`和`RadioList`
	
- 新增功能
	- 🔅 新增属性`icon-disabled`，用于设置禁用项图标，默认为`check-disabled`
	- 🔅 新增属性`icon-svg`，用于使用SVG类型图标，默认为`false`

#### ScrollView

- 新增功能
	- 🔅 新增属性`manual-init`，用于设置手动初始化滚动区域
	- 🔅 新增方法`init`，用于手动初始化滚动区域

#### Selector

- 新增功能
	- 🔅 新增属性`describe`，用于设置选择器描述
	- 🔅 新增属性`min-height`，用于设置选择器最小高度


#### Steps

- 新增功能
	- 🔅 新增属性`direction`，用于设置步骤条展示方向，默认为`horizontal`
	- 🔅 新增属性`transition`，用于进度变化动效

#### Swiper
- 新增功能
	- 🔅 新增属性`transition-duration`

#### TabBar

- 不兼容改动
	- ⚠️ 属性`titles`改为`items`
	- ⚠️ 属性`show-ink-bar`改为`has-ink`
	- ⚠️ 属性`ink-bar-length`改为`ink-length`
	- ⚠️ 属性`ink-bar-animate`被移除
	- ⚠️ 属性`default-index`改为`v-model`
	- ⚠️ 方法`selectTab`被移除，可直接使用`v-model`
	- ⚠️ 事件`indexChanged(index, prevIndex)`改为`change(item, index, prevIndex)`

- 新增功能
	- 🔅 新增属性`v-model`，用于双向绑定的标签对象`name`
	- 🔅 新增方法`reflow`，用于重新计算样式布局
	- 🔅 新增scoped插槽，用于自定义tab内容:
	
	```html
	<md-tabbar>
    <template slot="item" slot-scope="{ item, currentName, index, items }">
    <!-- content -->
    </template>
	</md-tabbar>
	```
	
#### TabPicker

- 不兼容改动
  - ⚠️ 属性`data-struct`被移除
  - ⚠️ 属性`default-index`被移出
  - ⚠️ 属性`option-render`被移出
  - ⚠️ 属性`async-func`被移出
  - ⚠️ 属性`ok-text`被移出
  - ⚠️ 属性`cancel-text`被移出
  - ⚠️ 属性`errorLabel`被移出
  - ⚠️ 属性`loadingLabel`被移出
  - ⚠️ 属性`data`数据结构改动
  - ⚠️ 方法`getSelectedItem`被移出
  - ⚠️ 事件`change`返回数据格式改动
  - ⚠️ 事件`confirm`被移出

- 新增功能	
  - 🔅 新增属性`default-value`
  - 🔅 新增属性`describe`副标题描述文本
  - 🔅 新增方法`getSelectedValues`获取所有面板选中的值
  - 🔅 新增方法`getSelectedOptions`获取所有面板选中的对象

* 级联数据源数据格式

```javascript
{
  // 唯一键名
  name: '',
  // 面板标签
  label: '',
  // 选项列表
  options: [
    {
      // 选项值
      value: "",
      // 选项标签
      label: "",
      // 级联子面板
      children: {
        name: '',
        label: '',
        options: [
          // ...
        ]
      }
    }
  ]
}
```

#### Tabs

- 不兼容改动
	- ⚠️ 组件拆分为`Tabs`和`TabPane`:

	```html
	<md-tabs>
    <md-tab-pane class="content" name="p1" label="第一章">
      她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
    </md-tab-pane>
    <md-tab-pane class="content" name="p2" label="第二章">
      又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
    </md-tab-pane>
    <md-tab-pane class="content" name="p3" label="第三章" disabled>
      你的腿？她有些诧异。腿？我的腿怎么了？他更诧异。后来，她才知道他的腿，那天只是坐麻了而已。
    </md-tab-pane>
  </md-tabs>
  ```
  
   - ⚠️ `Tabs`原属性全部移除
   - ⚠️ 方法`selectTab`被移除，可直接使用`v-model`
   - ⚠️ 事件`change(index, prevIndex)`改为`change(tab)`

- 新增功能
	- 🔅 新增属性`v-model`，用于双向绑定的标签对象`name`
	- 🔅 新增属性`immediate`, 用于初始化完成后立刻触发一次`change`事件
	- 🔅 新增子组件`TabPane`
	
#### Tag

- 新增功能
	- 🔅 属性`shape`可选值新增`quarter`, `coupon`

#### Tip

- 新增功能
	- 🔅 新增属性`name`，用于特殊类名
	- 🔅 新增属性`icon`、`icon-svg`，用于添加左侧图标
	- 🔅 新增属性`fill`，用于控制提示条充满子元素
	- 🔅 新增属性`offset`，用于设置提示条偏移量

#### Toast

- 新增功能
	- 🔅 新增属性`icon-svg`，用于使用svg图标，默认为`false`



