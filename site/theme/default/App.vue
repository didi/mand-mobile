<template>
  <div class="mfe-blog-theme-default default-container" :class="{'is-home': isHome}" id="default-container">
    <mb-header :is-active="isHome" :logo-ads="logoAds"/>
    <div class="default-content">
      <div class="default-content-sidebar">
        <mb-menu
          :class="{stricky: isAffixStricky}"
          v-if="!noMenu"
          v-model="isMenuShow"
          :menu-ads="menuAds"
        />
      </div>
      <div class="default-content-wrapper" :class="{stricky: isAffixStricky}">
        <router-view></router-view>
      </div>
    </div>
    <div class="default-menu-trigger" v-if="!noMenu" @click="isMenuShow = !isMenuShow">
      <i class="icon-catalog"></i>
    </div>
    <div class="default-menu-trigger" v-else @click="changeLang">
      <i class="lang" v-text="lang === 'en-US' ? '中文' : 'English'"></i>
    </div>
    <mb-footer :class="{stricky: isAffixStricky}"/>
    <div class="hover-ggs" v-if="hoverAds && hoverAds.length" >
      <a
        v-for="(gg, index) in hoverAds"
        :href="gg.link"
        :key="`hover-gg-${index}`"
        class="hover-ggs-item">
        <img :src="gg.image" alt="">
      </a>
    </div>
    <transition name="slide-fade">
      <div class="screen-ggs" v-if="screenAds && screenAds.name">
        <p class="screen-ggs-mask" @click="closeScreenAd"></p>
        <a class="screen-ggs-content" :href="screenAds.link" @click="closeScreenAd">
          <img :src="screenAds.image" alt="">
          <!-- <i class="screen-ggs-close icon-error"></i> -->
        </a>
      </div>
    </transition>
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
import { localStore, throttle } from './assets/js/util'

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
      isAffixStricky: false,
      screenAds: {}, // {image: string, link: string, name: string}
      hoverAds: [], // [{image: string, link: string}]
      menuAds: [], // [{image: string, link: string}]
      logoAds: {}, // {images: ['x', 'y'] logo下方图片集合, text: string logo下方slogan}
    }
  },
  watch: {
    '$route': {
      handler () {
        this.isMenuShow = false
        $('#default-container').scrollTop(0)
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
    const that = this
    if (document.documentElement.clientWidth > 1000) {
      $('#default-container').bind('scroll', function () {
        const scrollTop = $(this).scrollTop()
        that.strickyAffix(scrollTop)
      })
      this.strickyAffix(document.body.scrollTop || document.documentElement.scrollTop)
    }
  },
  methods: {
    getConfig () {
      const tmpScreenAd = localStore('MAND_MOBILE_SCREENAD') || {}
      $.get(`//star.xiaojukeji.com/config/get.node?city=-1&name=mand_mobile_ads&${Date.now()}`).then(({ data }) => {
        if (!data || !data.mand_mobile_ads) {
          return
        }
        this.hoverAds = data.mand_mobile_ads.hoverAds
        this.menuAds = data.mand_mobile_ads.menuAds
        this.logoAds = data.mand_mobile_ads.logoAds
        if (data.mand_mobile_ads.screenAds && tmpScreenAd.name !== data.mand_mobile_ads.screenAds.name) {
          this.screenAds = data.mand_mobile_ads.screenAds
        }
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
    strickyAffix (scrollTop) {
      window.requestAnimationFrame(() => {
        if (scrollTop > 96) {
          this.isAffixStricky = true
        } else {
          this.isAffixStricky = false
        }
      })
    },
    closeScreenAd () {
      localStore('MAND_MOBILE_SCREENAD', this.screenAds)
      this.screenAds = {}
    }
  }
}

</script>

<style lang="stylus">
.mfe-blog-theme-default
  height 100%
  overflow auto
  overflow-x hidden
  -webkit-overflow-scrolling touch
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
    clearfix()
    .default-content-sidebar
      clearfix()
      float left
      width 16.666%
      min-height 10px
      .stricky
        width 16.666%
    .default-content-wrapper
      position relative
      left -1px
      overflow hidden
      // &.stricky
      //   left 1px
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
      color #2F86F6
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
  .screen-ggs
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 99999
    .screen-ggs-mask
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background rgba(0, 0, 0, 0.3)
    .screen-ggs-content
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      max-width 50%
      img
        width 100%
  .slide-fade-enter-active
    transition all .3s ease
  .slide-fade-leave-active
    transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
    transform translateY(10px)
    opacity 0

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
      padding-top 70px !important
    .default-menu-trigger
      display flex
    .hover-ggs
      width 60px
      right 10px
      .hover-ggs-item
        margin-top 10px
    .screen-ggs .screen-ggs-content
        max-width none
        width 80%
</style>

