---
title: ImageReader
preview: https://didi.github.io/mand-mobile/examples/#/image-reader
---

For photo album reading or photos taking

### Import

```javascript
import { ImageReader } from 'mand-mobile'
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor'

// Image processing plugin, refer to #imageProcessor for usage

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
|amount|number of sheets|Number|-|valid only when `is-multiple` is `true`|

#### ImageReader Events

##### @select(name, { files })
Picture selection completed, while reading hasn't been started yet

|Parameters | Description | Type|
|----|-----|------|
|name|identifier|String|
|files|image file objects set|Array<File>|

##### @complete(name, { dataUrl, blob, file })
Picture reading completed

|Parameters | Description | Type|
|----|-----|------|
|name|identifier|String|
|dataUrl|base64|String|
|blob|image Blob object for `formData`|Blob|
|file|image file object|File|

##### @error(name, { code, msg })
Picture selection and reading failed

|Parameters | Description | Type|
|----|-----|------|
|name|identifier|String|
|code|error identifier|String|
|msg|error message|String|

### imageProcessor

For image axial correction, picture quality compression and height control

#### Import

```javascript
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor'

/**
 * options Image processing configuration
 * fn(dataUrl, blob) Process completes callback
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
