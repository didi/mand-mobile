<template>
  <div class="md-action-sheet">
    <md-popup
      v-model="isActionSheetShow"
      position="bottom"
      prevent-scroll
      :prevent-scroll-exclude="scroller"
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-action-sheet-content" :style="{maxHeight: `${maxHeight}px`}">
        <header v-if="title">{{ title }}</header>
        <ul>
          <template v-for="(item, index) in options">
            <li
              :key="index"
              :class="{
                'active': index === clickIndex,
                'disabled': index=== invalidIndex,
                'md-action-sheet-item': true
              }"
              @click="$_onSelect(item, index)"
              v-html="item.text || item.label"
            ></li>
          </template>
          <li class="cancel-btn" @click="$_onCancel">{{ cancelText }}</li>
        </ul>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import {inArray} from '../_util'

export default {
  name: 'md-action-sheet',

  components: {
    [Popup.name]: Popup,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    defaultIndex: {
      type: Number,
      default: -1,
    },
    invalidIndex: {
      type: Number,
      default: -1,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    maxHeight: {
      type: Number,
      default: 400,
    },
  },

  data() {
    return {
      isActionSheetShow: this.value,
      clickIndex: -1,
      scroller: '',
    }
  },

  watch: {
    value(newVal) {
      this.isActionSheetShow = newVal
    },
  },

  created() {
    this.clickIndex = this.defaultIndex
  },

  methods: {
    $_setScroller() {
      const boxer = this.$el ? this.$el.querySelector('.md-action-sheet-content') : null
      if (boxer && boxer.clientHeight >= this.maxHeight) {
        this.scroller = '.md-action-sheet-content'
      } else {
        this.scroller = ''
      }
    },
    // MARK: events handler, 如 $_onButtonClick
    $_onShow() {
      this.$_setScroller()
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
      this.$emit('input', false)
    },
    $_onSelect(item, index) {
      if (index === this.invalidIndex || inArray(this.invalidIndex, index)) {
        return
      }
      this.clickIndex = index
      this.$emit('selected', item)
      this.$emit('input', false)
    },
    $_onCancel() {
      this.$emit('cancel')
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="stylus">
.md-action-sheet
  color color-text-base
  -webkit-font-smoothing antialiased
  .md-action-sheet-content
    position relative
    width 100%
    font-size action-sheet-font-size
    background color-bg-base
    text-align center
    overflow auto
    header
      vertical-height(action-sheet-height)
      padding 0 30px
      word-ellipsis()
    >ul
      li
        vertical-height(action-sheet-height)
        hairline(top, color-border-base)
        box-sizing border-box
        font-size font-body-normal
        &.active
          color button-primary-fill
        &.disabled
          opacity field-item-color-disabled
        &.cancel-btn
          height 132px
          line-height 120px
          &::before
            display block
            content ''
            height 12px
            background color-primary-background
  .md-popup-box
    background-color color-bg-base
</style>
