<template>
  <md-field-item
    class="md-textarea-item"
    :class="[
      isDisabled ? 'is-disabled' : '',
      errorInfo ? 'is-error' : ''
    ]"
    :title="title"
    :solid="solid"
  >
    <textarea
      class="md-textarea-item__textarea"
      ref="textarea"
      v-model="inputValue"
      :disabled="isDisabled"
      :readonly="readonly"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :rows="rows"
      @input="$_onInput"
      @focus="$_onFocus"
      @blur="$_onBlur"
      @keyup="$_onKeyup"
      @keydown="$_onKeydown"
      @compositionstart="$_onCompositionstart"
      @compositionend="$_onCompositionend"
    ></textarea>
    <slot name="footer"></slot>
    <template slot="right">
      <div
        class="md-textarea-item__clear"
        v-if="clearable && !isDisabled && !readonly"
        v-show="!isInputEmpty && isInputFocus"
        @click="$_clearInput"
      >
        <md-icon name="clear"></md-icon>
      </div>
      <slot name="right"></slot>
    </template>
    <template slot="children">
      <div v-if="errorInfo" class="md-textarea-item-msg">
        <p>{{ errorInfo }}</p>
      </div>
    </template>
  </md-field-item>
</template>
<script>import FieldItem from '../field-item'
import Icon from '../icon'
import {noop, randomId} from '../_util'
import {getCursorsPosition, setCursorsPosition} from '../input-item/cursor'

export default {
  name: 'md-textarea-item',
  components: {
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default() {
        return randomId('input-item')
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: [String, Number],
      default: '',
    },
    maxHeight: {
      type: [String, Number],
      default: '',
    },
    solid: {
      type: Boolean,
      default: true,
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
    rows: {
      type: [String, Number],
      default: '3',
    },
    autosize: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      defalut: '',
    },
    formation: {
      type: Function,
      default: noop,
    },
    compositionable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxHeightInner: this.maxHeight,
      inputValue: this.value,
      isInputFocus: false,
    }
  },
  computed: {
    isDisabled() {
      return this.disabled
    },
    errorInfo() {
      return this.error
    },
    isInputEmpty() {
      return !this.inputValue.length
    },
  },
  watch: {
    value(val) {
      this.inputValue = val
      this.$nextTick(() => {
        this.resizeTextarea()
      })
    },
    inputValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    maxHeight(val) {
      this.maxHeightInner = val
      this.resizeTextarea()
    },
  },
  mounted() {
    this.resizeTextarea()
  },
  methods: {
    $_onInput(event) {
      if (event.target.isNeedPrevent) {
        return
      }

      const formateValue = this.$_formateValue(event.target.value, getCursorsPosition(event.target))

      this.inputValue = formateValue.value

      this.$nextTick(() => {
        setCursorsPosition(event.target, formateValue.range)
        this.resizeTextarea()
      })
    },
    $_formateValue(curValue, curPos = 0) {
      // custom format by user
      const customValue = this.formation(name, curValue, curPos)

      if (customValue) {
        return customValue
      }

      // no format
      return {value: curValue, range: curPos}
    },
    $_clearInput() {
      this.inputValue = ''
      this.$nextTick(() => {
        this.resizeTextarea()
      })
      this.focus()
    },
    $_onKeyup(event) {
      this.$emit('keyup', event)
    },
    $_onKeydown(event) {
      this.$emit('keydown', event)
    },
    $_onFocus() {
      this.isInputFocus = true
      this.$emit('focus')
    },
    $_onBlur() {
      setTimeout(() => {
        this.isInputFocus = false
        this.$emit('blur')
      }, 100)
    },

    $_onCompositionstart(event) {
      if (this.compositionable) {
        event.target.isNeedPrevent = true
      }
      this.$emit('compositionstart', event)
    },

    $_onCompositionend(event) {
      if (this.compositionable) {
        event.target.isNeedPrevent = false
      }
      this.$emit('compositionend', event)
    },

    $_calcTextareaHeight(textarea) {
      // Triggers the textarea to repaint
      textarea.style.height = 'auto'

      let scrollHeight = textarea.scrollHeight
      // if textarea-item is not displayed, avoid height calculations
      if (scrollHeight === 0) {
        return
      }

      if (this.maxHeightInner && scrollHeight > this.maxHeightInner) {
        scrollHeight = this.maxHeightInner
      }

      textarea.style.height = scrollHeight + 'px'
    },
    // public
    resizeTextarea() {
      if (this.autosize) {
        this.$_calcTextareaHeight(this.$refs.textarea)
      }
    },
    focus() {
      this.$refs.textarea.focus()
      setTimeout(() => {
        this.isInputFocus = true
      }, 200)
    },
    blur() {
      this.$refs.textarea.blur()
      this.isInputFocus = false
    },
    getValue() {
      return this.inputValue
    },
  },
}
</script>
<style lang="stylus">
.md-textarea-item
  &-msg
    color textarea-item-color-error
  .md-field-item-content
    align-items normal
  &.is-disabled
    .md-textarea-item__textarea
      -webkit-text-fill-color textarea-item-color-disabled
      color textarea-item-color-disabled
  .md-field-item-right
    align-items start
  &__clear
    padding 6px 0
    color textarea-item-icon
    .md-icon
      display flex
  &__textarea
    box-sizing border-box
    width 100%
    font textarea-item-font-weight textarea-item-font-size font-family-normal
    line-height textarea-item-line-height
    color textarea-item-color
    background transparent
    border none
    outline none
    resize none
    appearance none
    -webkit-tap-highlight-color transparent
    &::-webkit-input-placeholder
      color textarea-item-placeholder-color
      font-weight textarea-item-placeholder-weight
  &.is-error
    .md-field-item-content
      hairline(bottom, textarea-item-color-error, 0, 4px)
</style>
