---
title: ActionSheet
preview: https://didi.github.io/mand-mobile/examples/#/action-sheet
---

Support scenario-relevent operations

### Import

```javascript
import { ActionSheet } from 'mand-mobile'

Vue.component(ActionSheet.name, ActionSheet)
```

### Code Examples
<!-- DEMO -->


### API

#### ActionSheet Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|------|
|v-model|display actionsheet or not|Boolean|`false`|-|
|title|title of actionsheet|String|-|-|
|options|options of actionsheet|Array<{text, value}>| [] |-|
|default-index|default selected index|Boolean|0|-|
|invalid-index|invalid index|Number| -1|-|
|cancel-text|cancel text|String|-|-|
|max-height<sup class="version-after">1.3.0+</sup>|the maximum height of actionsheet area|Number|`400`|unit `px`|


#### ActionSheet Events

##### @selected(item)
Select event

|Props | Description | Type |
|----|-----|------|
|item|selected value|Object: {text, value}|

##### @selected(item)

Cancel selection

##### @show()

Show actionsheet

##### @hide()

Hide actionsheet
