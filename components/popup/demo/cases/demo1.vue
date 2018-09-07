<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-1">
    <md-button @click="showPopUp(0)">Fade Bounce</md-button>
    <md-popup
      v-model="isPopupShow[0]"
      transition="fade-bounce"
    >
      <div class="md-example-popup md-example-popup-center">
        Popup Center
      </div>
    </md-popup>

    <md-button @click="showPopUp(1)">Fade Slide</md-button>
    <md-popup
      v-model="isPopupShow[1]"
      transition="fade-slide"
    >
      <div class="md-example-popup md-example-popup-center">
        Popup Center
      </div>
    </md-popup>

    <md-button @click="showPopUp(2)">Fade Zoom</md-button>
    <md-popup
      v-model="isPopupShow[2]"
      transition="fade-zoom"
    >
      <div class="md-example-popup md-example-popup-center">
        Popup Center
      </div>
    </md-popup>
  </div>
</template>

<script>import {Popup, PopupTitleBar, Button, Icon} from 'mand-mobile'

export default {
  name: 'popup-demo',
  /* DELETE */
  title: '动画',
  titleEnUS: 'Transition',
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
      isPopupShow: [],
    }
  },
  methods: {
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-popup-1
  float left
  width 100%
  .md-button
    margin-bottom 20px
  .md-example-popup
    position relative
    font-size 28px
    font-family DINPro
    font-weight 500
    box-sizing border-box
    text-align center
    background-color #FFF
  .md-example-popup-center
    padding 50px
    border-radius radius-normal
</style>
