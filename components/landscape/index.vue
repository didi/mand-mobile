<template>
  <div class="md-landscape" :class="{'is-full': fullScreen}">
		<md-popup
      v-model="isLandscapeShow"
      :mask-closable="maskClosable"
      prevent-scroll
      prevent-scroll-exclude=".md-landscape-inner-scroll"
      :has-mask="!fullScreen && hasMask"
      :transition="fullScreen ? 'md-landscape' : 'md-punch'"
      :native-title-height="nativeTitleHeight"
      @input="$emit('input', false)"
      @show="$emit('show')"
      @hide="$emit('hide')"
      @maskClick="$emit(maskClickEventName)">
      <template v-if="fullScreen">
        <div class="md-landscape-body" :style="fullScreenWrapperStyle" :class="{scroll}">
          <div class="md-landscape-content-full-title">{{title}}</div>
          <div class="md-landscape-content-full-content md-landscape-inner-scroll">
            <slot name="content" v-if="$slots.content"></slot>
            <div v-else>{{content}}</div>
          </div>
          <md-icon
            size="md"
            class="md-landscape-close dark"
            @click="$_close"
            name="close-circle"
          />
        </div>
      </template>
      <template v-else>
        <div class="md-landscape-content">
          <div :class="['md-landscape-body', {'md-landscape-body-compact': compact, scroll}]">
            <div class="md-landscape-content-slot-header" v-if="!compact">
              <slot name="header" v-if="$slots.header"></slot>
              <img v-else-if="bannerSrc" :src="bannerSrc" alt="" width="100%">
              <div v-else class="md-landscape-title">{{title}}</div>
            </div>
            <div :class="[
              {'md-landscape-inner-scroll': !compact},
              'md-landscape-content-slot-content',
              {'content-compact': compact}]">
              <slot name="content" v-if="$slots.content"></slot>
              <div v-else>{{content}}</div>
            </div>
            <div class="md-landscape-content-slot-footer" v-if="!compact">
              <slot name="footer" v-if="$slots.footer"></slot>
              <div v-else class="md-landscape-content-footer-default">
                <md-button type="primary" size="large" round @click="$emit('confirm')">{{confirmText}}</md-button>
              </div>
            </div>
          </div>
          <md-icon
            v-if="closable"
            class="md-landscape-close"
            @click="$_close"
            name="close-circle"
          />
        </div>
      </template>
    </md-popup>
  </div>
</template>

<script>
import Popup from '../popup'
import Icon from '../icon'
import Button from '../button'
import fullScreenPatchUtil from './../../../business/fullscreen-patch-util';

export default {
  name: 'md-landscape',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Button.name]: Button
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
    // 是否全屏，全屏为白色，多数用在tips
    fullScreen: {
      type: Boolean,
      default: false,
    },
    // 是否有蒙层
    hasMask: {
      type: Boolean,
      default: true,
    },
    // 可否通过点击蒙层关闭
    maskClosable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    bannerSrc: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    // 是否有关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: false
    },
    closeIconClickEventName: {
      type: String,
      default: 'close-icon-click'
    },
    maskClickEventName: {
      type: String,
      default: 'mask-click'
    },
    nativeTitleHeight: {
      type: Number,
      default: 44
    }
  },

  data() {
    return {
      isLandscapeShow: this.value,
      nativeViewPatches: [],
      nativeTitle: null,
      fullScreenWrapperStyle: {}
    }
  },

  watch: {
    value(val) {
      this.isLandscapeShow = val;

      if (window.plus && this.fullScreen) {
        if (val) {
          const maskStyle = {backgroundColor: '#ffffff'};
          this.nativeViewPatches = fullScreenPatchUtil.createNativeViewPatches(maskStyle, this.nativeTitleHeight);
          this.nativeViewPatches.forEach(patch => {
            patch.show();
          });
          window.addEventListener('unload', () => {
            fullScreenPatchUtil.destoryNativeViewPatches(this.nativeViewPatches);
          });
        }
        else {
          fullScreenPatchUtil.destoryNativeViewPatches(this.nativeViewPatches);
        }
      }
    },
  },

  methods: {
    // MARK: private methods
    $_close(e) {
      this.$emit(this.closeIconClickEventName, e);
      this.isLandscapeShow = false;
    },
    close() {
      this.isLandscapeShow = false;
    },
    computeFullScreenWrapperStyle() {
      const padding = {
        top: 95,
        bottom: 70
      };
      if (window.plus && this.fullScreen) {
        const pageOffsetTop =
          fullScreenPatchUtil.getCurrentWebviewOffsetTop()
          + fullScreenPatchUtil.getCurrentWebviewTitleTop(false, this.nativeTitleHeight);

        if (!fullScreenPatchUtil.isNativeTitleDocking()) {
          padding.top -= pageOffsetTop;
        }

        const bottomHeight = parseInt(window.plus.webview.currentWebview().getStyle().bottom || 0, 10);
        padding.bottom -= bottomHeight;
      }

      this.fullScreenWrapperStyle = {
        'padding-top': padding.top + 'px',
        'padding-bottom': padding.bottom + 'px'
      };
    }
  },

  mounted() {
    this.computeFullScreenWrapperStyle();
    if (!window.plus) {
      document.addEventListener('plusready', this.computeFullScreenWrapperStyle, false);
    }
  },

  beforeDestroy() {
    document.removeEventListener('plusready', this.computeFullScreenWrapperStyle);
  }
}

</script>

<style lang="stylus">
@require "./../_style/mixin/util.styl"
@require "./../_style/mixin/theme.components.styl"
@require "./../_style/mixin/theme.basic.styl"
@require "./../../theme.custom.styl"
@require "./../_style/global.styl"
.md-landscape
  &.is-full
    .md-popup-box
      position absolute
      absolute-pos()
    .md-landscape-body
      color #333
      width 100%
      height 100%
      background landscape-fullscreen-bg
      box-sizing border-box
      padding 0 35px
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      .md-landscape-content-full-title
        font-size 20px
        font-weight bold
        padding-bottom 15px
        border-bottom 1px solid #898989
        margin-bottom 15px
        width 100%
      .md-landscape-content-full-content
        font-size 14px
        flex 1
        width 100%
        line-height normal
        margin-bottom 15px
        overflow-y auto
    .md-landscape-content
      width 100%
      height 100%
      overflow auto
      -webkit-overflow-scrolling touch

  .md-popup, .md-popup-box
    z-index landscape-zindex

  &:not(.is-full)
    .md-popup-box
      overflow visible
    .md-landscape-content
      width landscape-width
      position relative
      .md-landscape-body
        background #fff
        border-radius 12px
        overflow hidden
        &.md-landscape-body-compact
          background transparent
        .md-landscape-content-slot-header
          height 120px
          margin-bottom 20px
          .md-landscape-title
            height 48px
            line-height 48px
            font-size 20px
            font-weight bold
            text-align center
        .md-landscape-content-slot-content
          height 167px
          font-size 13px
          color #333
          margin 0 20px
          line-height 22px
          overflow-y auto
          -webkit-overflow-scrolling touch
          &.content-compact
            margin 0
            height 395px
            overflow hidden
        .md-landscape-content-slot-footer
          .md-landscape-content-footer-default
            width 200px
            margin 20px auto
      .md-icon.md-landscape-close
        position absolute
        right 0
        top -50px
        width 30px
        height 30px
        font-size 30px
</style>
