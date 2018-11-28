<template>
  <div
    class="md-toast"
    :class="[
      icon ? 'has-icon' : '',
      position,
    ]"
  >
    <md-popup
      v-model="visible"
      @hide="$_onHide"
      :hasMask="hasMask"
      :maskClosable="false"
    >
      <div class="md-toast-content">
        <md-icon v-if="icon" :name="icon" size="lg" />
        <span v-text="content"></span>
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
  },

  data() {
    return {
      visible: true,
    }
  },

  mounted() {
    this.$_update()
  },
  updated() {
    this.$_update()
  },
  beforeDestroy() {
    if (this.duration) {
      clearTimeout(this.$_timer)
    }
  },

  methods: {
    $_update() {
      clearTimeout(this.$_timer)
      if (this.visible && this.duration) {
        this.$_timer = setTimeout(() => {
          this.hide()
        }, this.duration)
      }
    },
    $_onHide() {
      this.$emit('hide')
    },
    hide() {
      setTimeout(() => {
        this.visible = false
      }, 0)
    },
  },
}
</script>

<style lang="stylus">
  .md-toast
    position relative
    z-index toast-zindex
    &.has-icon .md-toast-content
      padding-left toast-text-left
    .md-toast-content
      position relative
      display inline-block
      text-align left
      padding toast-padding
      border-radius toast-radius
      font-size toast-font-size
      color toast-color
      background-color toast-fill
      box-sizing content-box
    .md-icon
      position absolute
      top 50%
      left toast-padding
      transform translateY(-50%)
    .md-popup
      .md-popup-box
        width 468px
        text-align center
        overflow visible
      .md-popup-mask
        background transparent
    &.bottom
      .md-popup.center .md-popup-box
        top auto
        bottom 50px
    &.top
      .md-popup.center .md-popup-box
        top 50px
        bottom auto
</style>
