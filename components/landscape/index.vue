<template>
  <div class="md-landscape">
		<md-popup
      v-model="isLandscapeShow"
      :mask-closable="false"
      prevent-scroll
      :prevent-scroll-exclude="scroll ? '.content' : null"
      :has-mask="hasMask"
      @input="$emit('input', false)"
      @show="$emit('show')"
      @hide="$emit('hide')">
      <div class="content" :class="{scroll}">
        <slot></slot>
      </div>
    </md-popup>
    <div class="close"
      @click="$_close"
      v-show="isLandscapeShow"
      :class="{dark: !hasMask}">
      <md-icon name="cross" size="lg"></md-icon>
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
    hasMask: {
      type: Boolean,
      default: true,
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
  .content
    position relative
    width 540px
    min-height 500px
    font-size 28px
    text-align center
    border-radius 4px
    >img
      width 100%
      height 100%
      display block
    &.scroll
      max-height 700px
      overflow-y scroll
  .close
    position fixed
    z-index 1000
    left 0
    right 0
    bottom 10%
    width 40px
    margin 0 auto
    color color-text-base-inverse
    &.dark
      color color-text-base
</style>
