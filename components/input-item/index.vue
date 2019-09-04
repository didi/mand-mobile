<template>
  <md-field-item
    class="md-input-item"
    :class="[
      isHighlight ? 'is-highlight' : '',
      isTitleLatent ? 'is-title-latent' : '',
      isInputActive ? 'is-active' : '',
      isInputFocus ? 'is-focus' : '',
      isInputError() ? 'is-error' : '',
      isInputBrief() && !isInputError() ? 'with-brief' : '',
      isDisabled ? 'is-disabled': '',
      isAmount ? 'is-amount': '',
      clearable ? 'is-clear' : '',
      align,
      size
    ]"
    :title="title"
    :solid="solid && !isTitleLatent"
  >
    <template slot="left">
      <slot name="left"></slot>
    </template>
    <!-- ------------ -->
    <!--    INPUT     -->
    <!-- ------------ -->
    <!-- Native Input -->
    <template v-if="!isVirtualKeyboard">
      <input
        class="md-input-item-input"
        :type="inputType"
        :name="name"
        v-model="inputBindValue"
        :placeholder="inputPlaceholder"
        :disabled="isDisabled"
        :readonly="readonly"
        :maxlength="isInputFormative ? '' : maxlength"
        autocomplete="off"
        @focus="$_onFocus"
        @blur="$_onBlur"
        @keyup="$_onKeyup"
        @keydown="$_onKeydown"
        @input="$_onInput"
      />
    </template>
    <!-- Fake Input -->
    <template v-else>
      <div
        class="md-input-item-fake"
        :class="{
          'is-focus': isInputFocus,
          'is-waiting': !isInputEditing,
          'disabled': isDisabled,
          'readonly': readonly
        }"
        @click="$_onFakeInputClick"
      >
        <span v-text="inputValue"></span>
        <span
          class="md-input-item-fake-placeholder"
          v-if="inputValue === '' && inputPlaceholder !== ''"
          v-text="inputPlaceholder"></span>
      </div>
    </template>

    <template slot="right">
      <!-- ------------ -->
      <!--  CLEART BTN  -->
      <!-- ------------ -->
      <div
        class="md-input-item-clear"
        v-if="clearable && !isDisabled && !readonly"
        v-show="!isInputEmpty && isInputFocus"
        @click="$_clearInput"
      >
        <md-icon name="clear"></md-icon>
      </div>

      <!-- ------------ -->
      <!--  RIGHT SLOT  -->
      <!-- ------------ -->
      <slot name="right"></slot>
    </template>

    <template slot="children">
      <!-- -------------------- -->
      <!-- BRIEF/ERROR TIP -->
      <!-- -------------------- -->
      <div
        v-if="isInputError()"
        class="md-input-item-msg"
      >
        <p v-if="error !== ''" v-text="error"></p>
        <slot name="error" v-else></slot>
      </div>
      <div
        v-if="isInputBrief() && !isInputError()"
        class="md-input-item-brief"
      >
        <p v-if="brief !== ''" v-text="brief"></p>
        <slot name="brief" v-else></slot>
      </div>
      <!-- ------------ -->
      <!--   KEYBORARD  -->
      <!-- ------------ -->
      <md-number-keyboard
        v-if="isVirtualKeyboard && !virtualKeyboardVm"
        ref="number-keyboard"
        :id="`${name}-number-keyboard`"
        class="md-input-item-number-keyboard"
        :ok-text="virtualKeyboardOkText"
        :disorder="virtualKeyboardDisorder"
      ></md-number-keyboard>
    </template>
  </md-field-item>
</template>

<script>import Icon from '../icon'
import FieldItem from '../field-item'
import NumberKeyboard from '../number-keyboard'
import {getCursorsPosition, setCursorsPosition} from './cursor'
import {noop, randomId, debounce} from '../_util'
import {formatValueByGapRule, formatValueByGapStep, trimValue} from '../_util/formate-value'

