---
title: Drop-down Menu
preview: https://didi.github.io/mand-mobile/examples/#/drop-menu
---

Drop-down menu is for list filtering

### Import

```javascript
import { DropMenu } from 'mand-mobile'

Vue.component(DropMenu.name, DropMenu)
```

### Code Examples
<!-- DEMO -->

### API

#### DropMenu Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|data|data source|Array<{text, disabled, options, ...}>|`[]`|`disabled` is whether to disable a button or not; the type of `options` is `Array<{text, disabled, ...}>`|
|defaultValue|initial value|Array<String>|`[]`|-|
|option-render|return rendering contents of each option|Function({text, disabled, ...}):String|-|`vue 2.1.0+` can use `slot-scope`，refer to `Radio`|

#### DropMenu Methods

##### getSelectedValue(index): listItem
Get selected value of a `barItem`

|Parameters | Description | Type| Default|
|----|-----|------|------|
|index|index of `barItem`|Number|-|

Returns

|Props | Description | Type|
|----|-----|------|
|listItem|data of `listItem`|Object: {text, disabled, options, ...}|

##### getSelectedValues(): listItems
Get selected values of all `barItem`

Returns

|Props | Description | Type|
|----|-----|------|
|listItems|dataset of `listItem`|Array<{text, disabled, options, ...}>|

#### DropMenu Events

##### @change(barItem, listItem)
Select some event

|Props | Description | Type|
|----|-----|------|
|barItem|data of `barItem`|Object: {text, disabled, options, ...}|
|listItem|data of `listItem`|Object: {text, disabled, ...}|

##### @show()
Show events on drop-down menu

##### @hide()
Hide events on drop-down menu
