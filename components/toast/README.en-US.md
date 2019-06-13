---
title: Toast
preview: https://didi.github.io/mand-mobile/examples/#/toast
---

### Import

```javascript
import { Toast } from 'mand-mobile'

Toast.succeed('Good Job!')

this.$toast.info('hint') // Totally Import
```

### Instruction

### Code Examples
<!-- DEMO -->

### API

#### Toast Static Methods

##### Toast({content, icon, iconSvg, duration, position, hasMask, parentNode})
Dynamically create a toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| icon | name of icon | String | - | refer to `Icon` component for customized icons|
| iconSvg | use svg icon | Boolean | `false` |-|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| position | display position | String | `center` | `top/center/bottom` |
| hasMask | whether to show a transparent mask, which will prevent users from clicking| Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.info(content, duration, hasMask, parentNode)
Dynamically create a text toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.succeed(content, duration, hasMask, parentNode)
Dynamically create a success toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message | String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.failed(content, duration, hasMask, parentNode)
Dynamically create a failed toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration |toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.loading(content, duration, hasMask, parentNode)
Dynamically create a loading toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `0` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |
| parentNode | portal node of toast | HTMLElement | `document.body`| - |

##### Toast.hide()
Hide current toast

#### Toast.component Props

<sup class="version-after">2.3.0+</sup>

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| icon | name of icon | String | - | refer to `Icon` component for customized icons|
| iconSvg | use svg icon | Boolean | `false` |-|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| position | display position | String | `center` | `top/center/bottom` |
| hasMask | whether to show a transparent mask, which will prevent users from clicking| Boolean | `false` | - |

```html
<md-toast>
  <md-activity-indicator>loading...</md-activity-indicator>
</md-toast>
```

#### Toast.component Methods

<sup class="version-after">2.3.0+</sup>

##### show()
Show toast

##### hide()
Hide toast

#### Toast.component Events

<sup class="version-after">2.3.0+</sup>

##### @show()
Toast show event

##### @hide()
Toast hidden event