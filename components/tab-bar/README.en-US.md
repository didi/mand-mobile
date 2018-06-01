---
title: TabBar
preview: https://didi.github.io/mand-mobile/examples/#/tab-bar
---

Used to create a tab bar without a content area

### Import

```javascript
import { TabBar } from 'mand-mobile'

Vue.component(TabBar.name, TabBar)
```

### Code Examples
<!-- DEMO -->

### API

#### TabBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
| titles | tab bar data source | Array | - | Passing in the array will render the component directly based on the contents of the array, or you can insert a custom title button directly into the control without using this property. This value is an array of strings when `scope-slot` is not used; it is an array of objects when `scope-slot` is used, and each object is used as a parent for props |
| show-ink-bar | display underline | Boolean | true | - |
| ink-bar-length | underline width | Number | 70 | percentage of the width of the label button underlined, must be between `0-100` |
| ink-bar-animate | enable underline animation | Boolean | true | - |
| default-index | default activated label index | Number | 0 | - |

#### TabBar Methods

##### selectTab(index)
select a tab

|Parameters | Description | Type|
|----|-----|------|------|
| index | index of tab | Number |

#### TabBar Events

##### @indexChanged(index, preIndex)
selected tab index changes

|Props | Description | Type|
|----|-----|------|
| index | index of current selected tab | Number |
| preIndex | index of previous selected tab | Number |
