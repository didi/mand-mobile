<template>
  <div
    v-show="isPopupShow"
    class="md-popup"
    :class="[
      hasMask ? 'with-mask' : '',
      position
    ]"
  >
    <transition name="fade">
      <div
        v-show="hasMask && isPopupBoxShow"
        @click="$_onPopupMaskClick"
        class="md-popup-mask"
      ></div>
    </transition>
    <transition
      :name="transition"
      @before-enter="$_onPopupTransitionStart"
      @before-leave="$_onPopupTransitionStart"
      @after-enter="$_onPopupTransitionEnd"
      @after-leave="$_onPopupTransitionEnd"
    >
      <div
        v-show="isPopupBoxShow"
        class="md-popup-box"
        :class="[
          transition
        ]"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>export default {
  name: 'md-popup',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'center',
    },
    transition: {
      type: String,
      default() {
        switch (this.position) {
          case 'bottom':
            return 'slide-up'
          /* istanbul ignore next */
          case 'top':
            return 'slide-down'
          /* istanbul ignore next */
          case 'left':
            return 'slide-right'
          /* istanbul ignore next */
          case 'right':
            return 'slide-left'
          default:
            return 'fade'
        }
      },
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: [String, HTMLElement],
      default() {
        return ''
      },
    },
  },

  data() {
    return {
      // controle popup mask & popup box
      isPopupShow: false,
      // controle popup box
      isPopupBoxShow: false,
      // transtion lock
      isAnimation: false,
    }
  },

  watch: {
    value(val) {
      /* istanbul ignore next */
      if (val) {
        if (this.isAnimation) {
          setTimeout(() => {
            this.$_showPopupBox()
          }, 50)
        } else {
          this.$_showPopupBox()
        }
      } else {
        this.$_hidePopupBox()
      }
    },
    preventScrollExclude(val, oldVal) {
      // remove old listener before add
      /* istanbul ignore next */
      this.$_preventScrollExclude(false, oldVal)
      /* istanbul ignore next */
      this.$_preventScrollExclude(true, val)
    },
  },

  mounted() {
    this.value && this.$_showPopupBox()
  },

  methods: {
    // MARK: private methods
    $_showPopupBox() {
      this.isPopupShow = true
      this.isAnimation = true
      // popup box enter the animation after popup show
      this.$nextTick(() => {
        this.isPopupBoxShow = true
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'testing') {
          this.$_onPopupTransitionEnd()
        }
      })

      this.preventScroll && this.$_preventScroll(true)
    },
    $_hidePopupBox() {
      this.isAnimation = true
      this.isPopupBoxShow = false
      this.preventScroll && this.$_preventScroll(false)
      this.$emit('input', false)
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'testing') {
        this.$_onPopupTransitionEnd()
      }
    },
    $_preventScroll(isBind) {
      const handler = isBind ? 'addEventListener' : 'removeEventListener'
      const masker = this.$el.querySelector('.md-popup-mask')
      const boxer = this.$el.querySelector('.md-popup-box')

      masker && masker[handler]('touchmove', this.$_preventDefault, false)
      boxer && boxer[handler]('touchmove', this.$_preventDefault, false)
      this.$_preventScrollExclude(isBind)
    },
    $_preventScrollExclude(isBind, preventScrollExclude) {
      const handler = isBind ? 'addEventListener' : 'removeEventListener'
      preventScrollExclude = preventScrollExclude || this.preventScrollExclude
      const excluder =
        preventScrollExclude && typeof preventScrollExclude === 'string'
          ? this.$el.querySelector(preventScrollExclude)
          : preventScrollExclude
      excluder && excluder[handler]('touchmove', this.$_stopImmediatePropagation, false)
    },
    $_preventDefault(event) {
      event.preventDefault()
    },
    $_stopImmediatePropagation(event) {
      /* istanbul ignore next */
      event.stopImmediatePropagation()
    },

    // MARK: event handler
    $_onPopupTransitionStart() {
      if (!this.isPopupBoxShow) {
        this.$emit('beforeHide')
        this.$emit('before-hide')
      } else {
        this.$emit('beforeShow')
        this.$emit('before-show')
      }
    },
    $_onPopupTransitionEnd() {
      /* istanbul ignore next */
      if (!this.isAnimation) {
        return
      }

      /* istanbul ignore next */
      if (!this.isPopupBoxShow) {
        // popup hide after popup box finish animation
        this.isPopupShow = false
        this.$emit('hide')
      } else {
        this.$emit('show')
      }

      /* istanbul ignore next */
      this.isAnimation = false
    },
    $_onPopupMaskClick() {
      this.maskClosable && this.$_hidePopupBox()
    },
  },
}
</script>

<style lang="stylus">
.md-popup
  &.with-mask
    absolute-pos()
    position fixed
    z-index popup-zindex
    .md-popup-box
      position absolute
      z-index 2
  .md-popup-box
    position fixed
    z-index popup-zindex
    max-width 100%
    max-height 100%
    overflow auto
    will-change auto
    background-color #FFF
    &.slide-up
      padding-bottom env(safe-area-inset-bottom)
  .md-popup-mask
    absolute-pos()
    position absolute
    z-index 1
    background #000
    opacity opacity-disabled
  &.center .md-popup-box
    absolute-pos(50%, auto, auto, 50%)
    transform translate(-50%, -50%)
  &.top, &.bottom, &.left, &.right
    .md-popup-box
      transition all .3s
  &.top, &.bottom
    .md-popup-box
      width 100%
  &.left, &.right
    .md-popup-box
      height 100%
  &.top .md-popup-box
    top 0
    left 0
  &.bottom .md-popup-box
    bottom 0
    left 0
  &.left .md-popup-box
    left 0
    top 0
  &.right .md-popup-box
    right 0
    top 0

  .fade-enter-active, .fade-leave-active
    transition opacity .3s
  .fade-enter, .fade-leave-to, .fade-leave-active
    opacity 0

  .slide-up-enter-active, .slide-up-leave-active, .slide-down-enter-active, .slide-down-leave-active, .bottom .show
    transform translateY(0)
  .slide-up-enter, .slide-up-leave-to
  /* Solve the problem of hiding to show
   * in the animation state of elements outside the viewport
   */
    transform translateY(70%)
  .slide-up-leave-active
    transform translateY(100%)

  .slide-down-enter, .slide-down-leave-to
    transform translateY(-70%)
  .slide-down-leave-active
    transform translateY(-100%)

  .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active
    transform translateX(0)
  .slide-left-enter, .slide-left-leave-to
    transform translateX(70%)
  .slide-left-leave-active
    transform translateX(100%)

  .slide-right-enter, .slide-right-leave-to
    transform translateX(-70%)
  .slide-right-leave-active
    transform translateX(-100%)
</style>
