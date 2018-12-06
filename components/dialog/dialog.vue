<template>
  <div class="md-dialog">
    <md-popup
      v-model="value"
      :hasMask="hasMask"
      :maskClosable="maskClosable"
      position="center"
      :transition="transition"
      :preventScroll="preventScroll"
      :preventScrollExclude="preventScrollExclude"
      @input="$_onInput"
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-dialog-content">
        <div class="md-dialog-body">
          <a
            role="button"
            v-if="closable"
            class="md-dialog-close"
            @click="close"
          >
            <md-icon name="close" />
          </a>
          <div v-if="icon" class="md-dialog-icon">
            <md-icon :name="icon" :svg="iconSvg"/>
          </div>
          <h2 class="md-dialog-title" v-if="title" v-text="title"></h2>
          <slot>
            <div class="md-dialog-text" v-html="content"></div>
          </slot>
        </div>
        <footer class="md-dialog-actions" :class="{ 'is-column': layout === 'column' }">
          <template v-for="(btn, index) in btns">
            <a
              role="button"
              class="md-dialog-btn"
              :class="{
                warning: !!btn.warning
              }"
              :key="index"
              v-text="btn.text"
              @click="$_onClick(btn)"
              @touchmove.prevent
            ></a>
          </template>
        </footer>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import Icon from '../icon'
import {mdDocument} from '../_util'

export default {
  name: 'md-dialog',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
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
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '',
    },
    btns: {
      type: Array,
      default: () => [],
    },
    layout: {
      type: String,
      default: 'row',
    },
    appendTo: {
      default: () => mdDocument.body,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'md-fade',
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: String,
      default: '',
    },
  },

  mounted() {
    if (this.appendTo) {
      this.appendTo.appendChild(this.$el)
    }
  },

  beforeDestroy() {
    if (this.appendTo) {
      this.appendTo.removeChild(this.$el)
    }
  },

  methods: {
    // MARK: private methods

    // MARK: events handler
    $_onInput(val) {
      this.$emit('input', val)
    },
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
    },
    $_onClick(btn) {
      if (typeof btn.handler === 'function') {
        btn.handler.call(null)
      } else {
        this.close()
      }
    },
    // MARK: public methods
    close() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="stylus">
.md-dialog
  .md-popup
    z-index dialog-zindex

.md-dialog-content
  width dialog-width
  border-radius dialog-radius
  background-color color-bg-inverse
  overflow hidden

.md-dialog-body
  color dialog-text-color
  font-size dialog-text-font-size
  text-align left
  padding dialog-body-padding

.md-dialog-icon
  position relative
  display block
  width dialog-icon-size
  height dialog-icon-size
  margin v-gap-md auto 28px
.md-dialog .md-dialog-icon .md-icon
  display flex
  align-items center
  justify-content center
  position absolute
  top 0
  left 0
  width dialog-icon-size
  height dialog-icon-size
  fill dialog-icon-fill
  color dialog-icon-fill
  font-size dialog-icon-size
  line-height dialog-icon-size

.md-dialog-close
  position absolute
  color dialog-close-color
  top 32px
  right 32px
  z-index 15

.md-dialog-title
  color dialog-title-color
  text-align center
  font-size dialog-title-font-size
  font-weight font-weight-normal
  line-height 1.2
  margin 0 0 28px 0

.md-dialog-text
  display flex
  justify-content center

.md-dialog-actions
  position relative
  display flex
  hairline(top, dialog-action-border-color)
  &.is-column
    flex-direction column
    .md-dialog-btn
      flex 0 0 auto
      remove-hairline(right)
      &:not(:first-child)
        hairline(top, dialog-action-border-color)
      &:last-child
        color color-text-minor
      &:first-child
        color dialog-action-highlight-color

.md-dialog-btn
  position relative
  flex 1 1 0%
  display flex
  align-items center
  justify-content center
  height dialog-action-height
  font-size dialog-action-font-size
  font-weight dialog-action-font-weight
  color color-text-minor
  text-align center
  hairline(right, dialog-action-border-color)
  transition background-color .3s
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &.warning
    color color-text-error !important
  &:last-child
    color dialog-action-highlight-color
    remove-hairline(right)
  &:active
    background-color color-bg-tap
</style>
