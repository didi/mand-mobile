### 引入

```javascript
import { Textarea } from 'mand-mobile'

Vue.component(Textarea.name, Textarea)
```

### 代码演示
<!-- DEMO -->

### API

#### Textarea Props
| 属性        | 说明                                             | 类型          | 默认值  | 备注           |
| ----------- | ------------------------------------------------ | ------------- | ------- | -------------- |
| title       | 标题                                             | String        | -       | -              |
| placeholder | 占位符                                           | String        | -       | -              |
| v-model     | 输入内容                                         | String        | -       |                |
| maxLength   | 可输入的字符长度                                 | String/Number | -       | -              |
| autosize    | 是否可自动适应高度                               | Boolean       | `false` | -              |
| maxHeight   | 在`autosize=true`的情况, 文本域最长的高度        | String/Number | `'40'`  | 依赖`autosize` |
| solid       | title的宽度是否固定                              | Boolean       | `true`  |                |
| readonly    | 是否只读                                         | Boolean       | `false` | -              |
| disabled    | 是否禁用                                         | Boolean       | `false` | -              |
| rows        | 开始显示的行数                                   | String/Number | `'3'`   | -              |
| error       | 是否显示错误, 如果有内容就认定是出错, 并显示出来 | String        | -       | -              |

#### Textarea Slots

##### footer

文本域在分隔线上面部分的slot

#### Textarea Events

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
