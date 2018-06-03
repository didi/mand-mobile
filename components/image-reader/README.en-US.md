---
title: ImageReader
preview: https://didi.github.io/mand-mobile/examples/#/image-reader
---

Used for photo album reading or to take photos

### Import

```javascript
import { ImageReader } from 'mand-mobile'
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor'

// Image processing plugin, usage refer to #imageProcessor

Vue.component(ImageReader.name, ImageReader)
```

### Code Examples
<!-- DEMO -->

### API

#### ImageReader Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|identifier|String|-|used to distinguish multiple readers|
|size|image size limit|String/Number|-|unit `kb`|
|mime|supported image types|Array|`*`|such as `['jpeg','png']`|
|is-camera-only|only support photographing|Boolean|`false`|-|
|is-multiple|support selection of multiple sheets|Boolean|`false`|-|
|amount|number of sheets|Number|-|only valid when `is-multiple` is `true`|

#### ImageReader Events

##### @select
Picture selection completion has not yet started reading

##### @complete(name, { dataUrl, blob })
Picture read completion

|Parameters | Description | Type|
|----|-----|------|
|name|identifier|String|
|dataUrl|base64|String|
|blob|Image Blob object for `formData`|Blob|

##### @error(name, { code, msg })
Picture read failed

|Parameters | Description | Type|
|----|-----|------|
|name|identifier|String|
|code|error code, see appendix|String|
|msg|error message, see appendix|String|

### imageProcessor

Used for image axial correction, picture quality compression, height control

#### Import

```javascript
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor'

/**
 * options Image processing configuration
 * fn(dataUrl, blob) Process complete callback
 * @return Promise({dataUrl, blob})
 */
imageProcessor(options[, fn])

```

#### options

|Props | Description | Type | Note |
|----|-----|------|------|
|dataUrl|base64|String|-|
|width|picture width|Number|unit `px`, scaled when width exceeds|
|height|picture height|Number|unit `px`, scaled when height exceeds|
|quality|picture quality|Number|value range `0-1`|

### Appendix
Picture read failed error code and error message

```
'100': 'browser does not support'
'101': 'picture size is beyond the preset'
'102': 'picture read failure'
'103': 'the number of pictures exceeds the limit'
```