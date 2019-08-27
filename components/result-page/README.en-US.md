---
title: ResultPage
preview: https://didi.github.io/mand-mobile/examples/#/result-page
---

To display the process ending page

### Import

```javascript
import { ResultPage } from 'mand-mobile'

Vue.component(ResultPage.name, ResultPage)
```

### Instruction

It is recommended to set the parent element filled with windows to achieve centering. The corresponding default value of picture on the page will be set according to the `type`.

### Code Examples
<!-- DEMO -->

### API

#### ResultPage Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|type | page type | String | `empty` | three optional vaules: `lost`, `network` and `empty`, represent missing page, network error and empty information respectively. The default images and texts of component differ according to the category|
|img-url | image link | String |`empty` | the default images of component differ according to the category |
|text | main copy | String | - | the main texts of component differ according to the category |
|subtext | assistant copy | String | - | show as a smaller font and lighter color under the main copy|
|buttons | button list | Array | - | array of button objects, whose structure can be referred to `Button`|

#### Button Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text | button text | String | - | - |
|type | button style | String | `default` | refer to `Button` |
|handler | callback of click operation | Function | - | callback function invoked after clicking |
|plain|-|Boolean|`false` for the last one and `true` for the others|-|
|round|-|Boolean|`false`|-|
|icon|icon name|String|-|-|
|iconSvg|use svg icon|Boolean|`false`|-|
|inactive|-|Boolean|`false`|-|
|loading|-|Boolean|`false`|-|
