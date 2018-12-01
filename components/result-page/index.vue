<template>
  <div class="md-result">
    <div class="md-result-image">
      <img :src="actualImgUrl" :class="!imgUrl && type"/>
    </div>
    <div class="md-result-text" v-if="actualText">{{actualText}}</div>
    <div class="md-result-subtext" v-if="actualSubText">{{actualSubText}}</div>
    <div class="md-result-buttons" v-if="buttons.length">
      <md-button
        v-for="(button, index) of buttons"
        :type="button.type"
        plain
        inline
        size="small"
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
    const pre = '//manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.0/'
    const data = {
      actualImgUrl: this.imgUrl || `${pre}${this.type}.png`,
      actualText:
        this.text ||
        {
          // 网络连接异常
          network: '\u7f51\u7edc\u8fde\u63a5\u5f02\u5e38',
          // 暂无信息
          empty: '\u6682\u65e0\u4fe1\u606f',
        }[this.type] ||
        '',
      actualSubText:
        this.subtext ||
        {
          // 您要访问的页面已丢失
          lost: '\u60a8\u8981\u8bbf\u95ee\u7684\u9875\u9762\u5df2\u4e22\u5931',
        }[this.type] ||
        '',
    }
    return data
  },
}
</script>

<style lang="stylus">
.md-result
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%
  text-align center

.md-result-image
  width result-page-image-size
  img
    width 100%
    margin-bottom 40px

.md-result-text
  margin 20px 20px 0
  color result-page-title-color
  font-size result-page-title-font-size

.md-result-subtext
  margin-top 16px
  color result-page-describe-color
  font-size result-page-describe-font-size

.md-result-buttons
  display flex
  .md-button
    margin 10px
</style>
