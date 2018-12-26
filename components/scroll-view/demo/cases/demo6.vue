<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-6">
    <md-tabs
      @change="$_onTabChange"
      immediate
    >
      <md-tab-pane class="content" name="scrollView0" label="Block - 1">
        <md-scroll-view
          ref="scrollView0"
          :scrolling-x="false"
          manual-init
          @refreshing="$_onRefresh(0)"
        >
          <md-scroll-view-refresh
            slot="refresh"
            slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
            :scroll-top="scrollTop"
            :is-refreshing="isRefreshing"
            :is-refresh-active="isRefreshActive"
          ></md-scroll-view-refresh>
          <div
            v-for="i in list0"
            :key="i"
            class="scroll-view-list"
          >
            <p class="scroll-view-item">{{`1 - ${i}`}}</p>
          </div>
        </md-scroll-view>
      </md-tab-pane>
      <md-tab-pane class="content" name="scrollView1" label="Block - 2">
        <md-scroll-view
          ref="scrollView1"
          :scrolling-x="false"
          manual-init
          @refreshing="$_onRefresh(1)"
        >
          <md-scroll-view-refresh
            slot="refresh"
            slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
            :scroll-top="scrollTop"
            :is-refreshing="isRefreshing"
            :is-refresh-active="isRefreshActive"
          ></md-scroll-view-refresh>
          <div
            v-for="i in list1"
            :key="i"
            class="scroll-view-list"
          >
            <p class="scroll-view-item">{{`2 - ${i}`}}</p>
          </div>
        </md-scroll-view>
      </md-tab-pane>
    </md-tabs>
  </div>
</template>

<script>import {Tabs, TabPane, ScrollView, ScrollViewRefresh} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-6',
  /* DELETE */
  title: '手动初始化',
  titleEnUS: 'Manual initialization',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
  },
  data() {
    return {
      list0: 5,
      list1: 5,
      isFinished: false,
    }
  },
  methods: {
    $_onRefresh(index) {
      // async data
      setTimeout(() => {
        this[`list${index}`] += 5
        this.$refs[`scrollView${index}`].finishRefresh()
      }, 2000)
    },
    $_onTabChange(tab) {
      console.log(tab.name)
      this.$refs[tab.name].init()
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-6
  background #FFF
  .content
    height 800px
  .md-tab-bar
    box-shadow 0 2px 8px #f0f0f0
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>