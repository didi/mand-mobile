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
        :plain="button.plain === undefined || button.plain"
        :round="button.round"
        :inactive="button.inactive"
        :loading="button.loading"
        :icon="button.icon"
        :icon-svg="button.iconSvg"
        size="small"
        inline
        :key="index"
        @click="button.handler">
        {{button.text}}
      </md-button>
    </div>
  </div>
</template>

<script>import {t} from '../_locale'
import Button from '../button'

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

  computed: {
    actualImgUrl() {
      const pre = '//manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.1/'
      return this.imgUrl || `${pre}${this.type}.png`
    },
    actualText() {
      return (
        this.text ||
        {
          // 网络连接异常
          network: t('md.result_page.networkError'),
          // 暂无信息
          empty: t('md.result_page.noInformation'),
        }[this.type] ||
        ''
      )
    },
    actualSubText() {
      return (
        this.subtext ||
        {
          // 您要访问的页面已丢失
          lost: t('md.result_page.lostWay'),
        }[this.type] ||
        ''
      )
    },
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
