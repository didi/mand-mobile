---
title: license-plate
preview:
---

To display ads or descriptions in a floating layer <sup class="version-after">2.7.0+</sup>

### Import

```javascript
import { Landscape } from 'mand-mobile'

Vue.component(Landscape.name, Landscape)
```

### Code Examples
<!-- DEMO -->

### API

#### LicensePlate Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|-----|
|shortcuts|Province key position data|Array|`['京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼', '川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新', '藏']`| - |
|letterData|Alphabetic keyboard data|Array|`[{value: 'Q',disabled: false,},{value: 'W',disabled: false,},{value: 'E',disabled: false,},{value: 'R',disabled: false,},{value: 'T',disabled: false,},{value: 'Y',disabled: false,},{value: 'U',disabled: false,},{value: 'I',disabled: true,},{value: 'O',disabled: true,},{value: 'P',disabled: false,},{value: 'A',disabled: false,},{value: 'S',disabled: false,},{value: 'D',disabled: false,},{value: 'F',disabled: false,},{value: 'G',disabled: false,},{value: 'H',disabled: false,},{value: 'J',disabled: false,},{value: 'K',disabled: false,},{value: 'L',disabled: false,},{value: 'Z',disabled: false,},{value: 'X',disabled: false,},{value: 'C',disabled: false,},{value: 'V',disabled: false,},{value: 'B',disabled: false,},{value: 'N',disabled: false,},{value: 'M',disabled: false,}]`| - |
|modeShow|Display mode|String|`division`| division/popUp |
|showPopUp|Control display in popup mode|Boolean|`false`| - |
|title|The title is displayed in pop-up mode|String|`请输入车牌号码`| - |
|subtitle|The subtitle is displayed in pop-up mode|String|``| - |
|defaultValue|Default key value|String|``| - |

#### LicensePlate Events

##### @hide()
hide Pop

##### @confirm()
confirm
