---
title: TextareaItem 多行输入框
preview: https://didi.github.io/mand-mobile/examples/#/TextareaItem
---

多行文本输入框 <sup class="version-after">2.5.0+</sup>

### 引入

```javascript
import { TextareaItem } from 'mand-mobile'

Vue.component(TextareaItem.name, TextareaItem)
```

### 代码演示
<!-- DEMO -->

### API

#### TextareaItem Props
| 属性                                              | 说明                                             | 类型          | 默认值  | 备注           |
| ------------------------------------------------- | ------------------------------------------------ | ------------- | ------- | -------------- |
| title                                             | 标题                                             | String        | -       | -              |
| placeholder                                       | 占位符                                           | String        | -       | -              |
| v-model                                           | 输入内容                                         | String        | -       |                |
| max-length                                        | 可输入的字符长度                                 | String/Number | -       | -              |
| autosize                                          | 是否可自动适应高度                               | Boolean       | `false` | -              |
| max-height                                        | 在`autosize=true`的情况, 文本域最长的高度        | String/Number | `'40'`  | 依赖`autosize` |
| solid                                             | title的宽度是否固定                              | Boolean       | `true`  |                |
| readonly                                          | 是否只读                                         | Boolean       | `false` | -              |
| disabled                                          | 是否禁用                                         | Boolean       | `false` | -              |
| clearable <sup class="version-after">2.5.3+</sup> | 是否有删除图标                                   | Boolean       | `false` | -              |
| rows                                              | 开始显示的行数                                   | String/Number | `'3'`   | -              |
| error                                             | 是否显示错误, 如果有内容就认定是出错, 并显示出来 | String        | -       | -              |
| formation <sup class="version-after">2.5.13+</sup> |表单文本格式化回调方法                         |Function(name, curValue, curPos): {value: curValue, range: curPos}|-|传入参数`name`为表单名称，`curValue`为表单值，`curPos`为表单光标当前所在位置<br/>返回参数`value`格式化值, `range`表单光标格式化后所在位置|
| compositionable <sup class="version-after">2.6.1+</sup> | 是否开启文本输入处理，开启后输入确认才会触发 `change` 事件| Boolean       | `false` | -              |


#### TextareaItem Slots

##### footer

文本域在分隔线上面部分的slot

#### TextareaItem Events

##### focus()
文本域获得焦点

##### blur()
文本域失去焦点

##### getValue()
获取文本域值

#### TextItem Events

##### @focus(name)
文本域获得焦点事件

##### @blur(name)
文本域失去焦点事件

##### @change(name, value)
文本域值变化事件

##### @keyup(name, event)
文本域按键按下事件

##### @keydown(name, event)
文本域按键释放事件

##### @compositionstart(name, event)
文本域开始输入汉字事件

##### @compositionend(name, event)
文本域确认/取消输入汉字事件