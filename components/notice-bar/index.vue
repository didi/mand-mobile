<template>
  <div
    class="md-notice-bar"
    :class="[
      isCircle && 'md-notice-bar-circle'
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
        <md-icon :name="rightIcon" class="md-notice-icon md-notice-icon-right" @click.native="$_close"></md-icon>
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
    time: {
      type: Number,
      default: 0,
    },
    isCircle: {
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
      return this.mode === 'link' ? 'arrow-right' : 'close'
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
      this.$emit('click')
    },
    $_checkOverflow() {
      if (!this.scrollable) {
        return
      }
      const {wrap, content} = this.$refs
      if (!wrap || !content) {
        return
      }
      this.overflow = content.scrollWidth > wrap.clientWidth
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
  &.md-notice-bar-circle
    border-radius notice-bar-border-radius

.md-notice-bar-left,
.md-notice-bar-right
  padding-right 24px
  display flex
  align-items center

.md-notice-bar-empty
  padding-right 0

.md-notice-bar-content
  flex 1
  margin auto
  width auto
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
    animation md-notice-bar-animation linear 9s infinite both

@keyframes md-notice-bar-animation {
  0% {
    transform translate3d(0, 0, 0)
  }
  100% {
    transform translate3d(-100%, 0, 0)
  }
}
</style>
