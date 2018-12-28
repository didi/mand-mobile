<template>
  <div class="default-header-search" id="">
    <div class="default-header-search-input">
      <i class="search-icon icon-magnifier" :class="{active: searchFocus}"></i>
      <input
        id="search-query-nav"
        class="search-input"
        type="text"
        :placeholder="lang === 'en-US' ? 'Search' : '搜索'"
        autocomplete="off"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
    },
    menu: {
      type: Array,
    }
  },
  data () {
    return {
      searchFocus: false,
      docsearchIns: null,
    }
  },
  watch: {
    lang(val) {
      if (this.docsearchIns) {
        this.docsearchIns.algoliaOptions.facetFilters = [`lang:${val === 'en-US' ? 'en' : val}`]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.initDocSearch(this.lang === 'en-US' ? 'en' : this.lang)
    }, 100)
  },
  methods: {
    initDocSearch(lang) {
      this.docsearchIns = docsearch({ 
        apiKey: 'f6464cd4e62607a36f03b4cd59d2141b', 
        indexName: 'mand-mobile', 
        inputSelector: '#search-query-nav',
        algoliaOptions: { 'facetFilters': [`lang:${lang}`] },
        debug: process.env.NODE_ENV !== 'production'
      })
    },
    onInputFocus() {
      this.searchFocus = true
    },
    onInputBlur() {
      this.searchFocus = false
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
    a
      text-decoration none
    // border-left 1px solid #ebedee
    .search-icon
      color #ccc
      &.active
        color #2F86F6
    .search-input
      margin 0 10px
      width 200px
      outline none
      border none
      color #666
      font-size 14px
      vertical-align baseline !important
    .algolia-autocomplete
      .ds-dropdown-menu
        top 110% !important
        box-shadow 0 2px 10px rgba(0,0,0,0.08)
        border none
        transition all .3s
        &:before
          display none
        & [class^=ds-dataset-]
          margin 0
          padding 5px
          border none
      .ds-suggestions, .algolia-docsearch-suggestion
        margin 0
        padding 0
      .ds-suggestion
        border-top solid 1px #E2E4EA
        &:last-of-type
          border-bottom solid 1px #E2E4EA
      .algolia-docsearch-suggestion--category-header
        padding 5px 10px
        background #2F86F6
        color #FFF
        margin-top 0
        border none
        font-family DINAlternate-Bold
      .algolia-docsearch-suggestion--wrapper
        padding 0
        background #F9FAFB
        &:last-of-type
          border none
      .algolia-docsearch-suggestion--subcategory-column
        &:before
          background #E2E4EA
      .algolia-docsearch-suggestion--subcategory-column-text
        color #41485D
      .algolia-docsearch-suggestion--content
        background #FFF
        transition all .3s
        &:before
          background #E2E4EA
      .algolia-docsearch-suggestion--title
        color #111A34
        font-weight 500
      .algolia-docsearch-suggestion--no-results
        padding 30px 0
    // .default-table
    //   padding-bottom 38px
    //   .algolia-search-link
    //     position absolute
    //     bottom 0
    //     left 0
    //     width 100%
    //     padding 10px 15px
    //     box-sizing border-box
    //     background #f0f0f0
    //     display flex
    //     align-items center
    //     justify-content flex-end
    //     text-decoration none
    //     color #333
    //     img
    //       height 18px
</style>
