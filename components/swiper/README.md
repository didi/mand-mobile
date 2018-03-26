---
title: Swiper 轮播
preview: https://didi.github.io/mand-mobile/examples/swiper
---

走马灯，用于一组图片或卡片轮播

### 引入

```javascript
import { Swiper, SwiperItem } from 'mand-mobile'

Vue.component(Swiper.name, Swiper)
Vue.component(SwiperItem.name, SwiperItem)
```

### 代码演示
<!-- DEMO -->

### API

#### Swiper Props

|属性|说明|类型|默认值|可选值|
|---|---|---|---|---|
|autoplay|自动切换间隔时长(毫秒), 禁用可设置为`0`|Number|`3000`|`0`, `[500, +Int.Max)`|
|transition|面板切换动画效果|String|`slide`|`slide`, `slideY`, `fade`, `fade`|
|default-index|第一屏面板索引值|Number|`0`|`[0, length - 1]`|
|has-dots|控制面板指示点|Boolean|`true`|`true`, `false`|
|is-prevent|是否阻止默认的事件，如页面滚动事件|Boolean|`true`|`true`, `false`|
|is-loop|是否循环播放|Boolean|`true`|`true`, `false`|
|dragable|是否禁用触摸滑动|Boolean|`true`|`true`, `false`|

#### Swiper Methods

##### play(autoplay)
打开自动切换

|参数|说明|类型|默认值|可选值|
|---|---|---|---|---|
|autoplay|自动切换间隔时长(毫秒)|Number|`3000`|`[500, +Int.Max)`|

```js
vm.$refs.swiper.play(5000)
```

##### stop()
停止自动切换

```js
vm.$refs.swiper.stop()
```

##### pre()
前一个item

```js
vm.$refs.swiper.pre()
```

##### next()
后一个item

```js
vm.$refs.swiper.next()
```

##### goto(index)
切换到某一个index

|参数|说明|类型|默认值|可选值|
|---|---|---|---|---|
|index|第一屏面板索引值|Number|`0`|`[0, length - 1]`|
```js
vm.$refs.swiper.goto(2)
```

##### getIndex()
获取当前显示的index

|参数|说明|类型|
|---|---|---|
|index|当前显示的index|Number|

```js
var index = vm.$refs.swiper.getIndex()
```

#### Swiper Events
##### @beforeChange(from, to)
轮播器将要切换前的事件

|参数 | 说明 | 类型 |
|----|-----|------|
| from     | 轮播器当前展示的索引值 | Number          |
| to     | 轮播器下一屏展示的索引值 | Number          |

##### @afterChange(from, to)
轮播器切换完成时的事件

|参数 | 说明 | 类型 |
|----|-----|------|
| from     | 轮播器当前展示的索引值 | Number          |
| to     | 轮播器下一屏展示的索引值 | Number          |
