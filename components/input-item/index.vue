<template>
  <div
    class="md-input-item"
    :class="[
      isHighlight ? 'is-highlight' : '',
      isTitleLatent ? 'is-title-latent' : '',
      isInputActive ? 'active' : '',
      isInputFocus ? 'focus' : '',
      isInputError ? 'error' : '',
      clearable ? 'is-clear' : '',
      inputEnv,
      align,
      size
    ]">
    <div class="md-input-item-container">
      <!-- ------------ -->
      <!--   LEFT SLOT  -->
      <!-- ------------ -->
      <div class="md-input-item-extra" v-if="$slots.left">
        <slot name="left"></slot>
      </div>

      <!-- ------------ -->
      <!--     TITLE    -->
      <!-- ------------ -->
      <div
        v-if="title !== ''"
        class="md-input-item-title"
        :class="{
          fixed: !isTitleLatent
        }"
        v-html="title"
      ></div>

      <!-- ------------ -->
      <!--   CONTROL    -->
      <!-- ------------ -->
      <div class="md-input-item-control">
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
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="isFormative ? '' : maxlength"
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
              'focus': isInputFocus,
              'disabled': disabled,
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

        <!-- -------------------- -->
        <!-- ERROR TIP FOR NORMAL -->
        <!-- -------------------- -->
        <div
          v-if="!isTitleLatent && error !== ''"
          class="md-input-item-msg"
          v-text="error"
        ></div>

        <!-- ------------ -->
        <!--  CLEART BTN  -->
        <!-- ------------ -->
        <div
          class="md-input-item-clear"
          v-if="clearable && !disabled && !readonly"
          v-show="!isInputEmpty"
          @click="$_clearInput($event)"
        >
          <md-icon name="circle-cross"></md-icon>
        </div>

        <!-- ------------ -->
        <!--  RIGHT SLOT  -->
        <!-- ------------ -->
        <div
          class="md-input-item-right"
          v-if="$slots.right"
        >
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <!-- -------------------- -->
    <!-- ERROR TIP FOR LATENT -->
    <!-- -------------------- -->
    <div
      v-if="isTitleLatent && error !== ''"
      class="md-input-item-msg"
      v-text="error"
    ></div>
    <!-- ------------ -->
    <!--   KEYBORARD  -->
    <!-- ------------ -->
    <md-number-keyboard
      v-if="isVirtualKeyboard"
      ref="number-keyboard"
      :id="`${name}-number-keyboard`"
      class="md-input-item-number-keyboard"
      :ok-text="virtualKeyboardOkText"
      :disorder="virtualKeyboardDisorder"
      @enter="$_onNumberKeyBoardEnter"
      @delete="$_onNumberKeyBoardDelete"
      @confirm="$_onNumberKeyBoardConfirm"
    ></md-number-keyboard>
  </div>
</template>

<script>import Icon from '../icon'
import NumberKeyboard from '../number-keyboard'
import {getCursorsPosition, setCursorsPosition} from './cursor'
import {noop, isIOS, isAndroid, randomId} from '../_util'
import {formatValueByGapRule, formatValueByGapStep, trimValue} from '../_util/formate-value'