export default {
  name: 'md-input-item',

  components: {
    [Icon.name]: Icon,
    [FieldItem.name]: FieldItem,
    [NumberKeyboard.name]: NumberKeyboard,
  },

  inject: {
    rootField: {
      from: 'rootField',
      default: () => ({}),
    },
  },

  props: {
    type: {
      // text, bankCard, password, phone, money, digit
      type: String,
      default: 'text',
    },
    previewType: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default() {
        return randomId('input-item')
      },
    },
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: '',
    },
    size: {
      // large, normal
      type: String,
      default: 'normal',
    },
    align: {
      // left, center, right
      type: String,
      default: 'left',
    },
    error: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    solid: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    isVirtualKeyboard: {
      type: Boolean,
      default: false,
    },
    virtualKeyboardDisorder: {
      type: Boolean,
    },
    virtualKeyboardOkText: {
      type: String,
    },
    virtualKeyboardVm: {
      type: [Object, String],
      default: null,
    },
    isTitleLatent: {
      type: Boolean,
      default: false,
    },
    isFormative: {
      type: Boolean,
      default: false,
    },
    isHighlight: {
      type: Boolean,
      default: false,
    },
    isAmount: {
      type: Boolean,
      default: false,
    },
    formation: {
      type: Function,
      default: noop,
    },
  },

  data() {
    return {
      inputValue: '',
      inputBindValue: '',
      inputNumberKeyboard: '',
      isInputFocus: false,
      isInputEditing: false,
      isPreview: false,
    }
  },

  computed: {
    inputItemType() {
      return (this.isPreview ? this.previewType : this.type) || 'text'
    },
    inputType() {
      let inputType = this.inputItemType || 'text'
      if (inputType === 'bankCard' || inputType === 'phone' || inputType === 'digit') {
        inputType = 'tel'
      } else if (inputType === 'money') {
        inputType = 'text'
      }
      return inputType
    },
    inputMaxLength() {
      if (this.inputItemType === 'phone') {
        return 11
      } else {
        return this.maxlength
      }
    },
    inputPlaceholder() {
      return this.isTitleLatent && this.isInputActive ? '' : this.placeholder
    },
    isInputActive() {
      return !this.isInputEmpty || this.isInputFocus
    },
    isInputEmpty() {
      return !this.inputValue.length
    },
    isInputFormative() {
      const type = this.inputItemType
      return this.isFormative || (type === 'bankCard' || type === 'phone' || type === 'money' || type === 'digit')
    },
    isDisabled() {
      return this.rootField.disabled || this.disabled
    },
  },

  watch: {
    value(val) {
      // Filter out two-way binding
      if (val !== this.$_trimValue(this.inputValue)) {
        this.inputValue = this.$_formateValue(this.$_subValue(val + '')).value
      }
    },
    previewType: {
      handler(val) {
        this.isPreview = !!val
      },
      immediate: true,
    },
    inputValue(val) {
      this.inputBindValue = val
      val = this.isInputFormative ? this.$_trimValue(val) : val
      if (val !== this.value) {
        this.$emit('input', val)
        this.$emit('change', this.name, val)
      }
    },
    isInputFocus(val) {
      if (!this.isVirtualKeyboard || !this.inputNumberKeyboard) {
        return
      }
      if (val) {
        this.inputNumberKeyboard.show()
        this.$emit('focus', this.name)
      } else {
        this.inputNumberKeyboard.hide()
        this.$emit('blur', this.name)
      }
    },
  },
  created() {
    this.inputValue = this.$_formateValue(this.$_subValue(this.value + '')).value
  },
  mounted() {
    this.isVirtualKeyboard &&
      this.$nextTick(() => {
        this.$_initNumberKeyBoard()
      })
  },
  beforeDestroy() {
    const keyboard = this.inputNumberKeyboard
    if (keyboard && keyboard.$el) {
      document.body.removeChild(keyboard.$el)
    }
  },

  methods: {
    // MARK: private methods
    $_formateValue(curValue, curPos = 0) {
      const type = this.inputItemType
      const name = this.name
      const oldValue = this.inputValue
      const isAdd = oldValue.length > curValue.length ? -1 : 1

      let formateValue = {value: curValue, range: curPos}

      // no format
      if (!this.isInputFormative || curValue === '') {
        return formateValue
      }

      // custom format by user
      const customValue = this.formation(name, curValue, curPos)

      if (customValue) {
        return customValue
      }

      // default format by component
      let gap = ' '
      switch (type) {
        case 'bankCard':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue = formatValueByGapStep(4, curValue, gap, 'left', curPos, isAdd, oldValue)
          break
        case 'phone':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue = formatValueByGapRule('3|4|4', curValue, gap, curPos, isAdd)
          break
        case 'money':
          gap = ','
          curValue = this.$_subValue(trimValue(curValue.replace(/[^\d.]/g, '')))
          // curValue = curValue.replace(/\D/g, '')
          const dotPos = curValue.indexOf('.')
          // format if no dot or new add dot or insert befor dot
          const moneyCurValue = curValue.split('.')[0]
          const moneyCurDecimal = ~dotPos ? `.${curValue.split('.')[1]}` : ''

          formateValue = formatValueByGapStep(
            3,
            trimValue(moneyCurValue, gap),
            gap,
            'right',
            curPos,
            isAdd,
            oldValue.split('.')[0],
          )
          formateValue.value += moneyCurDecimal
          break
        case 'digit':
          curValue = this.$_subValue(trimValue(curValue.replace(/\D/g, '')))
          formateValue.value = curValue
          break
        /* istanbul ignore next */
        default:
          break
      }

      return formateValue
    },
    isInputError() {
      return this.$slots.error || this.error !== ''
    },
    isInputBrief() {
      return this.$slots.brief || this.brief !== ''
    },
    $_trimValue(val) {
      return trimValue(val, '\\s|,')
    },
    $_subValue(val) {
      const len = this.inputMaxLength
      if (len !== '') {
        return val.substring(0, len)
      } else {
        return val
      }
    },
    $_startEditInput() {
      this.isInputEditing = true
      this.$_stopEditInput()
    },
    $_stopEditInput: debounce(function() {
      this.isInputEditing = false
    }, 500),
    $_clearInput() {
      this.inputValue = ''
      !this.isTitleLatent && this.focus()
      this.isPreview = false
    },
    $_stopPreview() {
      this.$_clearInput()
      this.$emit('update:previewType', '')
    },
    $_focusFakeInput() {
      this.isInputFocus = true

      setTimeout(() => {
        this.$_addBlurListener()
      }, 0)
    },
    $_blurFakeInput() {
      this.isInputFocus = false
      this.$_removeBlurListener()
    },
    $_addBlurListener() {
      document.addEventListener('click', this.$_blurFakeInput, false)
    },
    $_removeBlurListener() {
      document.removeEventListener('click', this.$_blurFakeInput, false)
    },
    $_initNumberKeyBoard() {
      let keyboard =
        (typeof this.virtualKeyboardVm === 'object'
          ? this.virtualKeyboardVm
          : this.$vnode.context.$refs[this.virtualKeyboardVm]) || this.$refs['number-keyboard']

      if (Array.isArray(keyboard)) {
        keyboard = keyboard[0]
      }

      keyboard.$on('enter', this.$_onNumberKeyBoardEnter)
      keyboard.$on('delete', this.$_onNumberKeyBoardDelete)
      keyboard.$on('confirm', this.$_onNumberKeyBoardConfirm)
      this.inputNumberKeyboard = keyboard
      document.body.appendChild(keyboard.$el)
    },

    // MARK: events handler
    $_onInput(event) {
      const formateValue = this.$_formateValue(
        event.target.value,
        this.isInputFormative ? getCursorsPosition(event.target) : 0,
      )

      this.inputValue = formateValue.value
      this.inputBindValue = formateValue.value

      if (this.isInputFormative) {
        this.$nextTick(() => {
          setCursorsPosition(event.target, formateValue.range)
        })
      }
    },
    $_onKeyup(event) {
      this.$emit('keyup', this.name, event)
      if (+event.keyCode === 13 || +event.keyCode === 108) {
        this.$emit('confirm', this.name, this.inputValue)
      }
    },
    $_onKeydown(event) {
      this.$emit('keydown', this.name, event)
      if (!(+event.keyCode === 13 || +event.keyCode === 108)) {
        this.$_startEditInput()
        this.isPreview && this.$_stopPreview()
      }
    },
    $_onFocus() {
      this.isInputFocus = true
      this.$emit('focus', this.name)
    },
    $_onBlur() {
      setTimeout(() => {
        this.isInputFocus = false
        this.$emit('blur', this.name)
      }, 100)
    },
    $_onFakeInputClick(event) {
      if (this.isDisabled || this.readonly) {
        return
      }

      this.$_blurFakeInput()

      if (!this.isInputFocus) {
        this.$_focusFakeInput(event)
      }
    },
    $_onNumberKeyBoardEnter(val) {
      if (this.isPreview) {
        this.$_stopPreview()
      }
      if (this.inputMaxLength > 0 && this.$_trimValue(this.inputValue).length >= this.inputMaxLength) {
        return
      }
      this.inputValue = this.$_formateValue(this.inputValue + val).value
      this.$_startEditInput()
    },
    $_onNumberKeyBoardDelete() {
      const inputValue = this.inputValue
      if (inputValue === '') {
        return
      }
      this.inputValue = this.$_formateValue(inputValue.substring(0, inputValue.length - 1)).value
      this.$_startEditInput()
      if (this.isPreview) {
        this.$_stopPreview()
      }
    },
    $_onNumberKeyBoardConfirm() {
      this.$emit('confirm', this.name, this.inputValue)
    },

    // MARK: public methods
    focus() {
      if (this.isVirtualKeyboard) {
        this.$_onFakeInputClick()
      } else {
        this.$el.querySelector('.md-input-item-input').focus()
        setTimeout(() => {
          this.isInputFocus = true
        }, 200)
      }
    },
    blur() {
      if (this.isVirtualKeyboard) {
        this.$_blurFakeInput()
      } else {
        this.$el.querySelector('.md-input-item-input').blur()
        this.isInputFocus = false
      }
    },
    getValue() {
      return this.inputValue
    },
  },
}
</script>

