<template>
  <md-transition
    :name="transition"
    @before-enter="$_beforeEnter"
    @after-enter="$_afterEnter"
    @after-leave="$_afterLeave"
    @enter-cancelled="$_onCancel"
    @leave-cancelled="$_onCancel"
  >
    <div class="md-overlay" :class="{'is-fixed': isFixed}" v-show="value">
      <md-icon class="md-overlay-close" @click="close" name="clear" />
      <div class="md-overlay-content">
        <slot></slot>
      </div>
    </div>
  </md-transition>
</template>

<script>import Icon from '../icon'
import Transtion from '../transition'

export default {
  name: 'md-overlay',

  components: {
    [Icon.name]: Icon,
    [Transtion.name]: Transtion,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'md-fly',
    },
    appendTo: {
      default: () => document.body,
    },
  },

  computed: {
    isFixed() {
      return this.appendTo === document.body
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
    $_beforeEnter() {
      if (this.isFixed) {
        document.body.classList.add('md-overlay-fixed')
      }
    },
    $_afterEnter() {
      this.$emit('show')
    },
    $_afterLeave() {
      if (this.isFixed && document.body.classList.contains('md-overlay-fixed')) {
        document.body.classList.remove('md-overlay-fixed')
      }
      this.$emit('hide')
    },
    $_onCancel() {
      if (this.isFixed && document.body.classList.contains('md-overlay-fixed')) {
        document.body.classList.remove('md-overlay-fixed')
      }
    },
    close() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="stylus" scoped>
body.md-overlay-fixed
  overflow hidden

.md-overlay
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-color overlay-bg
  overflow hidden
  z-index overlay-zindex
  &.is-fixed
    position fixed

.md-overlay-close
  position absolute
  right 25px
  top 25px
  color #000
  width 50px
  height 50px
  line-height 50px
  font-size 50px
  opacity 0.5
  z-index 15

.md-overlay-content
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  overflow auto
  -webkit-overflow-scrolling touch
</style>
