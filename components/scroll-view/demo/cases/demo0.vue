<template>
  <div class="md-example-child md-example-child-scroll-view">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @scroll="$_onScroll"
      @refreshing="$_onRefresh"
    >
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollY, isRefreshActive, isRefreshing }"
        :scroll-y="scrollY"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <div
        v-for="i in list"
        :key="i"
        class="scroll-view-list"
      >
        <p class="scroll-view-item">{{i}}</p>
      </div>
      <md-scroll-view-more slot="more"></md-scroll-view-more slot="more">
    </md-scroll-view>
  </div>
</template>

<script>import {ScrollView, ScrollViewRefresh, ScrollViewMore} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-0',
  /* DELETE */
  height: 800,
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [ScrollViewMore.name]: ScrollViewMore,
  },
  data() {
    return {
      list: 5,
    }
  },
  methods: {
    $_onScroll() {
      // console.log(scrollY)
    },
    $_onRefresh() {
      // async data
      setTimeout(() => {
        this.list += 5
        this.$refs.scrollView.finishRefresh()
        this.$refs.scrollView.reflowScroller()
      }, 3000)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view
  height 800px
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    border-bottom .5px solid #efefef
</style>