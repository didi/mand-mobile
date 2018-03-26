<template>
  <div class="md-number-keyboard-container" :class="type">
    <div class="keyboard-number">
      <ul class="keyboard-number-list">
        <li
          v-for="n in 9"
          :key="n-1"
          v-text="keyNumberList[n-1]"
          class="keyboard-number-item"
          @click="$_onNumberKeyClick($event, keyNumberList[n-1])">
        </li>
        <template v-if="type === 'professional'">
          <li class="keyboard-number-item" @click="$_onNumberKeyClick($event, '.')">.</li>
          <li class="keyboard-number-item" @click="$_onNumberKeyClick($event, keyNumberList[9])">{{ keyNumberList[9] }}</li>
          <li class="keyboard-number-item" v-if="isView"></li>
          <li class="keyboard-number-item slidedown" @click="$_onSlideDoneClick()" v-else></li>
        </template>
        <template v-else>
          <li class="keyboard-number-item no-bg"></li>
          <li class="keyboard-number-item" @click="$_onNumberKeyClick($event, keyNumberList[9])">{{ keyNumberList[9] }}</li>
          <li class="keyboard-number-item no-bg delete" @click="$_onDeleteClick($event)"></li>
        </template>
      </ul>
    </div>
    <div class="keyboard-operate" v-if="type === 'professional'">
      <ul class="keyboard-operate-list">
        <li class="keyboard-operate-item delete" @click="$_onDeleteClick($event)"></li>
        <li class="keyboard-operate-item confirm" @click="$_onConfirmeClick()" v-text="okText"></li>
      </ul>
    </div>
  </div>
</template>

<script>export default {
  name: 'md-number-keyboard-container',

  props: {
    type: {
      // simple, professional
      type: String,
      default: 'professional',
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: '确定',
    },
    isView: {
      type: Boolean,
    },
  },

  data() {
    return {
      keyNumberList: [],
    }
  },

  created() {
    this.$_generateKeyNumber()
  },

  methods: {
    // MARK: private methods
    $_generateKeyNumber() {
      const baseStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      /* istanbul ignore next */
      if (this.disorder) {
        let count = 0
        while (baseStack.length) {
          this.$set(this.keyNumberList, count, baseStack.splice(parseInt(Math.random() * baseStack.length), 1)[0] || 0)
          count++
        }
      } else {
        this.keyNumberList = baseStack
      }
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onNumberKeyClick(event, val) {
      event.stopImmediatePropagation()
      this.$emit('enter', val)
    },
    $_onDeleteClick(event) {
      event.stopImmediatePropagation()
      this.$emit('delete')
    },
    $_onConfirmeClick() {
      this.$emit('confirm')
    },
    $_onSlideDoneClick() {
      this.$emit('hide')
    },
  },
}
</script>

<style lang="stylus">
.md-number-keyboard-container
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  display flex
  width number-keyboard-width
  height number-keyboard-height
  hairline(top, color-border-base)
  .keyboard-number, .keyboard-operate
    display flex
    clearfix()
  .keyboard-number
    flex 3
    background number-keyboard-key-bg
    .keyboard-number-list
      float left
      width 100%
      .keyboard-number-item
        float left
        width 33.3%
        height number-keyboard-key-height
        hairline(right, color-border-base)
        hairline(top, color-border-base)
        text-align center
        line-height number-keyboard-key-height
        font-size number-keyboard-key-font-size
        color number-keyboard-key-color
        transition background .3s
        background color-bg-base
        &.no-bg
          background transparent
        &:after
            display none
        &:nth-of-type(n+4):after
            display inline
        &:nth-of-type(3n):before
            display none
        &.delete
          background url(../_style/images/keyboard-del-simple.png) center no-repeat
          background-size 46px
        &.slidedown
          background color-bg-base url(../_style/images/keyboard-hide.png) center no-repeat
          background-size 55px
        &:active
          background-color number-keyboard-key-bg-tap
  .keyboard-operate
    flex 1
    .keyboard-operate-list
      float left
      width 100%
      display flex
      flex-direction column
      .keyboard-operate-item
        position relative
        float left
        width 100%
        background color-bg-base
        transition background .3s
        &.delete
          height number-keyboard-key-height
          background color-bg-base url(../_style/images/keyboard-del.png) center no-repeat
          background-size 42px
          display flex
          flex 1
          hairline(left, color-border-base)
          &:after
            left -1px
          &:active
            background-color number-keyboard-key-bg-tap
        &.confirm
          overflow hidden
          color color-text-base-inverse
          font-size number-keyboard-key-font-size
          background number-keyboard-key-confirm-bg
          display flex
          flex 3
          align-items center
          justify-content center
          font-size font-heading-normal
          font-weight font-weight-medium
          &:active
            background-color number-keyboard-key-confirm-bg-tap

  &.simple
    .keyboard-number-item
      color number-keyboard-key-color-simple !important
</style>
