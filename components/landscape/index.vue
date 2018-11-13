<template>
  <div class="md-landscape" :class="{'is-full': fullScreen}">
		<md-popup
      v-model="isLandscapeShow"
      :mask-closable="maskClosable"
      prevent-scroll
      prevent-scroll-exclude=".md-landscape-content"
      :has-mask="!fullScreen && hasMask"
      :transition="fullScreen ? 'md-fly' : 'md-punch'"
      @input="$emit('input', false)"
      @show="$emit('show')"
      @hide="$emit('hide')">
      <div class="md-landscape-body" :class="{scroll}">
        <div class="md-landscape-content">
          <slot></slot>
        </div>
        <md-icon
          class="md-landscape-close"
          :class="{dark: !hasMask || fullScreen}"
          @click="$_close"
          :name="fullScreen ? 'clear' : 'close'"
        />
      </div>
    </md-popup>
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
    .md-landscape-body
      width 100%
      height 100%
      background landscape-fullscreen-bg
    .md-landscape-content
      width 100%
      height 100%
      overflow auto
      -webkit-overflow-scrolling touch
    .md-icon.md-landscape-close
      position absolute
      right 25px
      top 25px
      margin auto

  .md-popup
    z-index landscape-zindex

  .md-icon.md-landscape-close
    position relative
    display block
    margin 50px auto 20px auto
    font-size 50px
    width 50px
    height 50px
    line-height 50px
    text-align center
    color color-text-base-inverse
    &.dark
      color color-text-base
      opacity 0.5

.md-landscape-content
  width landscape-width
  font-size font-body-large
  overflow auto
  -webkit-overflow-scrolling touch
  box-sizing border-box
  img
    max-width 100%
    height auto
</style>
