---
title: Selector
preview: https://didi.github.io/mand-mobile/examples/#/selector
---

Used to select an item from the popup list

### Import

```javascript
import { Selector } from 'mand-mobile'

Vue.component(Selector.name, Selector)
```

### Code Examples

<!-- DEMO -->

### API

#### Selector Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|selector display|Boolean|false|-|
|data|data source|Array<{value,text,...}>|`[]`|`label` can be a `htmlFragment`|
|default-index|index of initial selected item|Number|-|-|
|invalid-index|index of disabled selected item|Number|-|-|
|title|title of selector|String|-|-|
|ok-text|text of confirmation|String|-|if it is empty, it will be `confirmed mode`, that is, click option to select directly|
|cancel-text|text of cancellation|String|`取消`|-|
|mask-closable|click on the mask to close the popup|Boolean|`true`|-|
|is-check|has a `check` icon|Boolean|`false`|only for `confirmed mode`|
|option-render|return rendering content of each option|Function({value, text ,...}):String|-|`vue 2.1.0+` can use `slot-scope`, refer to `Radio`|
|max-height|selector content area maximum height, beyond scrolling|Number|400|unit `px`|


#### Selector Events

#### @choose({value, text, ...})
Select one of the options

#### @confirm({value, text, ...})
Confirm selection

#### @cancel()
Cancel selection

#### @show()
Selector has been displayed

#### @hide()
Selector has been hidden
