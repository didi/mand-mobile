---
title: Toast
preview: https://didi.github.io/mand-mobile/examples/#/toast
---

### How to Use

```javascript
import { Toast } from 'mand-mobile'

Toast.succeed('Good Job!')
```

### Code Example
<!-- DEMO -->

### API

#### Toast({content, icon, duration, hasMask, parentNode})
Dynamically create a toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| icon | The icon of message type | String | - |Refer to `Icon` component |
| content | Message content | String | Number | - |- |
| duration | Delay time to close in millisecond, set `0` will always be visible | Number | `3000` | - |
| hasMask | Whether to show a transparent mask, which will prevent user touch action | Boolean | `false` | - |
| parentNode | The portal node of toast | HTMLElement | `document.body`| - |

#### Toast.info(content, duration, hasMask, parentNode)
Dynamically create a text toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | Message content | String | Number | - |- |
| duration | Delay time to close in millisecond, set `0` will always be visible | Number | `3000` | - |
| hasMask | Whether to show a transparent mask, which will prevent user touch action | Boolean | `false` | - |
| parentNode | The portal node of toast | HTMLElement | `document.body`| - |

#### Toast.succeed(content, duration, hasMask, parentNode)
Dynamically create a succeed toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | Message content | String | Number | - |- |
| duration | Delay time to close in millisecond, set `0` will always be visible | Number | `3000` | - |
| hasMask | Whether to show a transparent mask, which will prevent user touch action | Boolean | `false` | - |
| parentNode | The portal node of toast | HTMLElement | `document.body`| - |

#### Toast.failed(content, duration, hasMask, parentNode)
Dynamically create a failed toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | Message content | String | Number | - |- |
| duration | Delay time to close in millisecond, set `0` will always be visible | Number | `3000` | - |
| hasMask | Whether to show a transparent mask, which will prevent user touch action | Boolean | `false` | - |
| parentNode | The portal node of toast | HTMLElement | `document.body`| - |

#### Toast.loading(content, duration, hasMask, parentNode)
Dynamically create a loading toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | Message content | String | Number | - |- |
| duration | Delay time to close in millisecond, set `0` will always be visible | Number | `0` | - |
| hasMask | Whether to show a transparent mask, which will prevent user touch action | Boolean | `false` | - |
| parentNode | The portal node of toast | HTMLElement | `document.body`| - |

#### Toast.hide()
Hide current toast.
