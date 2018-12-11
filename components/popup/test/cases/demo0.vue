<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-0">
    <md-popup value>
      <div class="md-example-popup md-example-popup-center">
        Popup Center
      </div>
    </md-popup>

]   <md-popup value position="bottom">
      <md-popup-title-bar
        title="Popup Title"
        describe="Popup Description"
        ok-text="ok"
        cancel-text="cancel"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        Popup Bottom
      </div>
    </md-popup>

    <md-popup
      value
      :hasMask="false"
      position="top"
    >
      <div class="md-example-popup md-example-popup-top">
        Popup Top
        <md-icon
          name="close"
        ></md-icon>
      </div>
    </md-popup>

    <md-popup
      value
      position="left"
    >
      <div class="md-example-popup md-example-popup-left">
        Popup Left
      </div>
    </md-popup>

    <md-popup
      value
      position="right"
    >
      <div class="md-example-popup md-example-popup-right">
        Popup Right
      </div>
    </md-popup>
  </div>
</template>

<script>import {Popup, PopupTitleBar} from 'mand-mobile'

export default {
  name: 'popup-demo',
  components: {
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
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
    font-size 28px
    font-family DINPro
    font-weight 500
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
    padding 100px 0
    p
      line-height 50px
  .md-example-popup-left, .md-example-popup-right
    height 100%
    padding 0 150px
    display flex
    align-items center
</style>
