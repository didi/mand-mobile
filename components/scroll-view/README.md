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

`ScrollViewRefresh`为组件库内置的下拉刷新组件，仅用于作为视觉展示，需在插槽<a href="javascript:jumpAnchor('refresh')">refresh</a>中使用，下拉刷新组件也可自定义

`ScrollViewMore`为组件库内置的加载更多组件，仅用于作为视觉展示，需在插槽<a href="javascript:jumpAnchor('more')">more</a>中使用，加载更多组件也可自定义

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

#### ScrollViewRefresh Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|scroll-top | 距离顶部距离 | Number | `0` | 单位`px` |
|is-refresh-active | 释放可刷新状态 | Boolean | `false` | - |
|is-refreshing | 刷新中状态 | Boolean | `false` | - |
|refresh-text | 待刷新文案 | String | `下拉刷新` | - |
|refresh-active-text | 释放可刷新文案 | String | `释放刷新` | - |
|refreshing-text | 刷新中文案 | String | `刷新中...` | - |

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

##### @endReached()
滚动触底事件