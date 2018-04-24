<template>
  <div class="md-result-page">
    <img :src="actualImgUrl" :class="!imgUrl && type"/>
    <div class="text">{{actualText}}</div>
    <div class="subtext" v-if="subtext">{{subtext}}</div>
    <div class="buttons" v-if="buttons.length">
      <md-button
        :type="button.type || 'ghost'"
        v-for="(button, index) of buttons"
        :key="index"
        @click="button.handler">
        {{button.text}}
      </md-button>
    </div>
  </div>
</template>

<script>import Button from '../button'

export default {
  name: 'md-result-page',

  components: {
    [Button.name]: Button,
  },

  props: {
    type: {
      type: String,
      default: 'empty',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data() {
    const pre = '//manhattan.didistatic.com/static/manhattan/mfd/result-page/'
    const data = {
      actualImgUrl: this.imgUrl || `${pre}${this.type}`,
      actualText:
        this.text ||
        {
          // 您要访问的页面已丢失
          lost: '\u60a8\u8981\u8bbf\u95ee\u7684\u9875\u9762\u5df2\u4e22\u5931',
          // 网络连接异常
          network: '\u7f51\u7edc\u8fde\u63a5\u5f02\u5e38',
          // 暂无信息
          empty: '\u6682\u65e0\u4fe1\u606f',
        }[this.type],
    }
    return data
  },
}
</script>

<style lang="stylus">
.md-result-page
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%
  color color-text-base
  text-align center

  >img
    width 220px
    margin 20px
    &.lost
      height 241.9px
    &.network
      height 253.7px
    &.empty
      height 205.7px

  .text
    margin 10px
    font-size 30px

  .subtext
    color color-text-caption
    font-size 26px

  .buttons
    display flex
    .md-button
      margin 10px
</style>
