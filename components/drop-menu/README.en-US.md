---
title: DropMenu
preview: https://didi.github.io/mand-mobile/examples/#/drop-menu
---

Drop-down menu for list filtering

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
|data|data source|Array<{text, disabled, options, ...}>|`[]`|type of `options` is `Array<{text, disabled, ...}>`|
|defaultValue|initial value|Array<String>|`[]`|-|
|option-render|return options rendering content|Function({text, disabled, ...}):String|-|`vue 2.1.0+` can use `slot-scope`，refer to `Radio`|

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
`listItem` selection changes

|Props | Description | Type|
|----|-----|------|
|barItem|data of `barItem`|Object: {text, disabled, options, ...}|
|listItem|data of `listItem`|Object: {text, disabled, ...}|

##### @show()
Drop-down menu has been shown

##### @hide()
Drop-down menu has been hidden
