---
title: Change Log
toc: hidden
---

### 1.5.0
`2018-07-20`
- Feature
  - Add `ScrollView` component
  - Add `CheckGroup`, `CheckList`, `CheckBox` components
  - `Radio` supports `is-across-border` prop
  - `Steps` supports `slot-scoped` with `index`
  - `TabBar` supports horizontal scrolling
- Fix
  - Fix asynchronous data-loading bug  of `Swiper`[#150](https://github.com/didi/mand-mobile/issues/150)
  - Fix automatic-installing bug while importing components library in global environment [#141](https://github.com/didi/mand-mobile/issues/141)
  - Fix style bug of `Radio`

### 1.4.4
`2018-07-12`
- Fix
  - `Swiper` document bug [#138](https://github.com/didi/mand-mobile/issues/138)
  - `Cashier` success icon style bug
  - `InputItem` numeric value support [#132](https://github.com/didi/mand-mobile/issues/132)
  - `Picker` return `undefined` of `getColumnValue` method when not set `defeaultIndex` [#131](https://github.com/didi/mand-mobile/issues/131)

### 1.4.3
`2018-07-04`
- Fix
  - `Radio` style bug

### 1.4.1
`2018-07-01`
- Feature
  - Add `Amount` component
  - Add `ActivityIndicator` component
  - `Dialog` add `Dialog.closeAll` static method
  - `ActionSheet` add static method to create action-sheet [#79](https://github.com/didi/mand-mobile/issues/79)
  - `FieldItem` remove restrictions on `arrow` [#124](https://github.com/didi/mand-mobile/issues/124)
- Fix
  - `Agree` flexbox layout bug

### 1.3.3
`2018-06-15`
- Feature
  - `Toast` add support of custom position [#89](https://github.com/didi/mand-mobile/issues/89)
- Fix
  - `InputItem` unformatted input maxlength limit

### 1.3.2
`2018-06-11`
- Feature
  - Increase `css varialbe` coverage

### 1.3.1
`2018-06-08`
- Feature
  - Add support of `css varialbe`
  - `ImageReader` callback add image file argument
  - `Cashier` add support of customized text
- Fix
  - `InputItem` issue [#104](https://github.com/didi/mand-mobile/issues/104)

### 1.3.0
`2018-06-01`
- Feature
  - `Selector`, `TabPicker` add support of `mask-closable` porp [#64](https://github.com/didi/mand-mobile/issues/64)
  - `Cashier` change the presentation of channels [#77](https://github.com/didi/mand-mobile/issues/77)
  - `Capatcha` add support to customize button text and add `auto-countdown` prop to control whether auto send code or not [#84](https://github.com/didi/mand-mobile/issues/84)
  - `ActionSheet` add `maxHeight` [#86](https://github.com/didi/mand-mobile/issues/86)
  - `InputItem` support `digit` type and other standard html input type [#95](https://github.com/didi/mand-mobile/issues/95)
  - `Picker`，`DatePicker`，`TabPicker` will cancel change when click mask or cancel button
- Fix
  - Fix `DatePicker` bug [#75](https://github.com/didi/mand-mobile/issues/75)
  - Fix some document bugs

### 1.2.3
`2018-05-11`
- Fix
  - Fix issue [#78](https://github.com/didi/mand-mobile/issues/78)
  - Update documentation site

### 1.2.2
`2018-05-09`
- Fix
  - Fix issue [#67](https://github.com/didi/mand-mobile/issues/67)
  - Fix issue [#69](https://github.com/didi/mand-mobile/issues/69)
  - Fix issue [#72](https://github.com/didi/mand-mobile/issues/72)
- Feature
  - Add `vw` responsive
  - Make `Popup` to adapt iPhone X

<!-- CUTOFF -->
### 1.1.1
`2018-05-06`
- Fix
  - Fix issue [#62](https://github.com/didi/mand-mobile/issues/62)
  - Fix issue [#63](https://github.com/didi/mand-mobile/issues/63)

### 1.1.0
`2018-05-04`
- Feature
  - Add `fade` mode of `Swiper` [#20](https://github.com/didi/mand-mobile/issues/20)
  - Add `v-model` prop to control the visibility of `ImageViewer` [#42](https://github.com/didi/mand-mobile/issues/24)
  - Add support digit support of `Toast` content [#43](https://github.com/didi/mand-mobile/issues/43)

- Fix
  - Fix `Picker` bug when reset `DefaultIndex` [#50](https://github.com/didi/mand-mobile/issues/50)
  - Fix `display:box` warning of `Autoprefixer` [#54](https://github.com/didi/mand-mobile/issues/54)

<!-- CUTOFF -->
### 1.0.9
`2018-04-26`
- Fix issue [#47](https://github.com/didi/mand-mobile/issues/47)

### 1.0.8
`2018-04-24`
- Remove the need of `.native` modifier of Button
- `Landscape` component add `mask-closable` prop

### 1.0.6
`2018-04-20`
- Fix issue [#29](https://github.com/didi/mand-mobile/issues/29)

<!-- CUTOFF -->
### 1.0.5
`2018-04-18`
- Fix issue [#24](https://github.com/didi/mand-mobile/issues/24)

### 1.0.4
`2018-04-12`
- Fix `components/index.js` bug

### 1.0.2
`2018-04-12`
- Add global package version

### 1.0.1
`2018-04-12`
- Fix wrong package entry

### 1.0.0
`2018-04-11`
- Initial release


