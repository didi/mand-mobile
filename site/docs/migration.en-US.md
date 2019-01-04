---
title: Migration from 1.x
---

### Major Changes

* A new<a href="#/en-US/design">financial visual specification</a>, the component design is more beautiful and the brand color is changed from `#FC9153` to `#2F86F6`.
* Support server rendering
* New component<a href="#/en-US/docs/components/basic/cell-item">CellItem</a>, used to carry functions such as function entry, function operation, information display, etc.
* New component<a href="#/en-US/docs/components/basic/detail-item">DetailItem</a>, used to display some list information.
* New component<a href="#/en-US/docs/components/business/bill">Bill</a>, used to display electronic bills or notes.
* New component<a href="#/en-US/docs/components/basic/progress">Progress</a>, used for progress visualization.
* New component<a href="#/en-US/docs/components/form/slider">Slider</a>.
* New component<a href="#/en-US/docs/components/feedback/transition">Transition</a>, encapsulate and reuse the animation used in the component library.
* New component<a href="#/en-US/docs/components/business/water-mark">WaterMask</a>, as a container with a watermark background.
* 54 new<a href="#/en-US/docs/components/basic/icon">Icons</a>.

### Component Changes

#### Button

- Breaking Changes
	- ⚠️ Prop `type` optional values remove `ghost`, `ghost-primary`.
	- ⚠️ Prop `disabled` is removed.
	
- Features and Improvements
	- 🔅 Prop `type` optional values add `default`, `warning `, `disabled`.
	- 🔅 New Prop `native-type`, used to change the native tag and default value is `button`.
	- 🔅 New Prop `plain`, used to display hollow style buttons and default value is `false`.
	- 🔅 New Prop `round`, used to display rounded buttons and default value is `false`.
	- 🔅 New Prop `inline`, used to display inline buttons and default value is `false`.
	- 🔅 New Prop `icon-svg`, used for buttons using SVG type icons and default value is `false`.
	- 🔅 New Prop `inactive`, used to show the button is not activated and default value is `false`.

#### Captcha

- Features and Improvements
	- 🔅 New method `resetcount`, used to reset the time counter

#### Cashier

- Features and Improvements
	- 🔅 Prop `channels` elements add fields `iconSvg`, `action`, which can be used to use SVG type icons and add special actions for payment channels, such as "replace bank card".
	- 🔅 New Prop `pay-button-disabled`, sed to disable the payment button.
	- 🔅 Scene `captcha` configuration add `brief `, used to send a brief description of the verification code.
	- 🔅 New scoped slot `header`, used to customize head content of all scenes.
	
	```html
		<div slot-scope="{ scene }" slot="header">
		  <md-notice-bar
		    v-if="scene === 'choose'"
		    mode="closable"
		    icon="warn"
		    type="warning"
		  ></md-notice-bar>
		</div>
	```
	- 🔅 New slot `channel`, used to add special payment channels.
	- 🔅 New slot `payButton`, used to customize payment button content.

#### Check

- Breaking Changes
	- ⚠️ Split into `Check`, `CheckBox`, `CheckGroup`, `CheckList`.
	
#### DatePicker

