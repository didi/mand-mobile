---
title: Change Log
toc: hidden
---

### 2.5.20

`2021-07-22`

- Feat
  - Add more i18n support in the project

### 2.5.19

`2021-05-14`

- Fix
  - Fix the problem of incorrect image size modification by `image-reader`
  - Fix the problem that `stepper` can't enter the decimal point
  - Fix the problem that the `process.env.MAND_ENV` environment variable is not injected correctly

### 2.5.18

`2021-04-02`

- Fix
  - Fix the problem that the initial value of `stepper` is `-` `.` incorrectly parsed
  - Fix the problem of incorrect image size modification by `image-reader`

### 2.5.17

`2021-03-02`

- Feat
  - Add i18n support in the project

### 2.5.16

`2021-02-26`

- Fix
  - Fix the issue of picture angle correction

### 2.5.15

`2021-02-04`

- Fix
  - Replace `NODE_ENV` with `MAND_ENV` in some components

### 2.5.14

`2021-01-15`

- Feat
  - `Dialog` supports passing in `transition` when using static methods[#716](https://github.com/didi/mand-mobile/issues/716)
- Fix
  - Fix `Tip` error when no attributes in subcomponent
  - Fix the conflict of `InputItem` component instance method sharing `debounce` internal variables

### 2.5.13

`2020-09-17`

- Feat
  - `TextareaItem` support formation[#699](https://github.com/didi/mand-mobile/issues/699)

- Fix
  - Fix spelling errors in the document[#690](https://github.com/didi/mand-mobile/issues/690)
  - Fix the bug of `DatePicker` unit test
  - Fix the type check of `RadioGroup` to `value`[#693](https://github.com/didi/mand-mobile/issues/693)

### 2.5.12

`2020-07-24`

- Fix
  - Avoid repeated triggering of click and touchstart in `NumberKeyboard` component

### 2.5.11

`2020-05-29`

- Fix
  - Fix the issue of incorrect Chinese currency unit of `Amount` component[#675](https://github.com/didi/mand-mobile/issues/675)

### 2.5.10

`2020-04-30`

- Fix
  - Fix the issue of incorrect font line-height of `Button` under text link type[#663](https://github.com/didi/mand-mobile/issues/663)
  - Fix the issue that `jpgencoder` in` ImageReader` may be repeatedly loaded (such as in micro front-end mode)
  - Fix `TabBar` size calculation compatibility issue

### 2.5.9

`2020-03-26`

- Feat
  - `CheckGroup` adds method `toggleAll`, used to Select All or Deselect[#648](https://github.com/didi/mand-mobile/issues/648)

- Fix
  - Fix `TextAreaItem` has wrong height,when it's filled with asynchronous content

### 2.5.8

`2020-02-04`

- Feat
  - `Captcha` add prop `auto-send`, used to control whether the `send` event is automatically triggered when the captcha popup is first displayed
  - `ResultPage` props add dynamic change response

- Fix
  - Fix the issue of `Picker` and `DatePicker` that when scrolled multiple columns, the selected item was abnormal[#632](https://github.com/didi/mand-mobile/issues/632)
  - Fix the incorrect timing of the refreshActive event in `ScrollViewRefresh`[#642](https://github.com/didi/mand-mobile/issues/642)
  - Fix `Amount` displaying wrong numbers with thousands characters[#644](https://github.com/didi/mand-mobile/issues/644)
  - Fix the issue that the size calculation of `TextAreaItem` is incorrect when nesting in` Popup`
  - Fix the issue that auto-play would not work when sliding up and down in `Swiper`
  - Fix `Tip` incorrect placement in ScrollView

### 2.5.7

`2019-12-26`

- Feat
  - `Landscape` add prop `transition`, used to customize the display animation

- Fix
  - Fix the reflowing issue that `Tabs` may cause when switching tabs[#627](https://github.com/didi/mand-mobile/issues/627)
  - Fix the problem of scrolling accidentally when `NoticeBar` dynamically changed content[#628](https://github.com/didi/mand-mobile/issues/628)
  - Fix safe area white space compatible writing of `ActionBar`, `NumberKeyboard`

### 2.5.6

`2019-11-23`

- Fix
  - Fix `Stepper` has initial values, maximum and minimum values are the problem of not being able to enter numbers, and optimized boundary check logic[#614](https://github.com/didi/mand-mobile/issues/614)

### 2.5.5

`2019-11-08`

- Fix
  - Fix the problem of size exception caused by window size change when `TabBar` were used in `keep-alive`[#608](https://github.com/didi/mand-mobile/issues/608)
  - Fix `Skeleton` title exception shows when it is empty

### 2.5.4

`2019-11-02`

- Feat
  - `ScrollView` adds method`getOffsets`, used to get scroll distance

- Fix
  - Fix the problem that `Swiper` changes back to the first screen due to window size change[#596](https://github.com/didi/mand-mobile/issues/596)
  - Fix the problem of size exception caused by window size change when `Swiper` and `TabBar` were used in `keep-alive`[#599](https://github.com/didi/mand-mobile/issues/599)
  - Fix `TabBar` size calculation compatibility issue
  - Update the presentation logic of the `TextareaItem` empty button, only when the form value is not empty and focused[#589](https://github.com/didi/mand-mobile/issues/589)

### 2.5.3

`2019-10-11`

- Feat
  - `TextareaItem` add prop `clearable`[#589](https://github.com/didi/mand-mobile/issues/589)

- Fix
  - Fix the problem that `TabPicker` could not be dragged when the text was too long[#590](https://github.com/didi/mand-mobile/issues/590)
  - Remove some non-required reset styles[#586](https://github.com/didi/mand-mobile/issues/586)

### 2.5.2

`2019-09-20`

- Feat
  - `Picker` and `DatePicker` add prop `keep-index`, used to set the last stop position when the column data changes

- Fix
  - Fix the problem that `Toast` is covered by `Landscape`
  - Fix the problem of `TabBar` rendering crash[#567](https://github.com/didi/mand-mobile/issues/567)
  - Remove the useless style variables of `Textarea`

### 2.5.1

`2019-09-04`

- Feat
  - Add part of global [reset style](https://github.com/didi/mand-mobile/pull/539/files)
  - Add new component `Skeleton`
  - Add new component `TextareaItem`
  - Add new components `RadioGroup` and `RadioBox`
  - Add options `type `, `plain`, `round`, `inactive`, `loading`, `icon`, `iconSvg` to `ActionBar` and `ResultPage` button configration[#544](https://github.com/didi/mand-mobile/issues/544)
  - Add handlers `onShow` and `onHide` to singleton mode `Dialog`
  - `InputItem` add prop `preview-type`, used to set the type of pre-filled impression

  ```html
  <md-input-item
    type="bankCard" <!-- type when entering normally -->
    preview-type="text" <!-- type when pre-filling display -->
    title="银行卡号"
    value="6222 **** **** 1234"  <!-- pre-filled value with mask -->
  ></md-input-item>
  ```

- Fix
  - fix page flipping problem when sliding out of touch area in `Swiper`[#540](https://github.com/didi/mand-mobile/issues/540)
  - modify button background color setting property to `background` and the container element to `div`

### 2.4.2

`2019-08-13`

- Fix
  - fix style issues with `FieldItem` and `InputItem` headers and content alignment[#528](https://github.com/didi/mand-mobile/issues/528)
  - bolder font weight in android devices of `FieldItem` and `InputItem`

### 2.4.1

`2019-08-03`

- Fix
  - Fix the problem that `InputItem` cannot limit the max length of characters when using virtual keyboard input[#524](https://github.com/didi/mand-mobile/issues/524)
  - Fix `Amount` with the loss of precision in animation mode

### 2.4.0

`2019-07-29`

- Design
  - 🍭Financial design specification update, the title bar `border-radius` of `Popup` based components changed from `8px` to `40px` (Large-Radius pattern), `border-radius` of `Dialog` changed from `8px` to `12px`

  ![Design](https://pt-starimg.didistatic.com/static/starimg/img/FLXmXRBcDX1564369346467.jpg)

- Feature
  - `PopupTitleBar` adds following Props:
    - `large-radius` for supporting Large-Radius pattern
    - `only-close`, used to quickly set a single close button
    - `title-align`, used to set the position of title and description(left/right/center)
  - `Picker`, `DatePicker`, `TabPicker`, `Selector`, `Cashier` add Prop `large-radius` for supporting Large-Radius pattern
  - `Selector` adds Prop `hide-title-bar`, used to support hiding the title bar in no confirmation mode, and adds slots `header`，`footer`
  - `Button` adds Prop `loading`, used to set the loading status
  - `Dialog` Prop `btns` adds two status settings `disabled`/`loading`, and passing back the `btn` instance in `handler`[#500](https://github.com/didi/mand-mobile/issues/500)

    ```javascript
    export default {
      data () {
        return {
          btns: [{
            text: 'Search',
            handler: this.btnHandler
          }]
        }
      },
      methods: {
        btnHandler (btn) {
          this.$set(btn, 'loading', true)
          this.$set(btn, 'text', 'Searching')
        },
      }
    }
    ```

- Fix
  - fix `InputItem` and `Stepper` with default values will trigger the `change` event when the component is initialized[#495](https://github.com/didi/mand-mobile/issues/495)
  - `Amount` capital mode is compatible with negative numbers[#510](https://github.com/didi/mand-mobile/issues/510)

### 2.3.3

`2019-07-18`

- Fix
  - Fix compatibility issues when fixing `Toast` custom positions[#485](https://github.com/didi/mand-mobile/issues/485)
  - Fix `TabPicker` when setting `default-value`, `TabBar` can't automatically select the last item[#488](https://github.com/didi/mand-mobile/issues/488)
  - Fix `Selector` and `CheckList` click icons can't select current item[#491](https://github.com/didi/mand-mobile/issues/491)
  - Fix this problem `Popup` can't cover `NoticeBar`[#492](https://github.com/didi/mand-mobile/issues/492)
  - Fix partial `stylus` variable assignment error in `Stepper`

### 2.3.2

`2019-07-05`

- Fix
  - fix `Codebox` value could not be assigned when initializing
  - fix the problem that the `NumberKeyboard` keys may be clicked incorrectly[#477](https://github.com/didi/mand-mobile/issues/477)

### 2.3.1

`2019-06-22`

- Feature
  - `NumberKeyboard` adds property `isHideConfirm`, used to control whether the confirmation button click action automatically hides the keyboard[#474](https://github.com/didi/mand-mobile/issues/474)
  - `NumberKeyboard` add default slot

- Fix
  - fix 'Slider` progress bar width calculation error[#472](https://github.com/didi/mand-mobile/issues/472)
  - fix the problem that the `NumberKeyboard` keys may be clicked incorrectly[#477](https://github.com/didi/mand-mobile/issues/477)

### 2.3.0

`2019-06-13`

- Feature
  - `Check` and `CheckList` increase the icon size, location and other related configuration properties[#383](https://github.com/didi/mand-mobile/issues/383)
  - `CheckList` slot adds `index`, `selected` field

  ```html
    <template>
      <md-check-list :options="data">
        <template slot-scope="{ option, index, selected }">
          <!-- xxx -->
        </template>
      </md-check-list>
    </template>
  ```

  - `RadioList` slot adds `index`, `selected` fields, and does not display icons when `icon` is empty
  - `Selector` adds property `multi` to support multiple selections[#296](https://github.com/didi/mand-mobile/issues/296)
  - `Toast` adds the attribute `component`, which is used and customized in component form[#445](https://github.com/didi/mand-mobile/issues/445)
  - ScrollView` adds property `is-prevent` to support setting whether to prevent the default behavior when scrolling in non-scrollable areas[#454](https://github.com/didi/mand-mobile/issues/454)

- Fix
  - Fix autoplay invalidation when `Swiper` property isLoop is true[#452](https://github.com/didi/mand-mobile/issues/452)
  - Fix error caused by closing dialog, when `Dialog` property `maskClosable` is true[#471](https://github.com/didi/mand-mobile/issues/471)

### 2.2.4

`2019-05-26`

- Fix
  - Fix the problem that the first and last items of `TabBar` cannot be automatically repaired after they are selected[#434](https://github.com/didi/mand-mobile/issues/434)
  - Texts of `TabBar` items cannot be selected

### 2.2.3

`2019-05-25`

- Fix
  - Utility style `hairline` replaces `width` and `height` with `border`

### 2.2.2

`2019-05-11`

- Feature
  - `TabPicker`add event `select`[#436](https://github.com/didi/mand-mobile/issues/436)

- Fix
  - When the option in the tab list of each level of `TabPicker` is selected, the internal container is reset to the top
  - `RadioList` automatically clears the filled out text box when switching to a non-text option
  - `DatePicker` prop `custom-types` support `HH`[#433](https://github.com/didi/mand-mobile/issues/433)
  - Add `onCancel` to the type declaration of `Dialog`
  - Optimize some components documentation

### 2.2.1

`2019-04-22`

- Feature
  - `Stepper` add slots `unreached`、`icon`[#405](https://github.com/didi/mand-mobile/issues/405)
  - `InputItem` add prop `solid`, used to set the title with unfixed width[#411](https://github.com/didi/mand-mobile/issues/411)
  - `Ruler` add props `stepTextPosition`、`stepTextRender`

- Fix
  - Fix the exception thrown by `Picker` when setting a wrong `default-index`[#416](https://github.com/didi/mand-mobile/issues/416)
  - Optimize some component styles

### 2.2.0

`2019-04-13`

- Feature
  - New `Ruler` Component
  - `ScrollViewRefresh` add prop `rollerColor`, used to set the progress bar color of pull-down refreshing[#399](https://github.com/didi/mand-mobile/issues/399)
  - Optimize `WaterMark` component by using `canvas` to render watermark
  - `Stepper` add `increase`, `decrease` events

- Fix
  - `Swiper` incorrect index jumping with method `goto`[#366](https://github.com/didi/mand-mobile/issues/366)
  - `Progress` hide inner circle when value is `0`[#381](https://github.com/didi/mand-mobile/issues/381)

### 2.1.7

`2019-03-22`

- Fix
  - `InputItem` not update when slots change
  - `Codebox` bottom border not shown on some devices

### 2.1.6

`2019-03-15`

- Fix
  - `Swiper` not destroy properly[#338](https://github.com/didi/mand-mobile/issues/338)
  - `InputItem` support string type `virtual-keyboard-vm` prop[#355](https://github.com/didi/mand-mobile/issues/355)

### 2.1.4

`2019-03-08`

- Feature
  - Optimize `Swiper` gestures

- Fix
  - Some build bugs
  - `ScrollView` move out screen not trigger scroll end action
  - `Popup` synchronously operate problem[#341](https://github.com/didi/mand-mobile/issues/341)

### 2.1.2

`2019-02-25`

- Fix
  - Fix `ScrollView` is not able to trigger the problem when the content is not full.[#335](https://github.com/didi/mand-mobile/issues/335)
  - Fixed a problem with the line break when the `InputItem` title floated

### 2.1.1

`2019-02-23`

- Fix
  - Fix the problem that `postcss` is not in effect at build time, causing assets such as images in `mand-mobile.css` not to be processed by url inline。

### 2.1.0

`2019-02-22`

- Feature
  - `Seletor`: `defaultValue` prop remove type limits[#305](https://github.com/didi/mand-mobile/issues/305)
  - `ScrollView`: add `immediateCheckEndReaching` prop，in order to check reach bottom immediately and emit `endReached` event[#312](https://github.com/didi/mand-mobile/issues/312)
  - `Picker` and `DatePicker`: add `lineHeight` prop, which is used to customize option line height[#323](https://github.com/didi/mand-mobile/issues/323)
  - `ScrollView`: add `touchAngle` prop, in order to control scroll angle[#326](https://github.com/didi/mand-mobile/issues/326)
  - `Amount`: use system default font

- Fix
  - Update type declaration
  - `WaterMark`: fix can not click content area[#304](https://github.com/didi/mand-mobile/issues/304)
  - `Swiper`: fix when set `isLoop` as `false` and `transition` as `slideY`, can not scroll problem[#311](https://github.com/didi/mand-mobile/issues/311)
  - `TabPicker`: fix scroll and click bug[#319](https://github.com/didi/mand-mobile/issues/319)
  - `InputItem`: fix wrong cursor position[#322](https://github.com/didi/mand-mobile/issues/322)
  - `InputItem`: fix bug at `Vue 2.6+`[#324](https://github.com/didi/mand-mobile/issues/324)
  - Update docs

### 2.0.0

`2019-01-30`

- Feature
  - `DetailItem` increase supported types of `content`[#285](https://github.com/didi/mand-mobile/issues/285)
  - `Dialog` add default value `true` of `preventScroll`[#286](https://github.com/didi/mand-mobile/issues/286)
  - `Radio` increase supported types of `value`[#289](https://github.com/didi/mand-mobile/issues/289)
  - `Icon` font type increases without prefix class name[#295](https://github.com/didi/mand-mobile/issues/295)
  - `Check`，`CheckBox`increase supported types of `name` and `value`[#297](https://github.com/didi/mand-mobile/issues/297)
  - `InputItem` add prop `virtual-keyboard-vm`, used to support external custom financial keyboards
  - `Cashier` add scoped slot `footer` and `channels` add property `img`

- Fix
  - `InputItem` remove setting cursor for native type [#268](https://github.com/didi/mand-mobile/issues/268)
  - supplement `index.d.ts`
  - fix part of components style issues

### 2.0.0-rc.5

`2019-01-04`

- Feature
  - Add `PascalCase` name to global components[#261](https://github.com/didi/mand-mobile/issues/261)
  - `ScrollView` add prop `manual-init` and method `init`
  - `TabBar`, `Tabs` add prop `immediate`
  - `Swiper` add prop `transition-duration`

- Fix
  - fix part of components style issues

### 2.0.0-rc.4

`2018-12-21`

- Feature
  - Optimize `NumberKeyboard` input experience
  - `Cashier` adds slot `scene`
  - `Picker` adds prop `default-value`[#255](https://github.com/didi/mand-mobile/issues/255)

- Fix
  - Fix `Popup` continuous "show & hide" invalidation problem
  - Fix `Steps` style compatibility issues
  - Fix `InputItem` style problem, increase close button click area
  - `setError` of `Captcha` no longer clears codes

### 2.0.0-rc.3

`2018-12-14`

🎉🎉🎉 👏👏👏 Learn more in the<a href="#/en-US/docs/migration">Migration from 1.x</a>.

### 1.x

Visit [GitHub](https://github.com/didi/mand-mobile/blob/1.x/CHANGELOG.en-US.md) to read `1.x` change logs.

