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
          <li class="keyboard-number-item"
            v-if="!hideDot"
            v-text="dotText"
            @click="$_onNumberKeyClick($event, dotText)"
          ></li>
          <li
            class="keyboard-number-item"
            :class="{'large-item': hideDot}"
            @click="$_onNumberKeyClick($event, keyNumberList[9])"
          >
            {{ keyNumberList[9] }}
          </li>
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

<script>import {noop} from '../_util'
export default {
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
    hideDot: {
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
    textRender: {
      type: Function,
      default: noop,
    },
  },

  data() {
    return {
      keyNumberList: [],
    }
  },

  computed: {
    dotText() {
      return this.textRender('.') || '.'
    },
  },

  created() {
    this.$_generateKeyNumber()
  },

  methods: {
    // MARK: private methods
    $_generateKeyNumber() {
      const baseStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const baseStackTmp = [...baseStack]
      /* istanbul ignore next */
      this.keyNumberList = baseStack.map(item => {
        const val = this.disorder ? baseStackTmp.splice(parseInt(Math.random() * baseStackTmp.length), 1)[0] || 0 : item
        return this.textRender(val) || val
      })
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
  position relative
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  display flex
  width number-keyboard-width
  height number-keyboard-height
  hairline(top, number-keyboard-key-bordr-color)
  .keyboard-number, .keyboard-operate
    display flex
    clearfix()
  .keyboard-number
    flex 3
    background number-keyboard-bg
    .keyboard-number-list
      float left
      width 100%
      .keyboard-number-item
        position relative
        float left
        width 33.3%
        height number-keyboard-key-height
        hairline(right, number-keyboard-key-bordr-color)
        hairline(top, number-keyboard-key-bordr-color)
        text-align center
        line-height number-keyboard-key-height
        font-size number-keyboard-key-font-size
        font-weight number-keyboard-key-font-weight
        font-family DINPro-Medium
        color number-keyboard-key-color
        transition background .3s
        background number-keyboard-key-bg
        &.no-bg
          background transparent
        &:after
            display none
        &:nth-of-type(n+4):after
            display inline
        // &:nth-of-type(3n):before
        //     display none
        &.delete
          background url(../_style/images/keyboard-del.png) center no-repeat
          background-size 46px
        &.slidedown
          background number-keyboard-key-bg url(../_style/images/keyboard-hide.png) center no-repeat
          background-size 54px
        &.large-item
          width 66.6%
        &:active
          background-color number-keyboard-key-bg-tap
  .keyboard-operate
    flex 1
    .keyboard-operate-list
      position relative
      left -1px
      float left
      width 100%
      display flex
      flex-direction column
      .keyboard-operate-item
        position relative
        float left
        width 100%
        background number-keyboard-key-bg
        transition background .3s
        &.delete
          height number-keyboard-key-height
          background number-keyboard-key-bg url(../_style/images/keyboard-del.png) center no-repeat
          background-size 42px
          display flex
          flex 1
          &:active
            background-color number-keyboard-key-bg-tap
        &.confirm
          top -2px
          overflow hidden
          color number-keyboard-key-confirm-color
          font-size number-keyboard-key-font-size
          background number-keyboard-key-confirm-bg
          display flex
          flex 1
          align-items center
          justify-content center
          font-size font-caption-large
          &:active
            background-color number-keyboard-key-confirm-bg-tap

  &.simple
    .keyboard-number-item
      color number-keyboard-key-color-simple !important
</style>
