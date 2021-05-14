<template>
  <div
    class="md-stepper"
    :class="{'disabled': disabled}"
  >
    <div
      class="md-stepper-button md-stepper-button-reduce"
      :class="{'disabled': isMin}"
      @click="$_reduce"
    >
    </div>
    <div class="md-stepper-number">
      <input
        :type="!isInteger ? 'number' :'tel'"
        :size="contentLength"
        :value="currentNum"
        :readOnly="readOnly"
        @input="$_onInput"
        @focus="$_onFocus"
        @blur="$_onChange"
      />
    </div>
    <div
      class="md-stepper-button md-stepper-button-add"
      :class="{'disabled': isMax}"
      @click="$_add"
    >
    </div>
  </div>
</template>

<script>import {warn} from '../_util'
function getDecimalNum(num) {
  try {
    return num.toString().split('.')[1].length
  } catch (e) {
    return 0
  }
}

function accAdd(num1, num2) {
  let r1 = getDecimalNum(num1)
  let r2 = getDecimalNum(num2)
  let m = Math.pow(10, Math.max(r1, r2))
  return +((num1 * m + num2 * m) / m)
}

function subtr(num1, num2) {
  let r1 = getDecimalNum(num1)
  let r2 = getDecimalNum(num2)
  let m = Math.pow(10, Math.max(r1, r2))
  let n = r1 >= r2 ? r1 : r2
  return +((num1 * m - num2 * m) / m).toFixed(n)
}

export default {
  name: 'md-stepper',

  components: {},

  props: {
    defaultValue: {
      type: [Number, String],
      default: 0,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    min: {
      type: [Number, String],
      default: -Number.MAX_VALUE,
    },
    max: {
      type: [Number, String],
      default: Number.MAX_VALUE,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    isInteger: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isMin: false,
      isMax: false,
      isEditing: false,
      currentNum: 0,
    }
  },

  computed: {
    contentLength() {
      if (!this.value) {
        return 2
      }
      const length = this.value.toString().length
      return length > 2 ? length : 2
    },
  },

  watch: {
    defaultValue(val) {
      this.currentNum = this.$_getCurrentNum(val)
    },
    value(val) {
      if (this.isEditing) {
        return
      }
      this.currentNum = this.$_getCurrentNum(val)
    },
    min(val) {
      if (this.currentNum < val) {
        this.currentNum = val
      }
      this.$_checkStatus()
    },
    max(val) {
      if (this.currentNum > val) {
        this.currentNum = val
      }
      this.$_checkStatus()
    },
    currentNum(val, oldVal) {
      this.$_checkStatus()

      if (val !== this.value) {
        this.$emit('input', val)
        this.$emit('change', val)
      }

      const diff = val - oldVal

      // judge the event of operation
      if (diff > 0) {
        this.$emit('increase', diff)
      } else if (diff < 0) {
        this.$emit('decrease', Math.abs(diff))
      }
    },
  },

  mounted() {
    // verify that the minimum value is less than the maximum value
    this.$_checkMinMax()
    this.currentNum = this.$_getCurrentNum(this.value || this.defaultValue)
    this.$_checkStatus()
  },

  methods: {
    // MARK: 私有方法
    $_reduce() {
      if (this.disabled || this.isMin) {
        return
      }
      this.currentNum = subtr(this.currentNum, this.step)
      this.$_onChange()
    },
    $_add() {
      if (this.disabled || this.isMax) {
        return
      }
      this.currentNum = accAdd(this.currentNum, this.step)
      this.$_onChange()
    },
    $_formatNum(value) {
      // @elist
      value = String(value).replace(/[^0-9.-]|^-|^\./g, '')
      return value === '' ? 0 : this.isInteger ? Math.floor(value) : +value
    },
    $_getCurrentNum(value) {
      return Math.max(Math.min(this.max, this.$_formatNum(value)), this.min)
    },
    $_checkStatus() {
      this.isMin = this.currentNum <= this.min
      this.isMax = this.currentNum >= this.max
    },
    $_checkMinMax() {
      if (this.min > this.max) {
        warn('[md-vue-stepper] minNum is larger than maxNum')
      }
      return this.max > this.min
    },

    // MARK: 监听事件方法, 如 $_onButtonClick
    $_onInput(event) {
      const {value} = event.target
      const formatted = this.$_formatNum(value)
      if (+value !== formatted) {
        event.target.value = formatted
      }
      this.currentNum = formatted
    },
    $_onFocus() {
      this.isEditing = true
    },
    $_onChange() {
      this.isEditing = false
      this.currentNum = this.$_getCurrentNum(this.currentNum)
    },
  },
}
</script>

<style lang="stylus">
.md-stepper
  color stepper-color
  -webkit-font-smoothing antialiased
  font-size stepper-font-size
  height stepper-height
  display flex
  &.disabled
    .md-stepper-button
      &:before,
      &:after
        opacity stepper-disabled-opacity
    input
      opacity stepper-disabled-opacity

.md-stepper-button
  position relative
  width stepper-width-button
  height stepper-height
  background-color stepper-fill
  border-radius stepper-radius-button
  &:after
    content ""
    position absolute
    width 24px
    height 2px
    top 50%
    left 50%
    background stepper-color
    transform translate(-50%, -50%)
  &.md-stepper-button-add
    &:before
      content ""
      position absolute
      width 2px
      height 24px
      top 50%
      left 50%
      background stepper-color
      transform translate(-50%, -50%)
  &.disabled
    &:before,
    &:after
      opacity stepper-disabled-opacity

.md-stepper-number
  margin 0 4px
  width stepper-width-input
  height stepper-height
  padding 0 4px
  text-align center
  border-radius stepper-radius-input
  background-color stepper-fill
  input
    width 100%
    height stepper-height
    border none
    outline none
    font-size stepper-input-font-size
    line-height stepper-height
    background-color transparent
    box-sizing border-box
    text-align center
    color stepper-color
</style>
