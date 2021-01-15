---
title: Dialog 模态窗
preview: https://didi.github.io/mand-mobile/examples/#/dialog
---

交互式模态窗口

### 引入

```javascript
import { Dialog } from 'mand-mobile'

Dialog.alert({ content: '' })

this.$dialog.alert({ content: '' }) // 全量引入
```

### 代码演示
<!-- DEMO -->

### API

#### Dialog Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
| v-model | 双向绑定是否显示窗口 | Boolean | `false`|-|
| title | 窗口标题 | String | -|-|
| icon | Icon组件图标名称 | String | -|-|
| icon-svg | svg图标 | Boolean |`false`|如需自定义图标, 请查看`Icon`组件|
| closable | 是否显示关闭按钮 | Boolean | `true`|-|
| layout | 底部按钮组布局方式, `row, column` | String | `row` | - |
| btns | 底部操作按钮组 | Array\<DialogBtnOptions\> | `[]`|-|
| append-to | 组件的挂载节点 | HTMLElement | `document.body`|-|
| has-mask | 是否有蒙层 | Boolean | `true`|-|
| mask-closable | 点击蒙层是否可关闭弹出层 | Boolean | `false`|-|
| transition <sup class="version-after">2.5.14+</sup> | 弹出层过度动画 | String |`md-fade`| 可选值参考[Transition](https://didi.github.io/mand-mobile/#/zh-CN/docs/components/feedback/transition?anchor=API) |

#### DialogBtnOptions Props

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|text|按钮文案|String|-|
|handler|点击回调|Function(btn: DialogBtnOptions)|-|
|warning|警示按钮|Boolean|`false`|
|disabled <sup class="version-after">2.4.0+</sup>|禁用按钮|Boolean|`false`|
|loading <sup class="version-after">2.4.0+</sup>|加载中按钮|Boolean|`false`|
|icon|按钮图标|String|-|
|iconSvg|按钮svg图标|Boolean|`false`|

#### Dialog Slots

##### default

组件子元素会被当做默认插槽内容使用，适合于不需要标题的自定义窗口内容的场景

##### header

顶部插槽，一般用于放置图片等 <sup class="version-after">2.4.0+</sup>

---

#### Dialog Instance Methods

##### close()
隐藏弹窗

#### Dialog Instance Events

##### @show()
模态窗口显示后触发的事件

##### @hide()
模态窗口隐藏后触发的事件

#### Dialog Static Methods

##### Dialog.confirm(props)
静态方法创建确认模态窗口, 返回Dialog实例

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|-----|
| icon | 图标 | String | -|
| title | 窗口标题 | String | -|
| content | 正文内容 | String | -|
| cancelText | 底部取消按钮文字 | String | `取消`|
| confirmText | 底部确认按钮文字 | String | `确认`|
| cancelWarning | 点击取消按钮为警示操作 | Boolean | `false` |
| confirmWarning | 点击确认按钮为警示操作 | Boolean | `false` |
| transition <sup class="version-after">2.5.14+</sup>| 弹出层过度动画 | String | `md-bounce` |
| onConfirm | 点击确认按钮回调函数 | Function | -|
| onCancel | 点击取消按钮回调函数 | Function | -|
| onShow <sup class="version-after">2.5.0+</sup>| 窗口显示后回调函数 | Function | -|
| onHide <sup class="version-after">2.5.0+</sup>| 窗口隐藏后回调函数 | Function | -|

##### Dialog.alert(props)
静态方法创建警告模态窗口, 返回Dialog实例

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|-----|
| icon | 图标 | String | -|
| title | 窗口标题 | String | -|
| content | 正文内容 | String | -|
| confirmText | 底部确认按钮文字 | String | `确认`|
| warning | 点击确认按钮为警示操作 | Boolean | `false` |
| transition <sup class="version-after">2.5.14+</sup>| 弹出层过度动画 | String | `md-bounce` |
| onConfirm | 点击确认按钮回调函数 | Function | -|
| onShow | 窗口显示后回调函数 | Function | -|
| onHide | 窗口隐藏后回调函数 | Function | -|

##### Dialog.succeed(props)
静态方法创建成功确认模态窗口, 返回Dialog实例

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|-----|
| title | 窗口标题 | String | -|
| content | 正文内容 | String | -|
| confirmText | 底部确认按钮文字 | String | `确认`|
| transition <sup class="version-after">2.5.14+</sup>| 弹出层过度动画 | String | `md-bounce` |
| onConfirm | 点击确认按钮回调函数 | Function | -|
| onCancel | 点击取消按钮回调函数 | Function | -|
| onShow | 窗口显示后回调函数 | Function | -|
| onHide | 窗口隐藏后回调函数 | Function | -|

##### Dialog.failed(props)
静态方法创建失败确认模态窗口, 返回Dialog实例

|属性 | 说明 | 类型 | 默认值|
|-----|-----|-----|-----|
| title | 窗口标题 | String | -|
| content | 正文内容 | String | -|
| confirmText | 底部确认按钮文字 | String | `确认`|
| transition <sup class="version-after">2.5.14+</sup>| 弹出层过度动画 | String | `md-bounce` |
| onConfirm | 点击确认按钮回调函数 | Function | -|
| onCancel | 点击取消按钮回调函数 | Function | -|
| onShow | 窗口显示后回调函数 | Function | -|
| onHide | 窗口隐藏后回调函数 | Function | -|

##### Dialog.closeAll()
静态方法关闭所有动态创建的全局Dialog
