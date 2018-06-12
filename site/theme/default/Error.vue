<template>
  <div class="mfe-blog-theme-default-error">
    <div class="error-box">
      <img src="//manhattan.didistatic.com/static/manhattan/mfd/result-page/lost" alt="">
      <div class="error-box-text">
        <h1>404</h1>
        <p>
          {{ lang === 'zh-CN' ? '抱歉，您访问的页面丢失...了' : 'Sorry, the page you visited is lost...'}}
        </p>
        <router-link to="/">
          {{ lang === 'zh-CN' ? '返回首页' : 'Go Home'}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    }
  }
}

</script>

<style lang="stylus">
.mfe-blog-theme-default-error
  display flex
  justify-content center
  .error-box
    position relative
    margin-top 10%
    &:after
      content ""
      clearfix both
      display table
    img
      float left
    .error-box-text
      float right
      margin-top 20px
      margin-left 35px
      h1
        font-size 48px
      p
        font-size 20px
      a
        float left
        min-width 110px
        height 40px
        margin-top 30px
        margin-right 15px
        border-radius 20px
        border solid 1px #3ca0e6
        line-height 40px
        text-align center
        color #3ca0e6
        text-decoration none
        transition all .3s
        &:hover
          box-shadow 0 4px 8px RGBA(60, 160, 230, .5)
        &:first-of-type
          background #fc9153
          border solid 1px #fc9153
          color #fff
          &:hover
            box-shadow 0 4px 8px RGBA(252, 145, 83, .5)
</style>