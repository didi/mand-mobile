---
title: ResultPage
preview: https://didi.github.io/mand-mobile/examples/#/result-page
---

Used to display the process end page

### Import

```javascript
import { ResultPage } from 'mand-mobile'

Vue.component(ResultPage.name, ResultPage)
```

### Usage Guide

It is recommended that the parent element set up be filled with windows to achieve the effect of centering. The picture on the page will be set according to the `type` default value.

### Code Examples
<!-- DEMO -->

### API

#### ResultPage Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|type | page type | String | `empty` | `lost`(missing page), `network`(network error), `empty`(empty information). The component will have different default images and copy depending on the category|
|img-url | image link | String | picture of `empty` | depending on the category, the component will have a different default picture |
|text | main copy | String | `暂无信息` | depending on the category, the component will have a different default master copy |
|subtext | description copy | String | - | shows under the main copy in a smaller font and a lighter color |
|buttons | button list | Array | - | button object structure can refer to `Button Props` table|

#### Button Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|text | button text | String | - | - |
|type | button style | String | `ghost` | also `ghost-primary`, refer to `Button` |
|handler | click operation callback | Function | - | - |
