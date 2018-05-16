<template>
  <div class="mfe-blog-theme-default default-container" :class="{'is-home': isHome}">
    <mb-header :is-active="isHome"/>
    <div class="default-content">
      <mb-menu v-if="!noMenu" v-model="isMenuShow"/>
      <div class="default-content-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <div class="default-menu-trigger" v-if="!noMenu" @click="isMenuShow = !isMenuShow">
      <i class="icon-catalog"></i>
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
import './assets/css/tooltip.css'
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
    return {
      isMenuShow: false,
    }
  },
  watch: {
    '$route': {
      handler () {
        this.isMenuShow = false
      },
      deep: true
    },
  },
  computed: {
    noMenu() {
      return this.$route.meta.noMenu
    },
    isHome() {
      return !!~this.$route.path.indexOf('/home')
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
  .default-menu-trigger
    position fixed
    bottom 20px
    right 20px
    z-index 99999
    display none
    align-items center
    justify-content center
    width 50px
    height 50px
    text-align center
    border-radius 50%
    background #FFF
    box-shadow 0 0 10px #f0f0f0
    border solid 1px #f0f0f0
    i
      color #048efa
      font-size 24px

@media (max-width: 1000px)
  .default-content
    min-height auto !important
    padding 0 !important
    .default-content-wrapper
      float left
      width 100%
      .default-doc-content
        padding 0 42px 87px !important
@media (max-width: 750px)
  .default-container
    overflow-x hidden !important
    .default-content
      padding-top 100px !important
    .default-menu-trigger
      display flex
</style>

