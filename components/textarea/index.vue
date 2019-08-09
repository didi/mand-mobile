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
    <footer class="md-textarea-item__footer"></footer>
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
  name: 'md-textarea',
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
      default: '40',
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
      maxHeightInner: this.$props.maxHeight,
      inputValue: this.value,
    }
  },
  computed: {
    isDisabled() {
      return this.$props.disabled
    },
    errorInfo() {
      return this.$props.error
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
      this.$data.maxHeightInner = val
      this.resizeTextarea()
    },
  },
  mounted() {
    this.resizeTextarea()
  },
  methods: {
    $_onInput(event) {
      this.$data.inputValue = event.target.value

      // 计算高度
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
      /**
       * 思路1 查看是否有滚动条, 获取scrollHeight
       * 注意: 如果元素被隐藏, scrollHeight是0, textarea不能被展开
       */
      textarea.style.height = 'auto'
      let scrollHeight = textarea.scrollHeight
      // 出现滚动条
      if (scrollHeight > this.$data.maxHeightInner) {
        scrollHeight = this.$data.maxHeightInner
        this.$emit('hasScroll', true)
      } else {
        // 未出现滚动条
        this.$emit('hasScroll', false)
      }

      /**
       * 为啥这里需要直接操作dom:
       * 这里需要通过textarea.style.height='auto' 出发textarea的重绘, 使scrollHeight在高度缩小时也能正确计算
       */
      textarea.style.height = scrollHeight + 'px'

      /**
       * 思路2 嵌入pre 标签, 得到pre标签的高度
       */

      /**
       * 思路3 计算字符串的长度, 除以 cols 得到rows
       * 这个的问题是 rows计算不精确, 数字和中文有误差
       */

      // const cols = textarea.cols;
      // let linecount = 0;
      // this.inputValue.split('\n').map(l => {
      //   linecount += 1 + Math.floor(l.length / cols)
      // })
      // this.rowsInner = linecount
    },
    // public
    resizeTextarea() {
      if (this.$props.autosize) {
        this.$_calcTextareaHeight(this.$refs.textarea)
      }
    },
    focus() {
      this.$el.querySelector('.md-textarea-item__textarea').focus()
    },
    blur() {
      this.$el.querySelector('.md-textarea-item__textarea').blur()
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
