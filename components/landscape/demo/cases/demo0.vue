<template>
  <div class="md-example-child md-example-child-landscape">
    <md-button @click="showPic=true">图片广告</md-button>
    <md-landscape v-model="showPic">
      <img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
    </md-landscape>

    <md-button @click.native="showMaskClosable=true">点击蒙层关闭</md-button>
    <md-landscape v-model="showMaskClosable" :mask-closable="true">
      <img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
    </md-landscape>

    <md-button @click="showFullScreen=true">全屏</md-button>
    <md-landscape v-model="showFullScreen" full-screen>
      <div class="full-screen-content">
        <h1>标题文案</h1>
        <p>
          1. 每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。 <br>
          2. 希望你可以记住我，记住我这样活过，这样在你身边待过。 <br>
          3. 少年时我们追求激情，成熟后却迷恋平庸。在我们寻找、伤害、背离之后，还能一如既往地相信爱情，这是一种勇气。 <br>
        </p>
      </div>
    </md-landscape>

    <md-button @click="showNoMask=true">无蒙层</md-button>
    <md-landscape v-model="showNoMask" :has-mask="false">
      <img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
    </md-landscape>

    <md-button @click="showScroll=true">滚动区域</md-button>
    <md-landscape v-model="showScroll" :scroll="true">
      <div class="scroll-area">
        <h1>滚动区域</h1>
        <p v-for="i in 20" :key="i">第{{i}}行</p>
      </div>
    </md-landscape>

    <md-button @click="showListen=true">监听事件</md-button>
    <md-landscape v-model="showListen" @show="alert('已弹出')" @hide="alert('已隐藏')">
      <img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
    </md-landscape>
  </div>
</template>

<script>import {Landscape, Toast, Button} from 'mand-mobile'

export default {
  name: 'landscape-demo',
  /* DELETE */
  height: 700,
  /* DELETE */
  components: {
    [Landscape.name]: Landscape,
    [Button.name]: Button,
  },
  data() {
    return {
      showPic: false,
      showNoMask: false,
      showFullScreen: false,
      showScroll: false,
      showListen: false,
      showMaskClosable: false,
    }
  },
  methods: {
    alert(msg) {
      Toast.succeed(msg)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-landscape
  .md-button
    margin-bottom 20px
  .landscape-content
    background #FFF
  .full-screen-content
    flex 1
    margin 0 72px
    h1
      padding 40px 0
      font-size 36px
      font-weight 400
      border-bottom solid 1px #f0f0f0
    p
      padding 20px
      font-size 26px
      font-weight 300
      color #666f83
      line-height 2
      text-align left
  .scroll-area
    padding 40px
    color #666
    h1
      margin-bottom 40px
    p
      margin 20px
</style>
