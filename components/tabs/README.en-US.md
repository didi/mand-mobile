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
|titles|array of titles of tab bar|Array|-|Passing in the array will render the component directly based on the contents of the array, or you can insert a customized title button directly into the control without using this property. This value is an array of strings while not using `scope-slot`; or an array of objects when using `scope-slot`, and each object is used as props for parent component|
| show-ink-bar | display underline | Boolean | true | - |
| ink-bar-length | the width of underline | Number | 70 | the percentage of the width of underline that in the label button, between `0-100` |
| ink-bar-animate | enable underline animation | Boolean | true | - |
| default-index | default activated label index | Number | 0 | - |
| noslide|disable animation transitions|Boolean|`false`|-|

#### Tabs Methods

##### selectTab(index)
select a tab

|Parameters | Description | Type| Default
|----|-----|------|------|
| index | index of tab | Number |-

#### Tabs Events

##### @change(index, preIndex)
selected tab index changes

|Props | Description | Type|
|----|-----|------|
| index | index of current selected tab | Number |
| preIndex | index of previous selected tab | Number |