<style lang="stylus">
.md-input-item
  .md-field-item-content
    padding-top 0
    padding-bottom 0
  .md-field-item-control
    display flex
    align-items center

.md-input-item-clear
  padding 10px 0
  color input-item-icon
  .md-icon
    display flex
    background color-bg-base
    border-radius radius-circle

.md-input-item-input,
.md-input-item-fake
  // display flex
  width 100%
  height input-item-height
  color input-item-color
  font-size input-item-font-size
  font-weight input-item-font-weight
  font-family font-family-normal
  line-height 1
  -webkit-appearance none
  border none
  background transparent
  outline none
  box-sizing border-box
  -webkit-tap-highlight-color transparent
  appearance none

.md-input-item-input
  &:disabled, &[disabled]
    opacity 1
  &::-webkit-input-placeholder
    color input-item-placeholder
    font-weight font-weight-normal
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
    -webkit-appearance none

.md-input-item-fake
  line-height input-item-height
  word-ellipsis()
  cursor text
  &::after
    position relative
    z-index 2
    display none
    content " "
    height input-item-font-size-large
    border-right solid 1.5px color-text-base
  &.is-focus:after
    display inline
  &.is-waiting:after
    animation keyboard-cursor infinite 1s step-start

.md-input-item-fake-placeholder
  position absolute
  top 0
  left 0
  width 100%
  color input-item-placeholder
  font-weight font-weight-normal

