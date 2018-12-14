<template>
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
</template>

<script>
import algoliasearch from 'algoliasearch'
import MfeTable from './Table'
export default {
  props: {
    lang: {
      type: String,
    },
    menu: {
      type: Array,
    }
  },
  components: {
    MfeTable
  },
  data () {
    return {
      searchValue: '',
      searchFocus: false,
      searchTableShow: false,
      searchData: [],
      searcher: algoliasearch('4GDUUWIAWB', 'd58846e82b7f4adfc81a0ada6346343f').initIndex('mand'),
      searchHandler: null
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
          console.log(res)
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
  }
}
</script>

<style lang="stylus">
.default-header-search
    position relative
    float left
    height 22px
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
</style>
