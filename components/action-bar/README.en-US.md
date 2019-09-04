---
title: ActionBar
preview: https://didi.github.io/mand-mobile/examples/#/action-bar
---

Bottom sidebar with a number of texts or action buttons that can be used to present form information and submit buttons

### Import

```javascript
import { ActionBar } from 'mand-mobile'

Vue.component(ActionBar.name, ActionBar)
```

### Instruction

ActionBar is fixed at the bottom of the page by `position: fixed`. In order to avoid the page content being occluded, you need to reserve a blank of not less than `100px` at the bottom (the iPhone also needs to add `constant(safe-area-inset-bottom)`).

### Code Examples
<!-- DEMO -->


### API

#### ActionBar Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|actions|button group|Array\<ActionOptions\>|-|-|

#### ActionOptions Props

|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|text|-|String|-|
|disabled|-|Boolean|`false`|
|onClick|click handler|Function(action: ActionOptions)|-|
|type <sup class="version-after">2.5.0+</sup>|-|String|`disabled` when the prop `disabled` is true, otherwise is `primary`|
|plain <sup class="version-after">2.5.0+</sup>|-|Boolean|`false` for the last one and `true` for the others|
|round <sup class="version-after">2.5.0+</sup>|-|Boolean|`false`|
|icon <sup class="version-after">2.5.0+</sup>|icon name|String|-|
|iconSvg <sup class="version-after">2.5.0+</sup>|use svg icon|Boolean|`false`|
|inactive <sup class="version-after">2.5.0+</sup>|-|Boolean|`false`|
|loading <sup class="version-after">2.5.0+</sup>|-|Boolean|`false`|

#### ActionBar Slots

##### default
left content

#### ActionBar Events

##### @click(event, action)
Button click event

|Props | Description | Type |
|----|-----|------|
|action|object corresponding to the clicked button in the actions list|Object: ActionOptions|
