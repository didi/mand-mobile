<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-3">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @end-reached="$_onEndReached"
    >
      <div
        v-for="i in list"
        :key="i"
        class="scroll-view-list"
      >
        <p class="scroll-view-item">{{i}}</p>
      </div>
      <md-scroll-view-more
        slot="more"
        :is-finished="isFinished"
      >
      </md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>import {ScrollView, ScrollViewMore} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-2',
  /* DELETE */
  title: '加载更多',
  titleEnUS: 'Load More',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
  },
  data() {
    return {
      list: 10,
      isFinished: false,
    }
  },
  methods: {
    $_onEndReached() {
      if (this.isFinished) {
        return
      }
      // async data
      setTimeout(() => {
        this.list += 5
        if (this.list >= 20) {
          this.isFinished = true
        }
        this.$refs.scrollView.finishLoadMore()
      }, 1000)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-3
  height 800px
  background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>