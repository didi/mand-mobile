<template>
  <div
    v-show="isPopupShow"
    class="md-popup"
    :class="[
      hasMask ? 'with-mask' : '',
      position
    ]"
  >
    <!--<transition name="md-mask-fade" v-if="transition !== 'none'">-->
      <!--<div-->
        <!--v-show="hasMask && isPopupBoxShow"-->
        <!--@click="$_onPopupMaskClick"-->
        <!--class="md-popup-mask"-->
      <!--&gt;</div>-->
    <!--</transition>-->
    <div
      v-show="hasMask && isPopupBoxShow"
      @click="$_onPopupMaskClick"
      class="md-popup-mask"
    ></div>
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

<script>
import Transition from '../transition'
import popupMixin from './mixins'
import fullScreenPatchUtil from './../../../business/fullscreen-patch-util';

export default {
  name: 'md-popup',

  mixins: [popupMixin],

  components: {
    'md-transition': Transition,
  },

  props: {
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
      type: [String, Function],
      default() {
        return ''
      },
    },
    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // hasMask: {
    //   type: Boolean,
    //   default: true,
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
  },

  data() {
    return {
      // controle popup mask & popup box
      isPopupShow: false,
      // controle popup box
      isPopupBoxShow: false,
      // transtion lock
      isAnimation: false,

      excluder: {},
      touchStartY: 0,
      nativeViewPatches: []
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
        }
        else {
          this.$_showPopupBox()
        }
      }
      else {
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
      this.isPopupBoxShow = true
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'test') {
        this.$_onPopupTransitionStart()
        this.$_onPopupTransitionEnd()
      }

      this.preventScroll && this.$_preventScroll(true)

      if (window.plus && this.hasMask) {
        const maskStyle = {backgroundColor: '#000000', opacity: 0.8};
        this.nativeViewPatches = fullScreenPatchUtil.createNativeViewPatches(maskStyle);
        this.nativeViewPatches.forEach(patch => {
          patch.show();
          window.addEventListener('unload', () => {
            patch.close();
          });
        });
      }
    },
    $_hidePopupBox() {
      this.isAnimation = true
      this.isPopupBoxShow = false
      this.preventScroll && this.$_preventScroll(false)
      this.$emit('input', false)
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'test') {
        this.$_onPopupTransitionStart()
        this.$_onPopupTransitionEnd()
      }

      if (window.plus && this.hasMask) {
        fullScreenPatchUtil.destoryNativeViewPatches(this.nativeViewPatches);
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
          : preventScrollExclude;
      this.excluder = excluder;
      excluder && excluder[handler]('touchstart', this.$_recordTouchStart, false);
      excluder && excluder[handler]('touchmove', this.$_scollSelfButPreventOthers, false);
    },
    $_preventDefault(event) {
      event.preventDefault()
    },
    $_scollSelfButPreventOthers(event) {
      let canMove = true;
      const touch = event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : {};
      const target = this.excluder;
      const moveY = touch.clientY - this.touchStartY;

      if (target.scrollTop === 0 && moveY > 0) {
        canMove = false;
      }

      if (target.scrollTop - target.clientTop + target.clientHeight === target.scrollHeight && moveY < 0) {
        canMove = false;
      }

      if (!canMove) {
        event.preventDefault();
        return;
      }

      /* istanbul ignore next */
      event.stopImmediatePropagation()
    },
    $_recordTouchStart(event) {
      const touch = event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : {};
      this.touchStartY = touch.clientY;
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
@require "./../_style/mixin/util.styl"
@require "./../_style/mixin/theme.components.styl"
@require "./../_style/mixin/theme.basic.styl"
@require "./../../theme.custom.styl"
@require "./../_style/global.styl"
.md-popup
  absolute-pos()
  position fixed
  display flex
  pointer-events none
  z-index popup-zindex
  top -1px
  bottom -1px

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

  &.inner-popup .md-popup-box
    background-color color-bg-inverse
    border-radius popup-title-bar-radius popup-title-bar-radius 0 0

.md-popup-mask
  absolute-pos()
  position absolute
  pointer-events auto
  z-index 1
  background-color rgba(0, 0, 0, .8)

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
