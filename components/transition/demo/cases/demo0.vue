<template>
  <div class="md-example-child md-example-child-transition md-example-child-transition-1">
    <md-button @click="showPopUp(0)">Fade</md-button>
    <md-popup
      v-model="isPopupShow[0]"
      transition="md-fade"
    >
      <div class="md-example-popup md-example-popup-center">
        Fade
      </div>
    </md-popup>

    <md-button @click="showPopUp(1)">Fade Up</md-button>
    <md-popup
      v-model="isPopupShow[1]"
      transition="md-fade-up"
    >
      <div class="md-example-popup md-example-popup-center">
        Fade Up
      </div>
    </md-popup>

    <md-button @click="showPopUp(2)">Fade Down</md-button>
    <md-popup
      v-model="isPopupShow[2]"
      transition="md-fade-down"
    >
      <div class="md-example-popup md-example-popup-center">
        Fade Down
      </div>
    </md-popup>

    <md-button @click="showPopUp(3)">Fade Left</md-button>
    <md-popup
      v-model="isPopupShow[3]"
      transition="md-fade-left"
    >
      <div class="md-example-popup md-example-popup-center">
        Fade Left
      </div>
    </md-popup>

    <md-button @click="showPopUp(4)">Fade Right</md-button>
    <md-popup
      v-model="isPopupShow[4]"
      transition="md-fade-right"
    >
      <div class="md-example-popup md-example-popup-center">
        Fade Right
      </div>
    </md-popup>

    <md-button @click="showPopUp(5)">Bounce</md-button>
    <md-popup
      v-model="isPopupShow[5]"
      transition="md-bounce"
    >
      <div class="md-example-popup md-example-popup-center">
        Bounce
      </div>
    </md-popup>

    <md-button @click="showPopUp(6)">Punch</md-button>
    <md-popup
      v-model="isPopupShow[6]"
      transition="md-punch"
    >
      <div class="md-example-popup md-example-popup-center">
        Punch
      </div>
    </md-popup>

    <md-button @click="showPopUp(7)">Zoom</md-button>
    <md-popup
      v-model="isPopupShow[7]"
      transition="md-zoom"
    >
      <div class="md-example-popup md-example-popup-center">
        Zoom
      </div>
    </md-popup>

    <md-button @click="showPopUp(8)">Slide Up</md-button>
    <md-popup
      v-model="isPopupShow[8]"
      transition="md-slide-up"
    >
      <div class="md-example-popup md-example-popup-center">
        Slide Up
      </div>
    </md-popup>

    <md-button @click="showPopUp(9)">Slide Down</md-button>
    <md-popup
      v-model="isPopupShow[9]"
      transition="md-slide-down"
    >
      <div class="md-example-popup md-example-popup-center">
        Slide Down
      </div>
    </md-popup>

    <md-button @click="showPopUp(10)">Slide Left</md-button>
    <md-popup
      v-model="isPopupShow[10]"
      transition="md-slide-left"
    >
      <div class="md-example-popup md-example-popup-center">
        Slide Left
      </div>
    </md-popup>

    <md-button @click="showPopUp(11)">Slide Right</md-button>
    <md-popup
      v-model="isPopupShow[11]"
      transition="md-slide-right"
    >
      <div class="md-example-popup md-example-popup-center">
        Slide Right
      </div>
    </md-popup>
  </div>
</template>

<script>import {Popup, Button} from 'mand-mobile'

export default {
  name: 'transition-demo',
  /* DELETE */
  title: '动画',
  titleEnUS: 'Transition',
  /* DELETE */
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
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
.md-example-child-transition-1
  float left
  width 100%
  .md-button
    margin-bottom 20px
  .md-example-popup
    position relative
    font-size 28px
    font-family DINAlternate-Bold
    font-weight 500
    box-sizing border-box
    text-align center
    background-color #FFF
  .md-example-popup-center
    padding 50px
    border-radius radius-normal
</style>
