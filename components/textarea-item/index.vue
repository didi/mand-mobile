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
    ></textarea>
    <slot name="footer"></slot>
    <template slot="children">
      <div v-if="errorInfo" class="md-textarea-item-msg">
        <p>{{ errorInfo }}</p>
      </div>
    </template>
  </md-field-item>
</template>
<script>import FieldItem from '../field-item'

export default {
  name: 'md-textarea-item',
  components: {
    [FieldItem.name]: FieldItem,
  },
  props: {
    title: {
      type: String,
      default: '',
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
  },
  data() {
    return {
      maxHeightInner: this.maxHeight,
      inputValue: this.value,
    }
  },
  computed: {
    isDisabled() {
      return this.disabled
    },
    errorInfo() {
      return this.error
    },
  },
  watch: {
    value(val) {
      this.inputValue = val
      this.resizeTextarea()
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
      this.inputValue = event.target.value

      this.$nextTick(() => {
        this.resizeTextarea()
      })
    },
    $_onKeyup(event) {
      this.$emit('keyup', event)
    },
    $_onKeydown(event) {
      this.$emit('keydown', event)
    },
    $_onFocus() {
      this.$emit('focus')
    },
    $_onBlur() {
      setTimeout(() => {
        this.$emit('blur')
      }, 100)
    },
    $_calcTextareaHeight(textarea) {
      // Triggers the textarea to repaint
      textarea.style.height = 'auto'

      let scrollHeight = textarea.scrollHeight
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
    },
    blur() {
      this.$refs.textarea.blur()
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
  .is-disabled
    .md-textarea-item__textarea
      -webkit-text-fill-color textarea-item-color-disabled
      color textarea-item-color-disabled
  &__textarea
    width 100%
    -webkit-appearance none
    border none
    background transparent
    outline none
    resize none
    box-sizing border-box
    -webkit-tap-highlight-color transparent
    appearance none
    line-height textarea-item-line-height
    font-size textarea-item-font-size
    &::-webkit-input-placeholder
      color textarea-item-placeholder-color
      font-weight textarea-item-placeholder-weight
  &.is-error
    .md-field-item-content
      hairline(bottom, textarea-item-color-error, 0, 4px)
</style>
