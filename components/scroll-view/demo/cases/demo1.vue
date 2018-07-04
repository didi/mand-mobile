<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-1">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
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
    </md-scroll-view>
  </div>
</template>

<script>import {ScrollView, ScrollViewRefresh} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-0',
  /* DELETE */
  title: '下拉刷新 <a href="javascript:ScrollViewTrigger1()">触发下拉刷新</a>',
  titleEnUS: 'Pull Refresh <a href="javascript:ScrollViewTrigger1()">Trigger Pull Refresh</a>',
  height: 800,
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
  },
  data() {
    return {
      list: 5,
    }
  },
  mounted() {
    window.ScrollViewTrigger1 = () => {
      this.$refs.scrollView.triggerRefresh()
    }
  },
  methods: {
    $_onRefresh() {
      // async data
      setTimeout(() => {
        this.list += 5
        this.$refs.scrollView.finishRefresh()
      }, 2000)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-1
  height 800px
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 28px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>