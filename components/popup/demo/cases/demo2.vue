<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-2" style="height: 1000px;">
    <md-button @click="showPopUp('top')">无遮罩层</md-button>
    <md-popup
      v-model="isPopupShow.top"
      :hasMask="false"
      position="top"
    >
      <div class="md-example-popup md-example-popup-top">
        Popup Top
        <md-icon
          name="cross"
          @click.native="hidePopUp('top')"
        ></md-icon>
      </div>
    </md-popup>

    <md-button @click="showPopUp('scroll')">防止滚动穿透</md-button>
    <md-popup
      v-model="isPopupShow.scroll"
      position="bottom"
      prevent-scroll
      prevent-scroll-exclude=".md-example-popup-bottom"
    >
      <md-popup-title-bar
        title="Prevent Scroll"
        @confirm="hidePopUp('scroll')"
        @cancel="hidePopUp('scroll')"
      >
        <md-icon
          name="cross"
          size="lg"
          slot="cancel"
        ></md-icon>
      </md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom" style="height: 200px;overflow:auto">
        <p v-for="n in 50" :key="n">Popup Bottom {{ n }}</p>
      </div>
    </md-popup>

    <md-button @click="showPopUp('mask')">禁用遮罩层点击</md-button>
    <md-popup
      v-model="isPopupShow.mask"
      position="bottom"
      :mask-closable="false"
    >
      <md-popup-title-bar
        title="Prevent Mask Click"
        ok-text="ok"
        cancel-text="cancel"
        @confirm="hidePopUp('mask')"
        @cancel="hidePopUp('mask')"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        Popup Bottom
      </div>
    </md-popup>
  </div>
</template>

<script>import {Popup, PopupTitleBar, Button, Icon} from 'mand-mobile'

export default {
  name: 'popup-demo',
  /* DELETE */
  title: '其他配置',
  titleEnUS: 'Other configuration',
  message: '防止滚动击穿请在移动设备中扫码预览',
  messageEnUS: 'Preventing rolling breakdown should be previewed on mobile device',
  height: 750,
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
    padding: 50px 0
    p
      line-height 50px
  .md-example-popup-left, .md-example-popup-right
    height 100%
    padding 0 150px
    display flex
    align-items center
</style>
