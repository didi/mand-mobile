<template>
  <div class="md-action-sheet">
    <md-popup
      class="inner-popup large-radius"
      v-model="isActionSheetShow"
      position="bottom"
      prevent-scroll
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-action-sheet-content">
        <header class="md-action-sheet-header" v-if="title">{{ title }}</header>
        <ul class="md-action-sheet-list">
          <template v-for="(item, index) in options">
            <li
              :key="index"
              :class="{
                'active': index === clickIndex,
                'disabled': index=== invalidIndex,
                'md-action-sheet-item': true
              }"
              @click="$_onSelect(item, index)"
            >
              <div class="md-action-sheet-item-wrapper">
                <div class="md-action-sheet-item-section" v-html="item.text || item.label"></div>
              </div>
            </li>
          </template>
          <li class="md-action-sheet-cancel" @click="$_onCancel">{{ cancelText }}</li>
        </ul>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import {inArray} from '../_util'
import {t} from '../_locale'

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
      default: t('md.action_sheet.cancel'),
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
    // MARK: events handler, 如 $_onButtonClick
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
      this.$_hideSheet()
    },
    $_onSelect(item, index) {
      if (index === this.invalidIndex || inArray(this.invalidIndex, index)) {
        return
      }
      this.clickIndex = index
      this.$emit('selected', item)
      this.$_hideSheet()
    },
    $_onCancel() {
      this.$emit('cancel')
      this.$_hideSheet()
    },
    $_hideSheet() {
      this.isActionSheetShow = false
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="stylus">
.md-action-sheet
  color action-sheet-color
  -webkit-font-smoothing antialiased
  .md-popup
    z-index action-sheet-zindex
  .md-popup-box
    background-color color-bg-base

.md-action-sheet-content
  position relative
  width 100%
  font-size action-sheet-font-size
  background action-sheet-bg
  text-align center
  overflow auto

.md-action-sheet-header
  position relative
  vertical-height(action-sheet-height)
  hairline(bottom, color-border-base)
  word-ellipsis()
  overflow visible

.md-action-sheet-item
  position relative
  vertical-height(action-sheet-height)
  padding 0 action-sheet-padding-h
  box-sizing border-box
  font-size action-sheet-font-size
  transition background-color .3s
  -webkit-user-select none
  &.active
    color action-sheet-color-highlight
  &.disabled .md-action-sheet-item-section
    opacity action-sheet-disabled-opacity
  &:first-of-type
    .md-action-sheet-item-wrapper:after
      display none
  &:active
    background-color color-bg-tap
    &.disabled
      background-color transparent

.md-action-sheet-item-wrapper
  position relative
  hairline(top, color-border-base)

.md-action-sheet-cancel
  height 132px
  line-height 120px
  color action-sheet-color-cancel
  font-weight font-weight-medium
  &::before
    display block
    content ''
    height 12px
    background action-sheet-cancel-gap-bg
</style>
