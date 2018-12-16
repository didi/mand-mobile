<template>
  <div class="mfe-blog-theme-default-notice-bar">
    <template v-if="lang === 'zh-CN'">
      🎉 全新的视觉规范，丰富的金融类组件，<span>Mand Mobile 2.0</span>，<a href="https://mand-mobile.github.io/2x-doc">前往体验 👉</a>
    </template>
    <template v-else>
      🎉 New visual specification, rich financial components, <span>Mand Mobile 2.0</span>, <a href="https://mand-mobile.github.io/2x-doc">go to experience 👉</a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'mfe-blog-theme-default-notice-bar',
  props: {
    lang: {
      type: String
    }
  }
}
</script>

<style lang="stylus">
.mfe-blog-theme-default-notice-bar
  padding 10px 0
  background linear-gradient(to right, #2F86F6, #00deee)
  color #FFF
  font-size 13px
  text-align center
  span
    font-family DINAlternate-Bold, AvenirNext-Medium, "Microsoft Yahei", "Lato", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Verdana, Tahoma, sans-serif
  a
    color #FFF
</style>
