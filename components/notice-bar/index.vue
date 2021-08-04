<template>
  <div
    class="md-notice-bar"
    :class="[
      round && 'md-notice-bar-round',
      type
    ]"
    v-if="isShow"
  >
    <div class="md-notice-bar-left" :class="[(!customLeft && !icon) && 'md-notice-bar-empty']">
      <!-- custom first -->
      <template v-if="customLeft">
        <slot name="left"></slot>
      </template>
      <template v-else-if="icon">
        <md-icon class="md-notice-icon" :name="icon" :svg="iconSvg"></md-icon>
      </template>
    </div>
    <div
      class="md-notice-bar-content"
      :class="[
        multiRows && 'md-notice-bar-multi-content'
      ]"
      ref="wrap"
    >
      <div :class="[(overflow && scrollable) && 'md-notice-bar-content-animate']" ref="content">
        <slot></slot>
      </div>
    </div>
    <div class="md-notice-bar-right">
      <!-- custom first -->
      <template v-if="customRight">
        <slot name="right"></slot>
      </template>
      <template v-else-if="mode || closable">
        <md-icon
          class="md-notice-icon md-notice-icon-right"
          :name="rightIcon"
          @click.native.stop="$_close"
        ></md-icon>
      </template>
    </div>
  </div>
</template>

<script>import Icon from '../icon'
export default {
  name: 'md-notice-bar',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    mode: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default', // default/activity/warning
    },
    time: {
      type: Number,
      default: 0,
    },
    round: {
      type: Boolean,
      default: false,
    },
    multiRows: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    // will be delete in future
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    // will be delete in future
    closable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isShow: true,
      overflow: false,
    }
  },

  computed: {
    customLeft() {
      return !!this.$slots.left
    },

    customRight() {
      return !!this.$slots.right
    },

    rightIcon() {
      return this.mode === 'link' ? 'arrow' : 'close'
    },
  },

  updated() {
    this.$_checkOverflow()
  },

  mounted() {
    if (this.time) {
      this.$_hide(this.time)
    }
    this.$_checkOverflow()
  },

  methods: {
    // MARK: private methods
    $_hide(time) {
      setTimeout(() => {
        this.isShow = false
      }, time)
    },
    $_close() {
      if (this.mode === 'closable' || this.closable) {
        this.isShow = false
      }
      this.$emit('close')
    },
    $_checkOverflow() {
      if (!this.scrollable) {
        return
      }
      const {wrap, content} = this.$refs

      /* istanbul ignore if */
      if (!wrap || !content) {
        return
      }
      /**
       * 计算 padding-left 对宽度的影响
       * 替换 clientWidth 为 getBoundingClientRect
       */
      const paddingLeft =
        window
          .getComputedStyle(content, null)
          .getPropertyValue('padding')
          .split(' ')[3] || '0px'
      const left = +paddingLeft.match(/\d+/g)[0]

      this.overflow = content.scrollWidth - left > Math.ceil(wrap.getBoundingClientRect().width)
    },
  },
}
</script>

<style lang="stylus">
.md-notice-bar
  display flex
  z-index notice-bar-zindex
  font-size notice-bar-font-size
  min-height 64px
  background-color notice-bar-fill
  color notice-bar-color
  position relative
  padding-left 32px
  box-sizing border-box
  &.md-notice-bar-round
    border-radius notice-bar-border-radius
  &.activity
    background-color notice-bar-fill-activity
    color notice-bar-color-activity
  &.warning
    background-color notice-bar-fill-warning
    color notice-bar-color-warning

.md-notice-bar-left,
.md-notice-bar-right
  display flex
  align-items center

.md-notice-bar-left
  padding-right 16px
.md-notice-bar-right
  padding-right 32px
.md-notice-bar-empty
  padding-right 0

.md-notice-bar-content
  flex 1
  margin auto
  width auto
  margin-right 40px
  line-height 64px
  white-space nowrap
  overflow hidden
  &.md-notice-bar-multi-content
    padding h-gap-md 0
    line-height font-caption-large
    white-space normal
  .md-notice-bar-content-animate
    padding-left 100%
    display inline-block
    animation md-notice-bar-animation linear 16s infinite both

@keyframes md-notice-bar-animation {
  0% {
    transform translate3d(0, 0, 0)
  }
  100% {
    transform translate3d(-100%, 0, 0)
  }
}
</style>
