---
title: TextareaItem
preview: https://didi.github.io/mand-mobile/examples/#/TextareaItem
---

Multi-line text input <sup class="version-after">2.5.0+</sup>

### Import

```javascript
import { TextareaItem } from 'mand-mobile'

Vue.component(TextareaItem.name, TextareaItem)
```

### Code Examples
<!-- DEMO -->

### API

#### TextareaItem Props
| Props                                             | Description                                     | Type          | Default | Note               |
| ------------------------------------------------- | ----------------------------------------------- | ------------- | ------- | ------------------ |
| title                                             | title of textarea                               | String        | -       | -                  |
| placeholder                                       | placeholder of textarea                         | String        | -       | -                  |
| v-model                                           | value of textarea                               | String        | -       |                    |
| max-length                                        | max length of textarea                          | String/Number | -       | -                  |
| autosize                                          | Dose the Textarea  resize with content          | Boolean       | `false` | -                  |
| max-height                                        | The max height of textarea with `autosize=true` | String/Number | `'40'`  | rely on `autosize` |
| solid                                             | the width of title is fixed or not              | Boolean       | `true`  |                    |
| readonly                                          | readonly                                        | Boolean       | `false` | -                  |
| disabled                                          | disabled                                        | Boolean       | `false` | -                  |
| clearable <sup class="version-after">2.5.3+</sup> | clearable                                       | Boolean       | `false` | -                  |
| rows                                              | rows                                            | String/Number | `'3'`   | -                  |
| error                                             | error message                                   | String        | -       | -                  |
|formation <sup class="version-after">2.5.13+</sup>  |input text formatting callback function|Function(name, curValue, curPos): {value: curValue, range: curPos}|-|passing parameter `name` is the name of input, `curValue` is input value, `curPos` is the current position of input cursor, and returned `value` is formatted value. `range` is the position of input cursor after formatting|
| compositionable <sup class="version-after">2.6.1+</sup> | 
Whether to enable text input processing, the `change` event will be triggered only after the input confirmation is enabled| Boolean       | `false` | -              |

#### TextareaItem Slots

##### footer

the slot of footer

#### TextareaItem Events

##### focus()
Input gets focus

##### blur()
Input loses focus

##### getValue()
Get value of input

#### TextItem Events

##### @focus(name)
Textarea gets focus

##### @blur(name)
Textarea loses blur

##### @change(name, value)
Change the value of Textarea

##### @keyup(name, event)
key press

##### @keydown(name, event)
key release

##### @compositionstart(name, event)
Chinese input start

##### @compositionend(name, event)
Chinese input confirm or cancel