- Breaking Changes
	- ⚠️ 12-hour system is no longer supported, and `half-day-text` and `is-twelve-hours` are removed (used to control 'min-date` and `max-date` to control "Hour & Minute").
	
- Features and Improvements
	- 🔅 New prop `describe`, used to set the selector description

#### Dialog

- Features and Improvements
  - 🔅 New prop `icon-svg`, used to use SVG type icons and default value is `false`.
  - 🔅 New prop `layout `, used to set the button arrangement and default value is `row`.

#### Field

- Features and Improvements
	- 🔅 New prop `brief`, used to set the subtitle description.
	- 🔅 New prop `plain`, used to set the hollow style.
	- 🔅 New prop `disabled`, used to disable the area.
	- 🔅 New slots `header`, `action`, `footer`.

#### FieldItem

- Breaking Changes
	- ⚠️ Prop `customized` is removed.
	- ⚠️ Prop `align` is removed.
	- ⚠️ Prop `value` is removed.

- Features and Improvements
	- 🔅 New prop `addon`, used to display additional content.
	- 🔅 New slot `children`.

	
#### Icon

- Breaking Changes
	- ⚠️ "IconFont" is used by default. To use the SVG type icon, set `svg` to `true`.
	- ⚠️ The built-in SVG type icon of 1.x is removed except for `spinner` (the SVG type in the built-in icon only contains icons with fixed colors, others use "IconFont").

- Features and Improvements
	- 🔅 Added 54 built-in font icons
	- 🔅 New prop `svg`, used to use SVG type icons and default value is `false`.
	- 🔅 SVG type icon added `success-color`, `warn-color`.

#### InputItem

- Breaking Changes
	- ⚠️ Prop `is-highlight`, used to highlight the bottom border when the input is focused

- Features and Improvements
	- 🔅 New prop `brief`, used to set the subtitle description.
	- 🔅 New slots `brief`，`error`.

#### Landscape

- Breaking Changes

  - ⚠️ Prop `scroll` is removed.

- Features and Improvements
  - 🔅 New prop `full-screen`, for full screen display and default value is `false`.
  - 🔅 New events `show`、`hide`.

#### NoticeBar

- Features and Improvements
	- 🔅 New prop `mode`, used to set the notification bar mode.
	- 🔅 New prop `type`, used to set the notification bar theme, optional `default` (blue), `activity` (yellow), `warning` (red) and default value is `default`.
	- 🔅 New prop `round`, used for notification bar fillet display and default value is `false`.
	- 🔅 New prop `multi-rows`, used for multi-line display in the notification bar and default value is `false`.
	- 🔅 New prop `scrollable`, used for scrolling the notification bar and default value is `false`.
	- 🔅 New prop `icon-svg`, used to use SVG type icons and default value is `false`.
	- 🔅 New slots `left`、`right`, used to customize the content on the left and right sides.
	- 🔅 New event `close`, triggered when the notification bar is closed.

#### NumberKeyboard

- Features and Improvements
  - 🔅 New prop `text-render`, used to customize the value of the specified button.

#### Popup

- Breaking Changes
	- ⚠️ Props `prevent-scroll`、`prevent-scroll-exclude` are not recommended for use, use the component `ScrollView`.

- Features and Improvements
	- 🔅 Prop `transition` optional values increase to `fade/fade-bounce/fade-slide/fade-zoom, slide-up/slide-down/slide-left/slide-right`.
	- 🔅 Child component `PopupTitleBar` add new prop `describe`, used to set the selector description.

#### Radio

- Breaking Changes
	- ⚠️ Split into `Radio` and `RadioList`
	
- Features and Improvements
	- 🔅 New prop `icon-disabled`, used to set the disable item icon and default value is `check-disabled`.
	- 🔅 New prop `icon-svg`, used to use SVG type icons and default value is `false`.

#### ScrollView

- Features and Improvements
	- 🔅 New prop `manual-init`, used to set the manual initialization scroll area.
	- 🔅 New method `init`, used to manually initialize the scroll area.

#### Selector

- Features and Improvements
	- 🔅 New prop `describe`, used to set the selector description.
	- 🔅 New prop `min-height`, used to set the selector minimum height.


#### Steps

- Features and Improvements
	- 🔅 New prop `direction`, used to set the step bar display direction and default value is `horizontal`.
	- 🔅 New prop `transition`, used for progress change effects.

#### Swiper
- Features and Improvements
	- 🔅 New prop `transition-duration`
  
#### TabBar

- Breaking Changes
	- ⚠️ Prop `titles` change to `items`.
	- ⚠️ Prop `show-ink-bar` change to `has-ink`.
	- ⚠️ Prop `ink-bar-length` change to `ink-length`.
	- ⚠️ Prop `ink-bar-animate` is removed.
	- ⚠️ Prop `default-index` change to `v-model`.
	- ⚠️ Method `selectTab` is removed, use `v-model` instead.
	- ⚠️ Event `indexChanged(index, prevIndex)` change to `change(item, index, prevIndex)`.

- Features and Improvements
	- 🔅 New prop `v-model`, used to identify the label object `name`.
	- 🔅 New method `reflow`, used to recalculate style layouts.
	- 🔅 New scoped slot `item`, used to customize tab content:
	
	```html
	<md-tabbar>
    <template slot="item" slot-scope="{ item, currentName, index, items }">
    <!-- content -->
    </template>
	</md-tabbar>
	```
	
#### TabPicker

- Breaking Changes
  - ⚠️ Prop `data-struct` is removed.
  - ⚠️ Prop `default-index` is removed.
  - ⚠️ Prop `option-render` is removed.
  - ⚠️ Prop `async-func` is removed.
  - ⚠️ Prop `ok-text` is removed.
  - ⚠️ Prop `cancel-text` is removed.
  - ⚠️ Prop `errorLabel` is removed.
  - ⚠️ Prop `loadingLabel` is removed.
  - ⚠️ Prop `data` internal structure change.
  - ⚠️ Method `getSelectedItem` is removed.
  - ⚠️ Event `change` returned data format changes.
  - ⚠️ Event `confirm` is removed.

- Features and Improvements	
  - 🔅 New prop `default-value`.
  - 🔅 New prop `describe`, used to set the picker description.
  - 🔅 New method `getSelectedValues`, used to get the values selected by all panels.
  - 🔅 New method `getSelectedOptions`, used to get all selected objects of all panels.

- Cascading data source data format

```javascript
{
  // Unique key name
  name: '',
  // Panel label
  label: '',
  // Option list
  options: [
    {
      // Option value
      value: "",
      // Option label
      label: "",
      // Cascading subpanel
      children: {
        name: '',
        label: '',
        options: [
          // ...
        ]
      }
    }
  ]
}
```

#### Tabs

- Breaking Changes
	- ⚠️ Split into `Tabs`和`TabPane`:

	```html
	<md-tabs>
    <md-tab-pane class="content" name="p1" label="第一章">
      她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
    </md-tab-pane>
    <md-tab-pane class="content" name="p2" label="第二章">
      又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
    </md-tab-pane>
    <md-tab-pane class="content" name="p3" label="第三章" disabled>
      你的腿？她有些诧异。腿？我的腿怎么了？他更诧异。后来，她才知道他的腿，那天只是坐麻了而已。
    </md-tab-pane>
  </md-tabs>
  ```
  
   - ⚠️ Remove all original props of `Tabs`.
   - ⚠️ Method `selectTab` is removed, use `v-model` instead.
   - ⚠️ Event `change(index, prevIndex)` change to `change(tab)`.

- Features and Improvements
	- 🔅 New prop `v-model`, used to identify the label object `name`.
	- 🔅 New prop `immediate`, used to trigger a `change` event immediately after initialization`.
	- 🔅 New child component `TabPane`.
	
#### Tag

- Features and Improvements
	- 🔅 Prop `shape` optional values add `quarter`, `coupon`.

#### Tip

- Features and Improvements
	- 🔅 New prop `name`. used for special class names.
	- 🔅 New prop `icon`、`icon-svg`, used to add the left icon.
	- 🔅 New prop `fill`, used to control the prompt bar to fill the child elements.
	- 🔅 New prop `offset`, used to set tip offset.

#### Toast

- Features and Improvements
	- 🔅 New prop `icon-svg`, used for buttons using SVG type icons and default value is `false`.



