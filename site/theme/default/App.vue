<template>
  <div class="mfe-blog-theme-default default-container" :class="{'is-home': isHome}">
    <mb-header :is-active="isHome"/>
    <div class="default-content">
      <mb-menu v-if="!noMenu"/>
      <div class="default-content-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <mb-footer/>
  </div>
</template>

<script>
import './assets/js/responsive'
import './assets/css/global.styl'
import './assets/css/markdown.styl'
import './assets/css/toc.styl'
import './assets/css/demo.styl'
import './assets/css/hightlight.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'

export default {
  name: 'mfe-blog-theme-default',

  components: {
    MbHeader: Header,
    MbMenu: Menu,
    MbFooter: Footer,
  },

  data() {
    return {}
  },

  computed: {
    noMenu() {
      return this.$route.meta.noMenu
    },
    isHome() {
      return this.$route.path === '/home'
    }
  },

  mouted () {
    document.documentElement.style.fontSize = 540 * 0.13333333333333333 + 'px';
  }
}

</script>

<style lang="stylus">
.mfe-blog-theme-default
  line-height 1.5
  color #314659
  font-size 14px
  font-family Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif
  &.is-home   
    .default-content
      padding 0
      .default-content-wrapper
        overflow visible   
  .default-content
    min-height 1500px
    padding 32px 0
    &:after
      content ""
      clear both
      display table
    .default-content-wrapper
      position relative
      left -1px
      overflow hidden

@media (max-width: 1000px)
  .default-content
    min-height auto !important
    .default-content-wrapper
      float left
      width 100%
      margin-top 50px
      .default-doc-content
        padding 0 42px 87px !important
</style>

