---
title: LicensePlate 车牌键盘
preview:
---

专用于车牌输入键盘

### 引入

```javascript
import { LicensePlate } from 'mand-mobile'

Vue.component(LicensePlate.name, LicensePlate)
```

### 代码演示
<!-- DEMO -->

### API

#### LicensePlate Props
|属性 | 说明 | 类型 | 默认值| 备注 |
|----|-----|------|------|-----|
|shortcuts|省份键位数据|Array|`['京','津','渝','沪','冀','晋','辽','吉','黑','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','琼','川','贵','云','陕','甘','青','蒙','桂','宁','新','藏']`| - |
|letterData|字母键盘数据|Array|`[{value: 'Q',disabled: false,},{value: 'W',disabled: false,},{value: 'E',disabled: false,},{value: 'R',disabled: false,},{value: 'T',disabled: false,},{value: 'Y',disabled: false,},{value: 'U',disabled: false,},{value: 'I',disabled: true,},{value: 'O',disabled: true,},{value: 'P',disabled: false,},{value: 'A',disabled: false,},{value: 'S',disabled: false,},{value: 'D',disabled: false,},{value: 'F',disabled: false,},{value: 'G',disabled: false,},{value: 'H',disabled: false,},{value: 'J',disabled: false,},{value: 'K',disabled: false,},{value: 'L',disabled: false,},{value: 'Z',disabled: false,},{value: 'X',disabled: false,},{value: 'C',disabled: false,},{value: 'V',disabled: false,},{value: 'B',disabled: false,},{value: 'N',disabled: false,},{value: 'M',disabled: false,}]`| - |
|modeShow|展示模式|String|`division`| division/popUp |
|showPopUp|弹窗模式下控制展示|Boolean|`false`| - |
|title|弹窗模式下展示标题|String|`请输入车牌号码`| - |
|subtitle|弹窗模式下展示副标题|String|``| - |
|defaultValue|默认键位值|String|``| - |

#### LicensePlate Events

##### @hide()
半弹层关闭事件

##### @confirm()
键盘确认事件