export default {
  name: 'md-input-item',

  components: {
    [Icon.name]: Icon,
    [NumberKeyboard.name]: NumberKeyboard,
  },

  props: {
    type: {
      // text, bankCard, password, phone, money, digit
      type: String,
      default: 'text',
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
    isTitleLatent: {
      type: Boolean,
      default: false,
    },
    isFormative: {
      type: Boolean,
      default() {
        const type = this.type
        return type === 'bankCard' || type === 'phone' || type === 'money' || type === 'digit'
      },
    },
    isHighlight: {
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
    }
  },

  computed: {
    inputEnv() {
      /* istanbul ignore next */
      if (isIOS) {
        return 'is-ios'
      } else if (isAndroid) {
        return 'is-android'
      } else {
        return 'is-browser'
      }
    },
    inputType() {
      let inputType = this.type || 'text'
      if (inputType === 'bankCard' || inputType === 'phone' || inputType === 'digit') {
        inputType = 'tel'
      }
      return inputType
    },
    inputMaxLength() {
      if (this.type === 'phone') {
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
    isInputError() {
      return !!this.error
    },
  },

  watch: {
    value(val) {
      this.inputValue = this.$_formateValue(this.$_subValue(val + '')).value
    },
    inputValue(val) {
      this.inputBindValue = val
      val = this.isFormative ? this.$_trimValue(val) : val
      this.$emit('input', val)
      this.$emit('change', this.name, val)
    },
    isInputFocus(val) {
      if (!this.isVirtualKeyboard) {
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
    this.isVirtualKeyboard && this.$_initNumberKeyBoard()
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
      const type = this.type
      const name = this.name
      const oldValue = this.inputValue
      const isAdd = oldValue.length > curValue.length ? -1 : 1

      let formateValue = {value: curValue, range: curPos}

      // no format
      if (!this.isFormative || curValue === '') {
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
        default:
          break
      }

      return formateValue
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
    $_clearInput() {
      event.stopImmediatePropagation()
      this.inputValue = ''
    },
    $_focusFakeInput() {
      this.isInputFocus = true

      this.$nextTick(() => {
        this.$_addBlurListener()
      })
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
      const keyboard = this.$refs['number-keyboard']
      this.inputNumberKeyboard = keyboard
      document.body.appendChild(keyboard.$el)
    },

    // MARK: events handler
    $_onInput(event) {
      const formateValue = this.$_formateValue(event.target.value, getCursorsPosition(event.target))

      this.inputValue = formateValue.value
      this.inputBindValue = formateValue.value

      if (this.isFormative) {
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
    },
    $_onFocus() {
      this.isInputFocus = true
      this.$emit('focus', this.name)
    },
    $_onBlur() {
      this.isInputFocus = false
      this.$emit('blur', this.name)
    },
    $_onFakeInputClick(event) {
      if (this.disabled || this.readonly) {
        return
      }

      this.$_blurFakeInput()

      if (!this.isInputFocus) {
        this.$_focusFakeInput(event)
      }
    },
    $_onNumberKeyBoardEnter(val) {
      this.inputValue = this.$_formateValue(this.inputValue + val).value
    },
    $_onNumberKeyBoardDelete() {
      const inputValue = this.inputValue
      if (inputValue === '') {
        return
      }
      this.inputValue = this.$_formateValue(inputValue.substring(0, inputValue.length - 1)).value
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
      }
    },
    blur() {
      if (this.isVirtualKeyboard) {
        this.$_blurFakeInput()
      } else {
        this.$el.querySelector('.md-input-item-input').blur()
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
  display flex
  flex 1
  align-self stretch
  position relative
  min-height input-item-height
  box-sizing border-box
  clearfix()
  .md-input-item-container
    display flex
    flex 1
  .md-input-item-extra, .md-input-item-title
    display flex
    position relative
    height input-item-height
    align-items center
    margin-right input-item-title-gap
    font-size field-title-font-size
    color field-title-color
    word-break()
    &.fixed
      width input-item-title-width
  .md-input-item-control
    position relative
    display flex
    flex-direction column
    flex 1
    min-height input-item-height
    .md-input-item-clear, .md-input-item-right
      position absolute
      z-index 2
      top 0
      right 0
      width 50px
      height input-item-height
      display flex
      align-items center
      justify-content center
    .md-input-item-clear
      color input-item-icon
      z-index 3
      .md-icon
        background color-bg-base
        border-radius radius-circle
    .md-input-item-input, .md-input-item-fake
      // display flex
      width 100%
      height input-item-height
      color input-item-color
      font-size input-item-font-size
      font-weight input-item-font-weight
      -webkit-appearance none
      border none
      background transparent
      outline none
      box-sizing border-box
      -webkit-tap-highlight-color transparent
      appearance none

    .md-input-item-input
      &:disabled, &[disabled]
        opacity input-item-color-disabled
      &::-webkit-input-placeholder
        color input-item-placeholder
      &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
        -webkit-appearance none
  &.left
    .md-input-item-input, .md-input-item-fake
      text-align left
  &.center
    .md-input-item-input, .md-input-item-fake
      text-align center
  &.right
    .md-input-item-input, .md-input-item-fake
      text-align right
  &.is-clear .md-input-item-control
    padding-right 50px !important
  &.is-title-latent
    position relative
    padding-top 10px
    // overflow hidden
    .md-input-item-title
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
    .md-input-item-extra, .md-input-item-control
      top 15px
    .md-input-item-msg
      position absolute
      left 0
      bottom 0
      top auto !important
      margin 0
    &.active
      .md-input-item-title
        opacity 1
        top 10px
        transform translate3d(0, 0, 0)
      // .md-input-item-input::-webkit-input-placeholder, .md-input-item-fake-placeholder
      //   color transparent
    &.error
      padding-bottom 40px
  &.is-highlight
    .md-input-item-input::-webkit-input-placeholder, .md-input-item-fake-placeholder
      color input-item-placeholder-highlight
  &.large .md-input-item-input
    font-size input-item-font-size-large
  &.error
    .md-input-item-title
      color input-item-color-error

  .md-input-item-fake
    line-height input-item-height
    word-ellipsis()
    cursor text
    &:after
      position relative
      z-index 2
      display none
      content ""
      height input-item-font-size
      border-right solid 1.5px color-text-base
      animation keyboard-cursor infinite 1s step-start
    &.focus:after
      display inline
    &.disabled
      opacity input-item-color-disabled
    .md-input-item-fake-placeholder
      position absolute
      top 0
      left 0
      width 100%
      color input-item-placeholder

  .md-input-item-msg
    position relative
    top -10px
    float left
    width 100%
    margin-bottom 10px
    font-size input-item-font-size-error
    color input-item-color-error
    word-break()

  &.is-ios .md-input-item-fake:after
    border-right solid 6px #2C6CF5
    border-radius 2px
  &.is-android .md-input-item-fake:after
    border-right solid 4px color-text-base

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
