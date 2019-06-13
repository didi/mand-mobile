---
title: Toast 轻提示
preview: https://didi.github.io/mand-mobile/examples/#/toast
---

弹出式消息提示

### 引入

```javascript
import { Toast } from 'mand-mobile'

Toast.succeed('操作成功')

this.$toast.info('提示') // 全量引入

Vue.component(Toast.component.name, Toast.component) // 组件引入
```

### 代码演示
<!-- DEMO -->

### API

#### Toast Static Methods

##### Toast({content, icon, iconSvg, duration, position, hasMask, parentNode})
显示自定义提示

|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
| icon | Icon组件图标名称 | String | - |如需自定义图标, 请查看`Icon`组件 |
| iconSvg | 使用svg图标 | Boolean | `false` |-|
| content | 提示内容文本 | String | - |- |
| duration | 显示多少毫秒后自动消失, 若为`0`则一直显示 | Number | `3000` | - |
| position | 展示位置 | String | `center` | `top/center/bottom` |
| hasMask | 是否显示透明遮罩, 以此防止用户点击 | Boolean | `false` | - |
| parentNode | 组件挂载节点 | HTMLElement | `document.body`|- |

##### Toast.info(content, duration, hasMask, parentNode)
显示纯文本提示

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
| content | 提示内容文本 | String | - |
| duration | 显示多少毫秒后自动消失, 若为`0`则一直显示 | Number | `3000` |
| hasMask | 是否显示透明遮罩, 以此防止用户点击 | Boolean | `false` |
| parentNode | 组件挂载节点 | HTMLElement | `document.body` |

##### Toast.succeed(content, duration, hasMask, parentNode)
显示成功提示

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
| content | 提示内容文本 | String | - |
| duration | 显示多少毫秒后自动消失, 若为`0`则一直显示 | Number | `3000` |
| hasMask | 是否显示透明遮罩, 以此防止用户点击 | Boolean | `false` |
| parentNode | 组件挂载节点 | HTMLElement | `document.body` |

##### Toast.failed(content, duration, hasMask, parentNode)
显示失败提示

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
| content | 提示内容文本 | String | - |
| duration | 显示多少毫秒后自动消失, 若为`0`则一直显示 | Number | `3000` |
| hasMask | 是否显示透明遮罩, 以此防止用户点击 | Boolean | `false` |
| parentNode | 组件挂载节点 | HTMLElement | `document.body`|

##### Toast.loading(content, duration, hasMask, parentNode)
显示载入提示

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
| content | 提示内容文本 | String, Number | - |
| duration | 显示多少毫秒后自动消失, 若为`0`则一直显示 | Number | `0` |
| hasMask | 是否显示透明遮罩, 以此防止用户点击 | Boolean | `true` |
| parentNode | 组件挂载节点 | HTMLElement | `document.body`|

##### Toast.hide()
隐藏提示

#### Toast.component Props 

<sup class="version-after">2.3.0+</sup>

|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
| icon | Icon组件图标名称 | String | - |如需自定义图标, 请查看`Icon`组件 |
| iconSvg | 使用svg图标 | Boolean | `false` |-|
| content | 提示内容文本 | String | - |- |
| duration | 显示多少毫秒后自动消失, 若为`0`则一直显示 | Number | `3000` | - |
| position | 展示位置 | String | `center` | `top/center/bottom` |
| hasMask | 是否显示透明遮罩, 以此防止用户点击 | Boolean | `false` | - |

```html
<md-toast>
  <md-activity-indicator>loading...</md-activity-indicator>
</md-toast>
```

#### Toast.component Methods

<sup class="version-after">2.3.0+</sup>

##### show()
展示提示

##### hide()
隐藏提示

#### Toast.component Events

<sup class="version-after">2.3.0+</sup>

##### @show()
提示展示事件

##### @hide()
提示隐藏事件