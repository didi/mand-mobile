<template>
  <div
    v-show="isPopupShow"
    class="md-popup"
    :class="[
      hasMask ? 'with-mask' : '',
      position
    ]"
  >
    <transition name="md-mask-fade">
      <div
        v-show="hasMask && isPopupBoxShow"
        @click="$_onPopupMaskClick"
        class="md-popup-mask"
      ></div>
    </transition>
    <md-transition
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
    </md-transition>
  </div>
</template>

<script>import Transition from '../transition'

export default {
  name: 'md-popup',

  components: {
    'md-transition': Transition,
  },

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
            return 'md-slide-up'
          /* istanbul ignore next */
          case 'top':
            return 'md-slide-down'
          /* istanbul ignore next */
          case 'left':
            return 'md-slide-right'
          /* istanbul ignore next */
          case 'right':
            return 'md-slide-left'
          default:
            return 'md-fade' // fade/fade-bounce/fade-slide/fade-zoom
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
        setTimeout(() => {
          this.$_hidePopupBox()
        }, 0)
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
      if (this.maskClosable) {
        this.$_hidePopupBox()
        this.$emit('maskClick')
      }
    },
  },
}
</script>

<style lang="stylus">
.md-popup
  absolute-pos()
  position fixed
  display flex
  pointer-events none
  z-index popup-zindex

  &.center
    align-items center
    justify-content center

  &.top
    flex-direction column
    justify-content flex-start
    .md-popup-box
      width 100%

  &.bottom
    flex-direction column
    justify-content flex-end
    .md-popup-box
      width 100%

  &.left
    justify-content flex-start
    .md-popup-box
      height 100%

  &.right
    justify-content flex-end
    .md-popup-box
      height 100%

.md-popup-mask
  absolute-pos()
  position absolute
  pointer-events auto
  z-index 1
  background-color popup-mask-bg

.md-popup-box
  position relative
  pointer-events auto
  z-index 2
  max-width 100%
  max-height 100%
  overflow auto

.md-mask-fade
  &-enter, &-leave-to
    opacity 0.01
  &-enter-active, &-leave-active
    transition opacity 250ms
</style>
