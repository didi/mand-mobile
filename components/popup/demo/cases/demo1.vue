<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-2">
    <md-button @click="showPopUp('top')">无遮罩层</md-button>
    <md-popup
      v-model="isPopupShow.top"
      :hasMask="false"
      position="top"
    >
      <div class="md-example-popup md-example-popup-top">
        Popup Top
        <md-icon
          name="close"
          @click.native="hidePopUp('top')"
        ></md-icon>
      </div>
    </md-popup>

    <md-button @click="showPopUp('mask')">禁用遮罩层点击</md-button>
    <md-popup
      v-model="isPopupShow.mask"
      position="bottom"
      :mask-closable="false"
    >
      <md-popup-title-bar
        only-close
        large-radius
        @confirm="hidePopUp('mask')"
        @cancel="hidePopUp('mask')"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        <p>Recording</p>
        <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
        <svg width="55" height="80" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg" fill="#2f86f6">
          <g transform="matrix(1 0 0 -1 0 80)">
            <rect width="10" height="20" rx="3">
              <animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite" />
            </rect>
            <rect x="15" width="10" height="80" rx="3">
              <animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite" />
            </rect>
            <rect x="30" width="10" height="50" rx="3">
              <animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite" />
            </rect>
            <rect x="45" width="10" height="30" rx="3">
              <animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      </div>
    </md-popup>
  </div>
</template>

<script>import {Popup, PopupTitleBar, Button, Icon} from 'mand-mobile'

export default {
  name: 'popup-demo',
  /* DELETE */
  title: '其他配置',
  titleEnUS: 'Other configurations',
  /* DELETE */
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  data() {
    return {
      isPopupShow: {},
    }
  },
  methods: {
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true)
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-popup-2
  float left
  width 100%
  .md-button
    margin-bottom 20px
  .md-popup-title-bar
    .md-popup-cancel
      .md-icon
        align-self flex-start
        margin-left 32px
  .md-example-popup
    position relative
    font-size font-minor-large
    background color-bg-base
    box-sizing border-box
    text-align center
    background-color #FFF
  .md-example-popup-center
    padding 50px
    border-radius radius-normal
  .md-example-popup-top
    width 100%
    height 75px
    line-height 75px
    background #4a4c5b
    color #fff
    .md-icon
      position absolute
      right 20px
      top 50%
      transform translateY(-50%)
  .md-example-popup-bottom
    width 100%
    padding 0 0 150px
    p
      margin-bottom 100px
      font-size 64px
      font-weight 200
      color #999
  .md-example-popup-left, .md-example-popup-right
    height 100%
    padding 0 150px
    display flex
    align-items center
</style>
