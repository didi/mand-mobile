---
title: ScrollView
preview: https://didi.github.io/mand-mobile/examples/#/scroll-view
---

Used to simulate native scrolling areas and support pull-down refresh and load more

### Import

```javascript
import { ScrollView, ScrollViewRefresh, ScrollViewMore } from 'mand-mobile'

Vue.component(ScrollView.name, ScrollView)
```

### Instruction

`ScrollViewRefresh` is a pull-down refresh component built into the component library for visual display only. It needs to be used in the slot <a href="javascript:jumpAnchor('refresh')">refresh</a>. The pull-down refresh component can also be customized.

`ScrollViewMore` load-more component built into the component library for visual display only. It needs to be used in slot <a href="javascript:jumpAnchor('more')">more</a>. The load-more component can also be customized.

### Code Examples
<!-- DEMO -->

### API

#### ScrollView Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|scrolling-x | horizontal scrolling | Boolean | `true` | -|
|scrolling-y | vertical scrolling | Boolean | `true` | -|
|bouncing | - | Boolean | `true` | -|
|auto-reflow| automatically reset scroller size when content changes | Boolean | `false` | manually call `reflowScroller` when set to `false` |
|manual-init | manual initialization | Boolean | `false` | generally used for asynchronous initialization scenarios, you need to manually call the `init` method to complete the initialization |
|end-reached-threshold | threshold for emitting `endReached`. | Number | 0 | unit `px` |
|immediate-check-end-reaching | check if it reaches the bottom at initialization | Boolean | `false` | - |
|touch-angle | angle value range that triggers scrolling | Number | 45 | unit `deg` |

#### ScrollViewRefresh Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|scroll-top | distance from top | Number | `0` | unit `px` |
|is-refresh-active | release refreshable state | Boolean | `false` | - |
|is-refreshing | refreshing state | Boolean | `false` | - |
|refresh-text | - | String | `下拉刷新` | - |
|refresh-active-text | release refreshable text | String | `释放刷新` | - |
|refreshing-text | refreshing text | String | `刷新中...` | - |

#### ScrollViewMore Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|is-finished | all loaded | Boolean | `false` | - |
|loading-text | loading text | String | `更多加载中...` | - |
|finished-text | loaded text | String | `全部已加载` | - |

#### ScrollView Slots

##### default
Scrolling area content slot. When the content changes, you need to call `reflowScroller` to reset the scroll area. Refer to <a href="javascript:jumpAnchor('reflowScroller')">reflowScroller</a>

##### refresh
Pull-down refresh component slot, you can use `slot-scoped` to get the relevant scrolling status as follows (the scrolling state can also be dynamically set by event when the `slot-scoped` is not compatible)

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
load-more component slot

##### header
header slot

##### footer
footer slot

#### ScrollView Methods

##### init()
Initialize the scroll area, used when `manual-init` is set to `true`.

##### reflowScroller()
Reset the scroll area, which needs to be called after the content in the general scroll area changes.

##### scrollTo(left, top, animate = false)
Scroll to the specified location

|Parameters | Description | Type|
|----|-----|------|
|left|distance from left|Number|
|top|distance from top|Number|
|animate|using animation|Boolean|

##### triggerRefresh()
-

##### finishRefresh()
-

##### finishLoadMore()
-

#### ScrollView Events

##### @scroll({scrollLeft, scrollTop})
Scrolling event

|Props | Description | Type|
|----|-----|------|
|scrollLeft|distance from left|Number|
|scrollTop|distance from top|Number|

##### @refreshActive()
Release refreshable event

##### @refreshing()
Refreshing event

##### @endReached()
Reached end event