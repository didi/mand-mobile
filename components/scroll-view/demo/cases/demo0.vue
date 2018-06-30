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
      <div>
        1
        <br>
        2
        <br>
        3
        <br>
        4
        <br>
        5
        <br>
        6
        <br>
        7
        <br>
        8
        <br>
        9
        <br>
        10
        <br>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>import {ScrollView, ScrollViewRefresh} from 'mand-mobile'

export default {
  name: 'scroll-view-demo',
  /* DELETE */
  height: 800,
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
  },
  methods: {
    $_onScroll() {
      // console.log(scrollY)
    },
    $_onRefresh() {
      // async data
      setTimeout(() => {
        this.$refs.scrollView.finishRefresh()
      }, 3000)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view
  height 800px
</style>