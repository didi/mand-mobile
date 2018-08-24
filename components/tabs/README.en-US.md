---
title: Tabs
preview: https://didi.github.io/mand-mobile/examples/#/tabs
---

To create a tab page with a content area

### Import

```javascript
import { Tabs } from 'mand-mobile'

Vue.component(Tabs.name, Tabs)
```

### Code Examples
<!-- DEMO -->

### API

#### Tabs Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|items|tabs data|Array<{key: String, label: String}>|-|-|
| has-ink | display underline ink bar | Boolean | true | - |
| ink-length | the width of ink bar | Number | 80 | the percentage width of ink bar, between `0-100` |
| v-model | key of selected tab | String | - | - |

#### Tabs Methods

##### reflow(index)
relayout tabs

#### Tabs Events

##### @change(item, index)
selected tab index changes

|Props | Description | Type|
|----|-----|------|
| item | object of previous selected tab | Object |
| index | index of current selected tab | Number |

#### Tabs Slot
```javascript
<md-tabs>
  <template slot="item" slot-scope="{ item, activeKey, index, items }">

  </template>
</md-tabs>
```
