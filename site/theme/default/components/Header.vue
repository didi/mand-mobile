<template>
  <div class="mfe-blog-theme-default-header" :class="{active: isActive}">
    <div class="default-header-container">
      <div class="default-header-aside">
        <a class="default-header-logo" :href="homePath">
          <img class="logo-img" :src="logo" alt="logo">
          <p>
            <span class="name" v-html="title"></span>
            <span class="ads-img" v-if="logoAds.images">
              <img v-for="(img, index) in logoAds.images"
                :src="img"
                :key="index"
                alt=""
              >
            </span>
            <span class="ads-text" v-if="logoAds.slogan" v-html="logoAds.slogan"></span>
          </p>
        </a>
      </div>
      <div class="default-header-content">
        <mfe-search :lang="lang" :menu="menu"></mfe-search>
        <div class="default-header-github default-header-operater">
          <a href="https://github.com/didi/mand-mobile/tree/master" target="_blank"></a>
        </div>
        <div class="default-header-lang default-header-operater">
          <router-link
            class="operater-select"
            :to="langSwitchPath"
          >
            <span v-if="lang === 'en-US'">中文</span>
            <span v-else>English</span>
          </router-link>
        </div>
        <div class="default-header-version default-header-operater">
          <div class="operater-select" @click.stop="versionTableShow = true">
            <span>{{`v${version}`}}</span>
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
import { localStore, getHomePath } from '../assets/js/util'
// import algoliasearch from 'algoliasearch'

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
    },
    logoAds: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data() {
    return {
      title: window.mbConfig.title,
      logo: window.mbConfig.logo,
      homePath: getHomePath(),
      versionTableShow: false,
      versionData: [{
        text: 'v1.x',
        path: 'https://mand-mobile.github.io/1x-doc/'
      }],
      langSwitchPath: ''
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
    switchLang() {
      return this.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
    },
    version() {
      return mandMobileInfo ? mandMobileInfo.version : ''
    }
  },

  mounted () {
    localStore('MAND_MOBILE_LANG', this.switchLang)
  },

  watch: {
    '$route': {
      handler (val) {
        this.langSwitchPath = val.path.replace(this.lang, this.switchLang)
      },
      immediate: true
    }
  },

  methods: {
    // changeLang () {
    //   const lang = this.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
    //   localStore('MAND_MOBILE_LANG', lang)
    //   location.href = location.href.replace(this.lang, lang)

    //   if (~location.href.indexOf('home')) {
    //    location.reload()
    //   }
    // },
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
      img.logo-img
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
      span.ads-text
        margin-top 3px
        color #999
        font-weight 300
        font-size 10px
      span.ads-img
        margin-top 3px
        height 15px
        img
          margin-right 2px
          height 100%
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
            height 5px
            background-color #1641FF
            border-radius 2.5px
          &:hover
            color #333
          &.router-link-active
            color #1641FF
            font-size 16px
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
          color #1641FF
      &.default-header-lang a
        display inline-block
        width 100%
        height 100%
        text-decoration none
        color #314659
    .default-header-github
      float right
      width 32px
      height 32px
      min-width auto
      margin-left 10px
      margin-top 17px
      padding 0
      border none
      border-radius 0
      opacity .8
      box-sizing border-box
      transition opacity .3s
      a
        display inline-block
        width 100%
        height 100%
        background url('../assets/images/github.png') no-repeat
        background-size contain
        -webkit-filter invert(70%)
        filter invert(70%)
      &:hover
        opacity .5 !important

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
        color #000
        opacity .8
        border-color rgba(0, 0, 0, .3)
        &.default-header-github a
          background-image url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABSlBMVEUAAACcnJybm5v///////+ioqK+vr7f39/////7+/upqamysrKenp6ampqmpqanp6eysrKenp7Pz8/g4ODh4eHq6uqkpKTw8PDy8vLPz8/Pz8+wsLCenp7///+goKCtra2np6f///+0tLSvr6////+ioqKampqwsLD///+urq69vb26urrBwcGcnJz///+kpKTMzMzIyMjBwcG1tbWbm5v////Q0NDMzMzExMTc3NzW1tbJycmfn5+rq6vCwsL////c3Nz////39/esrKyqqqrq6urd3d23t7eqqqqampr////6+vrV1dW6urqdnZ2jo6P19fXw8PCfn5/Dw8O3t7esrKz8/Pzt7e3S0tLIyMizs7OwsLDq6urFxcWlpaXm5ubg4ODOzs7AwMC9vb3y8vLd3d3Y2NjLy8unp6f39/fh4eHZ2dmpqamoqKizwaBNAAAASXRSTlMA+eoVA+ylUxAN0zn57unfy8SOgGJhYTszHg7Vjvn57u7s6urf1dXSy8vExLGxpY6NjY2AgH5+fn5zc3NzYmFTMx4e39/S0o0zVQOFuwAAAvJJREFUWMOV1ldX4lAQAOAJEVAQEVAUe++997Z1Eqp0RKXY1t39/68aMMmkcZPvbQ5nBnIzdwawwnsPPctBN8e5g8ueQy8Pjgxv+1DHtz0MNvWcjKIp30kPsHVHptDSVKQbGAZnsaPZQejkZhWZVm/A0lAf2tA3BBYGetGW3gEw0xVG28JdJvlr6MCasUIYHQkbnh8dGtCd/wQ6NKF5F9fK+2vWc9hBIl5Kym/zGlQr+OVNEIR0/QFNperpz4+zcrhC+lf9BkFSiKfaGXe5ZraRq7SiZFkUJCWUKV3dPYOyptAm1hvxqijI0rVsMyMIugIz8s2KoCIrMNACGPm6/5OoaLALlFEx2Z4Px6jKsQskUHUMEjp/7tgF8qgabc0/JN7YBZJISHNyC4l7doEaElsAsEjif6LAdk8SFgF4+pMeBRsyJCHJg5dxhIxj9MIBieKsVOMzHICHRBl7BZ5Jigf6SVSwV6BIUvohSK6rYI+IqiC4GWfI6CU3kF1QsVsgRXYEcGqQt1uATCwO3PQi2PSfPsI3VInOf8F3zWusOj/Efk0jlezl/9E00hGJ8s478Qi8SBRtFUhoLhOPRMJpJyMP4KNxTWC7Q5UPAHaQuGVfyCwSOwBwhdRDhrkWqCv4NI/U7d9O6ekKUvMgOdWv8KJl+msSNU7bqy3Q2kni03NOvtcvJk1dqCVQJ9ADLbtSkJQG4ot6FrkynU/VUuIWDXbl9e5SlkrcYsJm0YRL+eN8gS1lWqFi3jzUBShC6l55MR/xeTQIgSrmUjv5MWW2pF6NDxADws+pAyF9X2nE04LWO+pwftA4Z4zVDOqcg84mSl6tCjyh1hjoda2jJCu2msbYhKixbvZ3fay9nsrvxadMpmoYY9QYySeiHLlTHdYZFwULfpdlgQJ5f36wFAuRAhajPBSDTqIuWsC4D11RYBjZC5ACul4O7I0A28jZAlkRZJYvnMnpTL83f+oL/PjlB0f4y/2Npbnp8fHpuaWN/UseLHwAenKWqfPy+9oAAAAASUVORK5CYII=")
          -webkit-filter invert(0%)
          filter invert(0%)
        &.default-header-lang a
          color #000
      .default-header-aside
        padding 0
      .default-header-search, .default-header-nav
        display none
@media (max-width: 1400px)
  .default-header-container
    // width 1300px !important
    .default-header-aside
      width 20% !important
    .default-header-content
      width 79% !important
    .default-header-search
      .search-input
        width 150px
@media (max-width: 1200px)
  .default-header-container
    width 100%
    .default-header-aside
      width 10% !important
    .default-header-logo span, .default-header-logo sup, .default-header-search
      display none !important
    .default-header-content
      width 89% !important
      .default-header-nav li.nav-item a
        padding 0 10px
  .mfe-blog-theme-default-header.active
    .default-header-container
      width 800px
  .doc-content-top
    margin-top 30px
@media (max-width: 850px)
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
        &.palette, &.mand-mobile-rn
          display none
        a
          padding 0 10px !important
          line-height 32px !important
          font-size 12px !important
          &:after
            bottom 0 !important
          &.router-link-active:after
            height 2px
            background #1641FF !important
    .default-header-aside .default-header-logo
      height 28px
      line-height 28px !important
      img.logo-img
        height 24px !important
        margin 0
      sup
        display none
    // .default-header-logo
    //   margin-top 10px
    &.active .default-header-nav li.nav-item a
      color #666 !important
      &.router-link-active
        color #1641FF !important
    .default-header-operater
      display none
  .doc-content-top
    margin-top 0
</style>
