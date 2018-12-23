<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-0">
    <md-scroll-view
      ref="scrollView"
      @scroll="$_onScroll"
    >
      <div
        v-for="i in list"
        class="scroll-view-item"
        :key="i"
        @click="$_onItemClick(i)"
      >
        {{i}}
      </div>
    </md-scroll-view>
  </div>
</template>

<script>import {ScrollView, Toast} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-0',
  /* DELETE */
  title: '基础 <a href="javascript:ScrollViewTrigger0()">添加内容</a>',
  titleEnUS: 'Basic <a href="javascript:ScrollViewTrigger0()">Add Items</a>',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
  },
  data() {
    return {
      list: 5,
    }
  },
  mounted() {
    window.ScrollViewTrigger0 = () => {
      this.addItems()
    }
  },
  methods: {
    $_onItemClick(i) {
      Toast.info(`Click ${i}`)
    },
    $_onScroll({scrollLeft, scrollTop}) {
      console.log(`[Mand Mobile ScrollView - demo0 - onScroll] scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`)
    },
    addItems() {
      this.list += 5
      // 如果把autoReflow设置为false, 需调用reflowScroller
      this.$refs.scrollView.reflowScroller()
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-0
  height 400px
  background #FFF
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 28px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>