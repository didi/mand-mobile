---
title: ScrollView 滚动区域/下拉刷新
preview: https://didi.github.io/mand-mobile/examples/#/scroll-view
---

用于模拟原生的滚动区域，并支持下拉刷新和加载更多

### 引入

```javascript
import { ScrollView, ScrollViewRefresh, ScrollViewMore } from 'mand-mobile'

Vue.component(ScrollView.name, ScrollView)
```

### 使用指南

* `ScrollViewRefresh`为组件库内置的下拉刷新组件，仅用于作为视觉展示，需在插槽<a href="javascript:jumpAnchor('refresh')">refresh</a>中使用，下拉刷新组件也可自定义

* `ScrollViewMore`为组件库内置的加载更多组件，仅用于作为视觉展示，需在插槽<a href="javascript:jumpAnchor('more')">more</a>中使用，加载更多组件也可自定义

* **组件容器需具有高度，否则会出现无法滚动或回弹问题。**更多使用的常见问题请查看<a href="javascript:jumpAnchor('附录')">附录</a>

### 代码演示
<!-- DEMO -->

### API

#### ScrollView Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|scrolling-x | 水平滚动 | Boolean | `true` | - |
|scrolling-y | 垂直滚动 | Boolean | `true` | - |
|bouncing | 可回弹 | Boolean | `true` | -|
|auto-reflow | 内容发生变化时自动重置滚动区域尺寸 | Boolean | `false` | 当设置为`false`时，内容发生变化需手动调用`reflowScroller` |
|manual-init | 手动初始化 | Boolean | `false` | 一般用于异步初始化的场景，需手动调用`init`方法完成初始化 |
|end-reached-threshold | 触发到达底部的提前量 | Number | 0 | 单位`px` |
|immediate-check-end-reaching <sup class="version-after">2.1.0+</sup>| 初始化时立即触发是否到达底部检查 | Boolean | `false` | - |
|touch-angle <sup class="version-after">2.1.0+</sup>| 触发滚动的角度范围 | Number | 45 | 单位`deg` |
|is-prevent <sup class="version-after">2.3.0+</sup>| 阻止浏览器默认滚动 | Boolean | `true` | 如果设置为`false`，当在非可滚动角度范围触发滚动时会触发浏览器默认滚动 |

#### ScrollView TouchAngle

<img src="https://pt-starimg.didistatic.com/static/starimg/img/cSL4mjxTmW1560240984431.jpg" width="460"/>

#### ScrollViewRefresh Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|scroll-top | 距离顶部距离 | Number | `0` | 单位`px` |
|is-refresh-active | 释放可刷新状态 | Boolean | `false` | - |
|is-refreshing | 刷新中状态 | Boolean | `false` | - |
|refresh-text | 待刷新文案 | String | `下拉刷新` | - |
|refresh-active-text | 释放可刷新文案 | String | `释放刷新` | - |
|refreshing-text | 刷新中文案 | String | `刷新中...` | - |
|roller-color <sup class="version-after">2.2.0+</sup>| 进度条颜色 | String | `#2F86F6` | - |

#### ScrollViewMore Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|is-finished | 全部已加载 | Boolean | `false` | - |
|loading-text | 加载中文案 | String | `更多加载中...` | - |
|finished-text | 全部已加载文案 | String | `全部已加载` | - |

#### ScrollView Slots

##### default
滚动区域内容插槽，当内容发生变化是，需要调用`reflowScroller`重置滚动区域，参考<a href="javascript:jumpAnchor('reflowScroller')">reflowScroller</a>

##### refresh
下拉刷新组件插槽，可如下使用`slot-scoped`获取相关滚动状态（不兼容`slot-scoped`时滚动状态也可通过事件中动态设置）

```html
<md-scroll-view-refresh
  slot="refresh"
  slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
  :scroll-top="scrollTop"
  :is-refreshing="isRefreshing"
  :is-refresh-active="isRefreshActive"
></md-scroll-view-refresh>
```
##### more
加载更多组件插槽

##### header
吸顶区域插槽

##### footer
吸底区域插槽

#### ScrollView Methods

##### init()
初始化滚动区域，当`manual-init`设置为`true`时使用

##### reflowScroller()
重置滚动区域，一般滚动区域中的内容发生变化之后需调用

##### scrollTo(left, top, animate = false)
滚动至指定位置

|参数 | 说明 | 类型|
|----|-----|------|
|left|距左侧距离|Number|
|top|距顶部距离|Number|
|animate|使用动画|Boolean|

##### triggerRefresh()
触发下拉刷新

##### finishRefresh()
停止下拉刷新

##### finishLoadMore()
停止加载更多

#### ScrollView Events

##### @scroll({scrollLeft, scrollTop})
滚动事件

|属性 | 说明 | 类型|
|----|-----|------|
|scrollLeft|距左侧距离|Number|
|scrollTop|距顶部距离|Number|

##### @refreshActive()
释放可刷新事件

##### @refreshing()
刷新中事件

##### @end-reached()
滚动触底事件

### 附录

#### 无法正常滚动且异常回弹

首先，大多数滚动异常的情况是由于容器尺寸（垂直滚动：高度，水平滚动：宽度）的问题导致，容器的高度可以通过**固定尺寸**，**流式布局**，**flex布局**等多种方式控制，当容器尺寸不足时会导致内部[Scroller初始化](https://github.com/didi/mand-mobile/blob/master/components/scroll-view/index.vue#L374)异常。当出现此类情况时，可通过浏览器元素查看器检查容器元素的**`.md-scroll-view`**高度是否正确。

其次，确认是否存在动态变更滚动区域内容，导致滚动区域尺寸变化，此时需调用`reflowScroller`或者直接将`auto-reflow`设置为`true`。

#### 下拉刷新后滚动无法触发endReached

在组件内部`下拉刷新`和`上拉加载`应该视为两个无关联的动作，因为动作内容有用户决定(业务逻辑)，故无法确定下拉刷新一定是"刷新列表回第一页的状态"，所以无法直接在下拉刷新的时候控制`isEndReaching`。该问题可以抽象为`下拉刷新`时需将`上拉加载`的状态重置，可以在`refreshing`事件去手动重置：

```javascript
$_onRefresh() {
  // 重置列表数据
  this.list = 10
  this.$refs.scrollView.finishRefresh()
  // 重置“上拉加载”的状态
  this.isFinished = false
  this.$refs.scrollView.finishLoadMore()
}
```