---
title: Selector
preview: https://didi.github.io/mand-mobile/examples/#/selector
---

For selecting an item from the popup list

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
|v-model|display selector or not|Boolean|false|-|
|data|data source|Array<{value,text,...}>|`[]`|`text` can be a `html` fragment|
|default-value|the value of initially selected item|String|-|-|
|title|title of selector|String|-|-|
|describe|description of selector|String|-|-|
|ok-text|confirmation text|String|-|if empty, it will be `confirmed mode`, that is, click to select directly|
|cancel-text|cancellation text|String|`cancel`|-|
|mask-closable|if the popup will be closed when clicking mask|Boolean|`true`|-|
|is-check|has a `check` icon or not|Boolean|`false`|only for `confirmed mode`|
|max-height|the maximum height of selectable area|Number/String|`auto`|-|
|min-height|the minimum height of selectable area|Number/String|`auto`|-|

#### Selector Events

#### @choose({value, text, ...})
Select one item

#### @confirm({value, text, ...})
Confirm selection

#### @cancel()
Cancel selection

#### @show()
Show selector

#### @hide()
Hide selector

#### Selector Slots
```html
<md-selector>
  <template slot-scope="{ option }">
    <div class="md-selector-custom-title">Hello, {{ option.text }}</div>
  </template>
</md-selector>
```
