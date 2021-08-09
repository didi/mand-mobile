<template>
  <div class="md-toast" :class="[position]">
    <md-popup
      :value="visible"
      @show="$_onShow"
      @hide="$_onHide"
      :hasMask="hasMask"
      :maskClosable="false"
    >
      <div class="md-toast-content" :class="{ square: square }" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="md-toast-content" :class="{ square: square }" v-else>
        <md-icon v-if="icon" :name="icon" size="lg" :svg="iconSvg"/>
        <div class="md-toast-text" v-if="content" v-text="content"></div>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'md-toast',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },

  props: {
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    duration: {
      type: Number,
      default: 0,
    },
    position: {
      // top, left, bottom
      type: String,
      default: 'center',
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  beforeDestroy() {
    if (this.$_timer) {
      clearTimeout(this.$_timer)
    }
  },

  methods: {
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
    },
    fire() {
      if (this.$_timer) {
        clearTimeout(this.$_timer)
      }
      if (this.visible && this.duration) {
        this.$_timer = setTimeout(() => {
          this.hide()
        }, this.duration)
      }
    },
    show() {
      this.visible = true
      this.fire()
    },
    hide() {
      this.visible = false
    },
  },
}
</script>

<style lang="stylus">
.md-toast
  .md-popup
    z-index toast-zindex
  .md-icon
    flex-shrink 0
    color toast-color
  .md-icon + .md-toast-text
    margin-left h-gap-xs
  .md-popup
    .md-popup-box
      width 540px
      display flex
      justify-content center
    .md-popup-mask
      background transparent
  &.bottom
    .md-popup .md-popup-box
      position absolute
      bottom 50px
      left 50%
      transform translateX(-50%)
  &.top
    .md-popup .md-popup-box
      position absolute
      top 50px
      left 50%
      transform translateX(-50%)

.md-toast-content
  display inline-flex
  align-items center
  max-width 100%
  min-width 80px
  padding toast-padding
  border-radius toast-radius
  font-size toast-font-size
  text-align left
  line-height 1.42857142
  color toast-color
  background-color toast-fill
  box-sizing border-box
  overflow hidden
  &.square
    display flex
    flex-direction column
    width 300px
    height 240px
    padding 56px 60px
    .md-icon
      margin-bottom 32px
      width 60px
      height 60px
      font-size 60px

.md-toast-text
  white-space nowrap
  text-overflow: ellipsis
  overflow hidden
</style>