.md-input-item-msg,
.md-input-item-brief
  word-break()
  &:not(:last-child)
    margin-bottom 10px

.md-input-item-brief
  font-size input-item-font-size-brief
  color input-item-color-brief

.md-input-item-msg
  font-size input-item-font-size-error
  color input-item-color-error

.md-input-item
  &.left
    .md-input-item-input,
    .md-input-item-fake
      text-align left

  &.center
    .md-input-item-input,
    .md-input-item-fake
      text-align center

  &.right
    .md-input-item-input,
    .md-input-item-fake
      text-align right

  &.is-title-latent
    .md-field-item-title
      position absolute
      top 50%
      left 0
      height auto
      font-size input-item-title-latent-font-size
      color input-item-title-latent-color
      transform translate3d(0, -50%, 0)
      transition all .3s ease
      opacity 0
      will-change auto
    .md-field-item-content
      min-height 115px
    .md-field-item-content,
    .md-field-item-left,
    .md-field-item-right,
    .md-input-item-input,
    .md-input-item-fake
      padding-top 20px
    &.is-active
      .md-field-item-title
        opacity 1
        top 20px
        transform translate3d(0, 0, 0)

  &.is-highlight
    &.is-focus
      .md-field-item-content
        hairline(bottom, input-item-color-highlight, 0, 4px)

  &.is-disabled
    .md-input-item-input,
    .md-input-item-fake,
    .md-input-item-fake-placeholder
      -webkit-text-fill-color input-item-color-disabled
      color input-item-color-disabled

  &.is-amount
    .md-input-item-input,
    .md-input-item-fake
      font-family font-family-number
    &.large
      .md-input-item-input,
      .md-input-item-fake
        padding-top v-gap-xs

  &.large
    .md-input-item-input,
    .md-input-item-fake
      padding-bottom 15px
      font-size input-item-font-size-large
    .md-input-item-input::-webkit-input-placeholder
        font-size 60px
        line-height 100px

  &.is-error
    .md-field-item-content
      hairline(bottom, input-item-color-error, 0, 4px)

  &.is-ios
    .md-input-item-input::-webkit-input-placeholder
      position relative
      top 3px
      overflow visible
    .md-input-item-fake::after
      border-right solid 6px #2C6CF5
      border-radius 2px
  &.is-android
    .md-input-item-fake::after
      border-right solid 4px color-text-base
    .md-input-item-input,
    .md-input-item-fake
      font-weight input-item-font-weight-android

@-webkit-keyframes keyboard-cursor
  0%
    opacity 1
  50%
    opacity 0
  to
    opacity 1
@keyframes keyboard-cursor
  0%
    opacity 1
  50%
    opacity 0
  to
    opacity 1
</style>
