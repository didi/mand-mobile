<template>
  <div class="md-landscape" :class="{'is-full': fullScreen}">
		<md-popup
      v-model="isLandscapeShow"
      :mask-closable="maskClosable"
      prevent-scroll
      prevent-scroll-exclude=".md-landscape-content-slot-content"
      :has-mask="!fullScreen && hasMask"
      :transition="fullScreen ? 'md-landscape' : 'md-punch'"
      @input="$emit('input', false)"
      @show="$emit('show')"
      @hide="$emit('hide')">
      <template v-if="fullScreen">
        <div class="md-landscape-body" :style="fullScreenWrapperStyle" :class="{scroll}">
          <div class="md-landscape-content-full-title">{{title}}</div>
          <div class="md-landscape-content-full-content">
            <slot name="content"></slot>
            <div>{{content}}</div>
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
          <div class="md-landscape-body" :class="{scroll}">
            <div class="md-landscape-content-slot-header">
              <slot name="header"></slot>
            </div>
            <div class="md-landscape-content-slot-content">
              <slot name="content"></slot>
            </div>
            <div class="md-landscape-content-slot-footer">
              <slot name="footer"></slot>
            </div>
          </div>
          <md-icon
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
import util from './../../../../util';

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
    fullScreen: {
      type: Boolean,
      default: false,
    },
    appMaskFullScreen: {
      type: Boolean,
      default: true
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
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
    }
  },

  data() {
    return {
      isLandscapeShow: this.value,
    }
  },

  watch: {
    value(val) {
      this.isLandscapeShow = val;

      if (window.plus) {
        if (val) {
          const patches = util.createNativeViewPatches();
          patches.forEach(patch => {
            if (this.fullScreen) {
              patch.setStyle({backgroundColor: '#ffffff'});
            }
            else {
              patch.setStyle({backgroundColor: '#000000', opacity: 0.8});
            }
            patch.show();
          });
        }
        else {
          util.destoryNativeViewPatches();
        }
      }
    },
  },

  computed: {
    fullScreenWrapperStyle() {
      const padding = {
        top: 95,
        bottom: 70
      };
      if (window.plus && this.fullScreen) {
        const statusBarHeight = parseInt(window.plus.navigator.getStatusbarHeight(), 10);
        const titleNViewStyle = window.plus.webview.currentWebview().getStyle().titleNView;
        let titleNViewHeight = parseInt(titleNViewStyle.height || 0, 10);
        if (titleNViewStyle.splitLine && titleNViewStyle.splitLine.height) {
          titleNViewHeight += parseInt(titleNViewStyle.splitLine.height, 10);
        }
        padding.top -= (statusBarHeight + titleNViewHeight);

        const bottomHeight = parseInt(window.plus.webview.currentWebview().getStyle().bottom || 0, 10);
        padding.bottom -= bottomHeight;
      }

      return {
        'padding-top': padding.top + 'px',
        'padding-bottom': padding.bottom + 'px'
      };
    }
  },

  methods: {
    // MARK: private methods
    $_close() {
      this.isLandscapeShow = false
    }
  },
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
        .md-landscape-content-slot-header
          margin-bottom 20px
        .md-landscape-content-slot-content
          height 166px
          font-size 13px
          color #333
          line-height 22px
          margin 0 10px
          padding 0 10px
          overflow-y auto
          -webkit-overflow-scrolling touch
      .md-icon.md-landscape-close
        position absolute
        right 0
        top -50px
        width 30px
        height 30px
        font-size 30px
</style>
