---
title: TabPicker
preview: https://didi.github.io/mand-mobile/examples/#/tab-picker
---

Support cascaded selections in the footer

### Import

```javascript
import { TabPicker } from 'mand-mobile'

Vue.component(TabPicker.name, TabPicker)
```

### Code Examples
<!-- DEMO -->

### API

#### TabPicker Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|whether to show tabpicker or not|Boolean|`false`|-|
|default-value|default values|Array|`[]`|-|
|data|data source|Object|`{}`|refer to `Appendix` for data format|
|title|the title of tabpicker|String|-|-|
|describe|the describe of tabpicker|String|-|-|
|placeholder|default label for each tab pane|String|`please select`|-|
|mask-closable|if the popup will be closed when clicking on the mask|Boolean|`true`|-|
|extrasData <sup class="version-after">2.6.1+</sup>|Note: Only default-value attributes are empty or no options are not selected. quickly select the area data source|Object|`{}`|refer to `Appendix` for data format|


#### TabPicker Methods

##### getSelectedValues()
Get all values of selected items

```
['value1', 'value2', 'value3']
```

#### getSelectedOptions()
Get all options of selected items

```
[
  { value: 'value1', label: 'Item1' },
  { value: 'value2', label: 'Item2' },
  // ...
]
```

#### TabPicker Events

##### @select(data)
Option selected event

```
// data对象
{
  index: 0,
  value: 'value1',
  options: { value: 'value1', label: 'Item1' }
}
```

##### @change(data)
Change selection in the tabpicker

```
// data object
{
  values: ['value1', 'value2', 'value3'],
  options: [
    { value: 'value1', label: 'Item1' },
    { value: 'value2', label: 'Item2' },
    // ...
  ]
}
```

##### @show()
Show tabPicker

##### @hide()
Hide tabPicker

#### TabPicker Slots
Custom option item slot

```
<md-tab-picker>
  <div slot="item" scoped-slot="{ option }">
    Hello, {{option.label}}
  </div>
</md-tab-picker>
```

### Appendix

* Data format of cascaded data source

```javascript
// property data
{
  // unique key
  name: '',
  // pane title
  label: '',
  // pane options
  options: [
    {
      // option value
      value: "",
      // option label
      label: "",
      // cascade pane
      children: {
        name: '',
        label: '',
        options: [
          // ...
        ]
      }
    }
  ]
}

// property extrasData
{
  subtitle: 'hot cities',  //quickly select zone title
  list: [
    {
      value: 'pk',
      label: 'beijing',
      icon: 'location', // Quickly select the area data item icon type
      size: 'sm',       // Quickly select the area data item icon size
      color: 'blue',    // Quickly select the area data item icon color
    },
    {
      value: 'cd',
      label: 'chengdu',
    }
  ],
}
```
