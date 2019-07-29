<template>
  <div class="mfe-blog-theme-default-footer">
    <div class="default-footer-container">
      <!-- <ul class="default-footer-category">
        <h1>
          <img src="//manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-white.svg" alt="">
          <br>
          <span>Mand Mobile</span>
        </h1>
      </ul> -->
      <ul
        class="default-footer-category"
        v-for="(items, i) in list"
        :key="i">
        <h1 v-html="items.title"></h1>
        <li
          v-for="(link, j) in items.link"
          :key="j">
          <a :href="link.src" v-html="link.text" v-if="link.src"></a>
          <p v-html="link.text" v-else></p>
        </li>
      </ul>
    </div>
    <div class="default-footer-copyright" v-if="copyRight">
      <div class="default-footer-copyright-container">
        Copyright &copy; <span v-html="copyRight"></span>
      </div>
    </div>
    <div class="default-footer-bg">
      <img src="//manhattan.didistatic.com/static/manhattan/mand/docs/mand-doc-footer-bg.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'mfe-blog-theme-default-footer',

  data() {
    return {
      links: window.mbConfig.links,
      copyRight: window.mbConfig.copyRight,
      powerBy: window.mbConfig.powerBy,
      produceBy: window.mbConfig.produceBy,
    }
  },

  computed: {
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    },
    list() {
      return this.links[this.lang]
    }
  }
}

</script>

<style lang="stylus">
.mfe-blog-theme-default-footer
  position relative
  height 673px
  -webkit-font-smoothing antialiased
  &.stricky
    .default-footer-container, .default-footer-copyright-container
      left 16.6%

  .default-footer-bg
    position absolute
    top 0
    bottom 0
    left -2000px
    overflow hidden
    img
      position relative
      top -300px
      height 250%
  .default-footer-copyright
    position absolute
    left 0
    bottom 0
    z-index 2
    width 100%
    height 100px
    line-height 100px
    color rgba(255, 255, 255, .7)
    border solid 1px rgba(255, 255, 255, .3)

  .default-footer-container
    position relative
    z-index 2
    width 1280px
    margin 0 auto
    padding-top 250px
    box-sizing border-box
    clearfix()
  .default-footer-copyright-container
    position relative
    width 1280px
    margin 0 auto

  .default-footer-category
    float left
    width 18%
    color #FFF
    box-sizing border-box
    h1
      float left
      width 100%
      margin-bottom 20px
      font-size 18px
      font-family AvenirNext-Medium, "Microsoft Yahei", "Lato", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Verdana, Tahoma, sans-serif !important
      font-weight 600
      span
        font-family DINAlternate-Bold
    li
      float left
      width 100%
      margin-bottom 10px
      font-size 14px
      p
        float left
      i
        float left
        margin-top 5px
        margin-right 10px
      a
        color #FFF
        text-decoration none
        transition color .3s
        -webkit-font-smoothing initial
        &:hover
          color #DDD
      span
        opacity .6
        color #FFF
        font-size 12px

@media (max-width: 1400px)
  .default-footer-container, .default-footer-copyright-container
    width 900px !important
@media (max-width: 850px)
  .mfe-blog-theme-default-footer
    display block
    height auto !important
    padding .32rem 5% .32rem
    background #007CFA
    .default-footer-container
      width 100% !important
      padding .32rem
    .default-footer-bg
      display none
    .default-footer-category
      display block
      width 50%
      margin 0 0 .2rem
      h1
        margin-bottom .2rem
        font-size 16px
        a
          display none
      li
        margin-bottom .12rem
        font-size 13px
      &:first-child
        display none
    .default-footer-copyright
      display none
</style>
