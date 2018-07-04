<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-0">
    <md-scroll-view
      ref="scrollView"
      @scroll="$_onScroll"
    >
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

<script>import {ScrollView} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-0',
  /* DELETE */
  title: '基础 <a href="javascript:ScrollViewTrigger0()">添加内容</a>',
  titleEnUS: 'Basic <a href="javascript:ScrollViewTrigger0()">Add Items</a>',
  height: 400,
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
    $_onScroll({scrollX, scrollY}) {
      console.log(`[Mand Mobile ScrollView - demo0 - onScroll] scrollX: ${scrollX}, scrollY: ${scrollY}`)
    },
    addItems() {
      this.list += 5
      this.$refs.scrollView.reflowScroller()
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-0
  height 400px
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 28px
    font-family DINAlternate-Bold
    border-bottom .5px solid #efefef
</style>