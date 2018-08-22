<template>
  <div class="md-toast" :class="[position]">
    <md-popup
      v-model="visible"
      @hide="$_onHide"
      :hasMask="hasMask"
      :maskClosable="false"
    >
      <div class="md-toast-content">
        <md-icon v-if="icon" :name="icon" size="lg" />
        <div class="md-toast-text" v-text="content"></div>
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
      this.visible = false
    },
  },
}
</script>

<style lang="stylus">
  .md-toast
    z-index toast-zindex
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
    .md-icon
      flex-shrink 0
      color toast-color
      margin-right 12px
    .md-toast-text
      white-space nowrap
      text-overflow: ellipsis
      overflow hidden
    .md-popup
      .md-popup-box
        width 540px
        text-align center
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
