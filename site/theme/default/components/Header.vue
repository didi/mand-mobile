<template>
  <div class="mfe-blog-theme-default-header" :class="{active: isActive}">
    <div class="default-header-container">
      <div class="default-header-aside">
        <a class="default-header-logo" href="/2x-doc">
          <img :src="logo" alt="logo">
          <p>
            <span class="name" v-html="title"></span>
            <!-- <span class="version">v{{version}}</span> -->
          </p>
        </a>
      </div>
      <div class="default-header-content">
        <!-- <mfe-search :lang="lang" :menu="menu"></mfe-search> -->
        <div class="default-header-github default-header-operater">
          <a href="https://github.com/didi/mand-mobile/tree/2.0" target="_blank"></a>
        </div>
        <div class="default-header-lang default-header-operater">
          <div class="operater-select" @click="changeLang">
            <span v-if="lang === 'en-US'">中文</span>
            <span v-else>English</span>
          </div>
        </div>
        <div class="default-header-version default-header-operater">
          <div class="operater-select" @click.stop="versionTableShow = true">
            <span>{{version}}</span>
          </div>
          <mfe-table v-model="versionTableShow" :data="versionData" style="width:96px;top:47px;left:50%;transform:translateX(-50%)"></mfe-table>
        </div>
        <div class="default-header-nav">
          <ul>
            <template v-if="lang === 'en-US'">
              <li class="nav-item">
                <router-link :to="{path:'/en-US/home'}">Home</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link :to="{path:'/zh-CN/home'}">首页</router-link>
              </li>
            </template>
            <li class="nav-item" :class="item.name" v-for="(item, index) in menu" :key="index">
              <template v-if="item.src && ~item.src.indexOf('//')">
                <a :href="item.src" v-html="item.text" target="_blank"></a>
              </template>
              <template v-else>
                <router-link
                  :to="`/${lang}/${item.name}`"
                  v-html="item.text">
                </router-link>
              </template>
              <i class="dot" v-if="item.dot"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mandMobileInfo from 'mand-mobile/package.json'
import MfeTable from './Table'
import MfeSearch from './Search'
import { localStore } from '../assets/js/util'
import algoliasearch from 'algoliasearch'

export default {
  name: 'mfe-blog-theme-default-header',

  components: {
    MfeTable,
    MfeSearch
  },

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      title: window.mbConfig.title,
      logo: window.mbConfig.logo,
      versionTableShow: false,
      versionData: [{
        text: '1.x',
        path: 'https://mand-mobile.github.io'
      }],
    }
  },

  computed: {
    menu () {
      const list = window.mbConfig.source[this.lang === 'zh-CN' ? 0 : 1] || {}
      return list.menu || []
    },
    lang() {
      return ~this.$route.path.indexOf('zh-CN') ? 'zh-CN' : 'en-US'
    },
    version() {
      return mandMobileInfo ? mandMobileInfo.version : ''
    }
  },

  methods: {
    changeLang () {
      const lang = this.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
      localStore('MAND_MOBILE_LANG', lang)
      location.href = location.href.replace(this.lang, lang)

      if (~location.href.indexOf('home')) {
       location.reload()
      }
    },
  },
}

</script>

