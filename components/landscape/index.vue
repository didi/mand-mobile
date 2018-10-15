<template>
  <div class="md-landscape" :class="{'is-full': fullScreen}">
		<md-popup
      v-model="isLandscapeShow"
      :mask-closable="maskClosable"
      prevent-scroll
      :prevent-scroll-exclude="scroll ? '.landscape-content' : null"
      :has-mask="!fullScreen && hasMask"
      :transition="fullScreen ? 'md-zoom' : 'md-punch'"
      @input="$emit('input', false)"
      @show="$emit('show')"
      @hide="$emit('hide')">
      <div class="landscape-content" :class="{scroll}">
        <slot></slot>
      </div>
    </md-popup>
    <div class="landscape-close"
      @click="$_close"
      v-show="isLandscapeShow"
      :class="{dark: !hasMask || fullScreen}">
      <md-icon name="close"></md-icon>
    </div>
  </div>
</template>

<script>import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'md-landscape',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isLandscapeShow: this.value,
    }
  },

  watch: {
    value(val) {
      this.isLandscapeShow = val
    },
  },

  methods: {
    // MARK: private methods
    $_close() {
      this.isLandscapeShow = false
    },
  },
}
</script>

<style lang="stylus">
.md-landscape
  &.is-full
    .md-popup-box
      position absolute
      absolute-pos()
      background landscape-fullscreen-bg
    .landscape-content
      width 100%
      height 100%

  .md-popup.with-mask, .md-popup .md-popup-box
    z-index landscape-zindex

  .landscape-content
    display flex
    justify-content center
    align-items center
    position relative
    width landscape-width
    font-size font-body-large
    text-align center
    border-radius landscape-radius
    overflow hidden
    >img
      width 100%
      height 100%
      display block
    &.scroll
      max-height 700px
      overflow-y scroll
  .landscape-close
    position fixed
    z-index landscape-zindex
    left 0
    right 0
    bottom 10%
    color color-text-base-inverse
    text-align center
    &.dark
      color color-text-base
    .md-icon
      font-size 50px
</style>
