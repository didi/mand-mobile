<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-0">
    <md-button @click="showPopUp('center')">屏幕中弹出</md-button>
    <md-popup v-model="isPopupShow.center">
      <div class="md-example-popup md-example-popup-center">
        Popup Center
      </div>
    </md-popup>

    <md-button @click="showPopUp('bottom')">底部弹出</md-button>
    <md-popup
      v-model="isPopupShow.bottom"
      position="bottom"
    >
      <md-popup-title-bar
        title="Popup Title"
        ok-text="ok"
        cancel-text="cancel"
        @confirm="hidePopUp('bottom')"
        @cancel="hidePopUp('bottom')"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        Popup Bottom
      </div>
    </md-popup>

    <md-button @click="showPopUp('top')">顶部弹出</md-button>
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

    <md-button @click="showPopUp('left')">左侧弹出</md-button>
    <md-popup
      v-model="isPopupShow.left"
      position="left"
    >
      <div class="md-example-popup md-example-popup-left">
        Popup Left
      </div>
    </md-popup>

    <md-button @click="showPopUp('right')">右侧弹出</md-button>
    <md-popup
      v-model="isPopupShow.right"
      position="right"
    >
      <div class="md-example-popup md-example-popup-right">
        Popup Right
      </div>
    </md-popup>
  </div>
</template>

<script>
import {Popup, PopupTitleBar, Button, Icon} from 'mand-mobile'

export default {
  name: 'popup-demo',
  /* DELETE */
  title: '不同位置弹出',
  height: 500,
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
.md-example-child-popup-0
  float left
  width 100%
  .md-button
    margin-bottom 20px
  .md-example-popup
    position relative
    font-size font-minor-large
    background color-bg-base
    box-sizing border-box
    text-align center
  .md-example-popup-center
    padding 50px
    border-radius radius-normal
  .md-example-popup-top
    width 100%
    height 75px
    line-height 75px
    background notice-bar-fill
    color notice-bar-color
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
  .md-popup-box
    background-color #FFF
</style>