<style lang="stylus">
.mfe-blog-theme-default-header
  position relative
  z-index 2
  display flex
  height 64px
  border-bottom solid 1px #f0f1f2
  clearfix()
  .default-header-container
    position relative
    display inline-block
    width 100%
    margin 0 auto
    transition width,height .5s,.5s
  .default-header-aside
    display inline-block
    width 16.666%
    height 100%
    padding-left 40px
    box-sizing border-box
    .default-header-logo
      position relative
      float left
      height 100%
      text-decoration none
      overflow hidden
      display inline-flex
      align-items center
      img
        display inline-block
        margin-right 10px
        width auto
        height 34px
        vertical-align middle
        transition all .3s
      p
        display inline-flex
        flex-direction column
        justify-content center
        height 100%
      span
        line-height 1
      span.name
        position relative
        color #333
        font-size 16px
        font-family DINAlternate-Bold, AvenirNext-Medium,"Microsoft Yahei","Lato","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Verdana,Tahoma,sans-serif  !important
        transition all .3s
      span.version
        margin-top 3px
        color #999
        font-weight 300
        font-size 10px
        // font-family DINAlternate-Bold
        
  .default-header-content
    display inline-block
    width 83%
    height 100%
    padding-right 40px
    box-sizing border-box
    .default-header-search
      margin-top 20px
    .default-header-nav
      float right
      height 100%
      margin-right 20px
      ul, li
        float left
        height 100%
      li.nav-item
        position relative
        a
          position relative
          display inline-block
          height 100%
          padding 0 20px
          line-height 64px
          text-decoration none
          color #666
          font-weight 500
          transition color .3
          &:after
            display none
            content ""
            position absolute
            bottom 0
            left 30%
            width 40%
            height 4px
            background-color #048EFA
          &:hover
            color #333
          &.router-link-active
            color #048EFA
            &:after
              display block
        i.dot
          position absolute 
          top 50%
          right 6px
          width 8px
          height 8px
          margin-top -10px
          border-radius 8px
          background #f56c6c
    .default-header-operater
      position relative
      float right
      min-width 80px
      height 30px
      margin-left 10px
      margin-top 17px
      padding 0 10px
      line-height 30px
      text-align center
      border-radius 30px
      border solid 1px #ddd
      cursor pointer
      .operater-select
        i
          font-size 12px
          color #048EFA
      &.default-header-github
        width 30px
        border none
        border-radius 0
        opacity .8
        a
          display inline-block
          width 100%
          height 100%
          background url('../assets/images/github.png') no-repeat
          background-size contain
          -webkit-filter invert(70%)
          filter invert(70%)
        &:hover
          opacity .5

  &.active
    height 100px
    box-shadow none
    border none
    .default-header-container
      width 1280px
      .default-header-logo
        img
          height 48px
        span
          &.name
            font-size 24px
          &.version
            display none
      .default-header-nav
        li.nav-item a
          color #FFF
          line-height 100px
          &:after
            background-color #FFF
            bottom 20px
      .default-header-operater
        margin-top 35px
        border-color #FFF
        color #FFF
        opacity .8
        &.default-header-github a
          -webkit-filter invert(100%)
          filter invert(100%)
      .default-header-aside
        padding 0
      .default-header-search, .default-header-nav
        display none
@media (max-width: 1400px)
  .default-header-container
    width 1080px !important
    .default-header-aside
      width 20% !important
    .default-header-content
      width 79% !important
      padding 0 !important
@media (max-width: 1200px)
  .default-header-container
    width 100% !important
  .default-header-logo span, .default-header-logo sup, .default-header-search
    display none !important
  .default-header-content
    width 80% !important
@media (max-width: 750px)
  .mfe-blog-theme-default-header
    position fixed
    top 0
    z-index 9998
    width 100%
    height auto !important
    padding 10px 10px 0 !important
    line-height 1 !important
    background #FFF
    // border-bottom solid 1px #f0f1f2 !important
    box-shadow 0 2px 8px #f0f1f2 !important
    box-sizing border-box
    .default-header-aside, .default-header-content
      float left
      width 100% !important
      height auto !important
      display flex
      justify-content center
      padding 0
    .default-header-nav
      display block !important
      margin 0 !important
      li.nav-item
        &.palette
          display none
        a
          padding 0 10px !important
          line-height 32px !important
          font-size 12px !important
          &:after
            bottom 0 !important
          &.router-link-active:after
            height 2px
            background #048efa !important
    .default-header-aside .default-header-logo
      height 28px
      line-height 28px !important
      img
        height 24px !important
        margin 0
      sup
        display none
    // .default-header-logo
    //   margin-top 10px
    &.active .default-header-nav li.nav-item a
      color #666 !important
      &.router-link-active
        color #048efa !important
    .default-header-operater
      display none
</style>
