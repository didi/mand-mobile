<template>
  <div class="mfe-blog-theme-default default-container" :class="{'is-home': isHome}">
    <mb-header :is-active="isHome"/>
    <div class="default-content">
      <mb-menu
        v-if="!noMenu"
        v-model="isMenuShow"
        menua-ads="menuAds"
      />
      <div class="default-content-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <div class="default-menu-trigger" v-if="!noMenu" @click="isMenuShow = !isMenuShow">
      <i class="icon-catalog"></i>
    </div>
    <div class="default-menu-trigger" v-else @click="changeLang">
      <i class="lang" v-text="lang === 'en-US' ? '中文' : 'English'"></i>
    </div>
    <mb-footer/>
    <div class="hover-ggs" v-if="hoverAds && hoverAds.length" >
      <a
        v-for="(gg, index) in hoverAds"
        :href="gg.link"
        :key="`hover-gg-${index}`"
        class="hover-ggs-item">
        <img :src="gg.image" alt="">
      </a>
    </div>
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
import { localStore } from './assets/js/util'

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
      hoverAds: [],
      menuAds: [],
    }
  },
  watch: {
    '$route': {
      handler () {
        this.isMenuShow = false
      },
      deep: true
    },
    lang: {
      handler (val) {
        document.documentElement.setAttribute('lang', val === 'en-US' ? 'en' : val)
      },
      immediate: true,
      deep: true
    },
  },
  computed: {
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    },
    noMenu() {
      return this.$route.meta.noMenu
    },
    isHome() {
      return !!~this.$route.path.indexOf('/home')
    }
  },
  mounted () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      $.get(`//static.galileo.xiaojukeji.com/static/tms/api/mand_mobile_config.json?${Date.now()}`).then(data => {
        this.hoverAds = data.hoverAds
        this.menuAds = data.menuAds
      })
    },
    changeLang () {
      const lang = this.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
      localStore('MAND_MOBILE_LANG', lang)
      location.href = location.href.replace(this.lang, lang)

      if (~location.href.indexOf('home')) {
       location.reload()
      }
    },
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
    min-height 800px
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
      font-style normal
      &.icon-catalog
        font-size 24px
      &.lang
        font-size 12px
  .hover-ggs
    position fixed
    z-index 9999
    width 100px
    right 20px
    bottom 100px
    .hover-ggs-item
      display inline-block
      width 100%
      margin-top 10px
      img
        width 100%

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
    .hover-ggs
      width 60px
      right 10px
      .hover-ggs-item
        margin-top 10px
</style>

