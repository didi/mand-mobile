<template>
  <div class="md-dialog">
    <md-popup
      :value="value"
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
            <md-icon name="cross" />
          </a>
          <div v-if="icon" class="md-dialog-icon">
            <md-icon :name="icon" />
          </div>
          <h2 class="md-dialog-title" v-if="title" v-text="title"></h2>
          <slot>
            <div class="md-dialog-text" v-html="content"></div>
          </slot>
        </div>
        <footer class="md-dialog-actions" :class="{ 'is-column': layout === 'column' }">
          <a
            role="button"
            class="md-dialog-btn"
            v-for="(btn, index) in btns"
            :key="index"
            v-text="btn.text"
            @click="$_onClick(btn)"
          ></a>
        </footer>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import Icon from '../icon'

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
      default: () => document.body,
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
      default: 'fade',
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
  z-index dialog-zindex

.md-dialog-content
  width dialog-width
  border-radius dialog-radius
  background-color color-bg-base
  overflow hidden

.md-dialog-body
  color dialog-text-color
  font-size dialog-text-font-size
  text-align left
  padding v-gap-sl h-gap-sl

.md-dialog-icon
  position relative
  display block
  width dialog-icon-size
  height dialog-icon-size
  margin v-gap-md auto
.md-dialog .md-dialog-icon .md-icon
  width dialog-icon-size
  height dialog-icon-size
  fill dialog-icon-fill

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
  line-height 1.2
  margin 0 0 28px 0

.md-dialog-text
  display flex
  justify-content center

.md-dialog-actions
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
        color color-text-caption
      &:first-child
        color dialog-action-highlight-color

.md-dialog-btn
  flex 1 1 0%
  display flex
  align-items center
  justify-content center
  height dialog-action-height
  font-size dialog-action-font-size
  color color-text-caption
  text-align center
  hairline(right, dialog-action-border-color)
  &:last-child
    color dialog-action-highlight-color
    remove-hairline(right)

.md-popup.center
  .md-popup-box
    transform translate(-50%, -50%)
    &.fade-enter
      opacity 0.01
      transform translate(-50%, -20%)
    &.fade-leave-to
      opacity 0.01
      transform translate(-50%, -70%)
    &.fade-enter-active,
    &.fade-leave-active,
    &.bounce-leave-active
      transition all 200ms
    &.bounce-enter
      opacity 0.01
    &.bounce-enter-active
      animation bounce-in 300ms
    &.bounce-leave-to
      opacity 0.01
      transform translate(-50%, -50%) scale(0.5)

@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  1% {
    transform: translate(-50%, -50%) scale(0.5);
  }
  45% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  80% {
    transform: translate(-50%, -50%) scale(0.95);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
