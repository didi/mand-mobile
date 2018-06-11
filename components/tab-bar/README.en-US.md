---
title: TabBar
preview: https://didi.github.io/mand-mobile/examples/#/tab-bar
---

To create a tab bar without a content area

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
| titles | array of titles of tab bar | Array | - | Passing in the array will render the component directly based on the contents of the array, or you can insert a customized title button directly into the control without using this property. This value is an array of strings while not using `scope-slot`; or an array of objects when using `scope-slot`, and each object is used as props for parent component|
| show-ink-bar | display underline | Boolean | true | - |
| ink-bar-length | the width of underline | Number | 70 | the percentage of the width of underline that in the label button, between `0-100` |
| ink-bar-animate | enable underline animation | Boolean | true | - |
| default-index | default activated label index | Number | 0 | - |

#### TabBar Methods

##### selectTab(index)
select a tab

|Parameters | Description | Type|  Default |
|----|-----|------|------|
| index | index of tab | Number | - |

#### TabBar Events

##### @indexChanged(index, preIndex)
selected tab index changes

|Props | Description | Type|
|----|-----|------|
| index | index of current selected tab | Number |
| preIndex | index of previous selected tab | Number |
