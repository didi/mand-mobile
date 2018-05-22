---
title: ImageViewer
preview: https://didi.github.io/mand-mobile/examples/#/image-viewer
---

Used to browse multiple pictures and swipe to switch pictures

### Import

```javascript
import { ImageViewer } from 'mand-mobile'

Vue.component(ImageViewer.name, ImageViewer)
```


### Code Examples
<!-- DEMO -->

### API

#### ImageViewer Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| v-model | viewer display | Boolean | `false` |
| list |picture list | Array<String> | `[]` | -|
| initial-index | index of the initial displayed image | Number | `0` | - |
| has-dots | display the picture index value | Boolean | `true` | - |

