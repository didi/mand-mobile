<template>
  <div class="md-example-child md-example-child-landscape">
    <md-button @click="showPic=true">图片广告</md-button>
      <md-landscape v-model="showPic">
        <img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
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
  title: '示例',
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
      showScroll: false,
      showListen: false,
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
  .content
    background #f
  .scroll-area
    padding 40px
    color #6
    h1
      margin-bottom 40px
    p
      margin 20px
</style>
