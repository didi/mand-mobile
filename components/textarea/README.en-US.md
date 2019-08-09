### Import

```javascript
import { Textarea } from 'mand-mobile'

Vue.component(Textarea.name, Textarea)
```

### Code Examples
<!-- DEMO -->

### API

#### Textarea Props
| Props       | Description                                      | Type          | Default | Note               |
| ----------- | ------------------------------------------------ | ------------- | ------- | ------------------ |
| title       | title of textarea                                | String        | -       | -                  |
| placeholder | placeholder of textarea                          | String        | -       | -                  |
| v-model     | value of textarea                                | String        | -       |                    |
| maxLength   | max length of textarea                           | String/Number | -       | -                  |
| autosize    | Dose the Textarea  resize with content           | Boolean       | `false` | -                  |
| maxHeight   | The max height of textarea with `autosize=true`, | String/Number | `'40'`  | rely on `autosize` |
| solid       | the width of title is fixed or not               | Boolean       | `true`  |                    |
| readonly    | readonly                                         | Boolean       | `false` | -                  |
| disabled    | disabled                                         | Boolean       | `false` | -                  |
| rows        | rows                                             | String/Number | `'3'`   | -                  |
| error       | error message                                    | String        | -       | -                  |

#### Textarea Slots

##### footer

the slot of footer

#### Textarea Events

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
