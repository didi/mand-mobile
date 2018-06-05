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
      <input type="tel"
      v-model="currentNum"
      :readOnly="readOnly"
      @blur="$_reset"
      @change="$_onChange">
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
  return (num1 * m + num2 * m) / m
}

function subtr(num1, num2) {
  let r1 = getDecimalNum(num1)
  let r2 = getDecimalNum(num2)
  let m = Math.pow(10, Math.max(r1, r2))
  let n = r1 >= r2 ? r1 : r2
  return ((num1 * m - num2 * m) / m).toFixed(n)
}

export default {
  name: 'md-stepper',

  components: {},

  props: {
    defaultValue: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: -Number.MAX_VALUE,
    },
    max: {
      type: Number,
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
  },

  data() {
    return {
      isMin: false,
      isMax: false,
      currentNum: 0,
    }
  },

  watch: {
    defaultValue() {
      this.currentNum = this._getCurrentNum()
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
  },

  mounted() {
    // verify that the minimum value is less than the maximum value
    this.$_checkMinMax()
    this.currentNum = this.$_getCurrentNum()
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
    $_getCurrentNum() {
      let num = this.defaultValue
      if (num < this.min) {
        return this.min
      } else if (num > this.max) {
        return this.max
      } else {
        return this.defaultValue
      }
    },
    $_checkStatus() {
      this.isMin = subtr(this.currentNum, this.step) < this.min
      this.isMax = accAdd(this.currentNum, this.step) > this.max
    },
    $_checkMinMax() {
      if (this.min > this.max) {
        warn('[md-vue-stepper] minNum is larger than maxNum')
      }
      return this.max > this.min
    },
    $_reset() {
      if (!this.currentNum || isNaN(this.currentNum)) {
        this.currentNum = this.min !== -Number.MAX_VALUE ? this.min : 0
      }
    },

    // MARK: 监听事件方法, 如 $_onButtonClick
    $_onChange() {
      let currentNum = this.currentNum ? this.currentNum : this.min
      if (currentNum < this.min) {
        this.currentNum = this.min
      } else if (currentNum > this.max) {
        this.currentNum = this.max
      }
      this.$_checkStatus()
      this.$emit('change', this.currentNum)
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
    opacity opacity-disabled
  .md-stepper-button
    position relative
    width stepper-width-button
    height stepper-height
    background-color stepper-fill
    border-radius 2px
    &:after
      center()
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
        center()
        content ""
        position absolute
        width 2px
        height 24px
        top 50%
        left 50%
        background stepper-color
        transform translate(-50%, -50%)
    &.disabled
      opacity stepper-disabled-opacity
  .md-stepper-number
    margin 0 4px
    min-width 68px
    height stepper-height
    padding 0 4px
    text-align center
    border-radius 2px
    input
      width stepper-width-input
      height stepper-height
      border none
      outline none
      font-size stepper-input-font-size
      line-height stepper-height
      box-sizing border-box
      background-color stepper-fill
      text-align center
      color stepper-color
      border-radius unset
</style>
