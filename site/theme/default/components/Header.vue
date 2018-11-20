<template>
  <div class="mfe-blog-theme-default-header" :class="{active: isActive}">
    <div class="default-header-container">
      <div class="default-header-aside">
        <a class="default-header-logo" href="/mand-mobile">
          <img :src="logo" alt="logo">
          <span v-html="title"></span>
          <sup>v{{version}}</sup>
        </a>
      </div>
      <div class="default-header-content">
        <div class="default-header-search">
          <div class="default-header-search-input">
            <i class="icon-magnifier" :class="{active: searchFocus}"></i>
            <input
              type="text"
              :placeholder="lang === 'en-US' ? 'Search' : '搜索'"
              autocomplete="off"
              v-model="searchValue"
              @click.stop
              @focus="onInputFocus($event)"
              @blur="onInputBlur"
              @keyup="onInputKeyup($event)">
            <mfe-table v-model="searchTableShow" :data="searchData" style="top:45px;">
              <a
                target="_blank"
                href="https://www.algolia.com/docsearch"
                class="algolia-search-link"
                slot="footer"
              >
                <img src="../assets/images/algolia.png" alt="algolia-logo" class="algolia-search-logo"></a>
            </mfe-table>
          </div>
        </div>
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
            <span>2.x</span>
          </div>
          <mfe-table v-model="versionTableShow" :data="versionData" style="width:96px;top:47px;left:auto !important;right:-8px;"></mfe-table>
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
import { localStore } from '../assets/js/util'
import algoliasearch from 'algoliasearch'

export default {
  name: 'mfe-blog-theme-default-header',

  components: {
    MfeTable
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
      searchValue: '',
      searchFocus: false,
      searchTableShow: false,
      searchData: [],
      versionTableShow: false,
      versionData: [{
        text: '1.x',
        path: 'https://mand-mobile.github.io'
      }, {
        text: '2.x',
        path: '/home'
      }],
      searcher: algoliasearch('4GDUUWIAWB', 'd58846e82b7f4adfc81a0ada6346343f').initIndex('mand'),
      searchHandler: null
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
    onInputFocus(event) {
      const word = event.target.value.trim()
      if (word) {
        setTimeout(() => {
          this.searchTableShow = true
        }, 300)
      }
      this.searchFocus = true
    },
    onInputBlur() {
      this.searchFocus = false
    },
    onInputKeyup(event) {
      const word = event.target.value.trim()

      if (this.searchHandler) {
        clearTimeout(this.searchHandler)
      }

      this.searchHandler = setTimeout(() => {
        this.preSearch(word)
        this.searchHandler = null
      }, 500)
    },
    preSearch(word) {
      if (word) {
        this.searchData = []
        this.createSearchData(word, this.menu)
        this.searchTableShow = true
      } else {
        this.searchTableShow = false
      }

    },
    matchIndex(index) {
      let matched
      if (index.component) {
        matched= this.traverseSource(index.component)
      } else {
        matched= this.traverseSource(index.name)
      }
      return {
        ...index,
        ...matched
      }
    },
    createSearchData(word) {
      if (word) {
        this.searcher.search({
          query: word,
          hitsPerPage: 10
        }, (err, res) => {
          if (err) {
            return
          }
          this.searchData = res.hits.map(this.matchIndex).map(this.handleSearchData)
        })
      }
    },
    handleSearchData(hit) {
      let content = hit._highlightResult.content.value.replace(/\s+/g, ' ')
      const highlightStart = content.indexOf('<em>')
      if (highlightStart > -1) {
        const startEllipsis = highlightStart - 25 > 0
        content = (startEllipsis ? '...' : '') +
          content.slice(Math.max(0, highlightStart - 15), content.length)
      } else if (content.indexOf('|') > -1) {
        content = ''
      }
      hit.content = content

      const matchedWord = hit._highlightResult.component.matchedWords[0]
      const componentNameMatchStart = (matchedWord && hit.text) ? hit.text.toLowerCase().indexOf(matchedWord.toLowerCase()) : -1

      if (componentNameMatchStart >= 0) {
        const myMatchedWord = hit.text.substr(componentNameMatchStart, matchedWord.length)
        hit.text = hit.text.replace(myMatchedWord, `<em>${myMatchedWord}</em>`)
      }

      return hit
    },

    traverseSource(word, source = this.menu, path = [], level = 0) {
      for (let i = 0, len = source.length; i < len; i++) {
        const item = source[i]
        const name = item.name

        path[level] = name
        if (item.menu && Array.isArray(item.menu)) {
          const tmpPath = [...path]
          level++
          const subItem = this.traverseSource(word, item.menu, path, level)
          if (subItem) {
            return subItem
          }
          path = [...tmpPath]
          level--
        }

        if (word === item.name) {
          item.path = `/${this.lang}/${path.join('/')}`
          return item
        }
      }
    },

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
      line-height 64px
      img
        display inline-block
        margin-right 10px
        width auto
        height 28px
        vertical-align middle
        transition all .3s
      span
        position relative
        top 2px
        height 100%
        color #333
        font-size 16px
        line-height 64px
        font-family DINAlternate-Bold, AvenirNext-Medium,"Microsoft Yahei","Lato","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Verdana,Tahoma,sans-serif  !important
        transition all .3s
        i
          color #048EFA
          font-size 13px
          font-style normal
          font-weight 500
          font-family "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace  !important
      sup
        display inline-block
        max-width 40px
        margin-left 10px
        color #999
        font-weight 300
        font-size 12px
        font-family DINAlternate-Bold
        line-height 1
        
  .default-header-content
    display inline-block
    width 83%
    height 100%
    padding-right 40px
    box-sizing border-box
    .default-header-search
      position relative
      float left
      height 22px
      margin-top 20px
      padding-left 16px
      line-height 22px
      // border-left 1px solid #ebedee
      i
        color #ccc
        &.active
          color #048efa
      input
        margin 0 10px
        width 200px
        outline none
        border none
        color #666
        font-size 14px
      .default-table
        padding-bottom 38px
        .algolia-search-link
          position absolute
          bottom 0
          left 0
          width 100%
          padding 10px 15px
          box-sizing border-box
          background #f0f0f0
          display flex
          align-items center
          justify-content flex-end
          text-decoration none
          color #333
          img
            height 18px
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
      width 80px
      height 30px
      margin-left 10px
      margin-top 17px
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
        line-height 100px
        img
          height 48px
        span
          top 4px
          line-height 100px
          font-size 24px
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
