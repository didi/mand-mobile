<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-4">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @scroll="$_onScroll"
    >
      <div
        v-for="i in category"
        :key="i"
        class="scroll-view-category"
      >
        <p class="scroll-view-category-title">{{ i }}</p>
        <div
          v-for="j in list"
          :key="j"
          class="scroll-view-list"
        >
          <p class="scroll-view-item">{{`${i} - ${j}`}}</p>
        </div>
      </div>
    </md-scroll-view>
    <p v-if="activeBlockIndex > 0" class="scroll-view-striky-title">{{ activeBlockIndex }}</p>
  </div>
</template>

<script>import {ScrollView} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-3',
  /* DELETE */
  title: '粘性标题',
  titleEnUS: 'Stricky Title',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
  },
  data() {
    return {
      category: 5,
      list: 5,
      dimensions: [],
      scrollY: 0,
    }
  },
  computed: {
    activeBlockIndex() {
      let activeIndex = -1
      this.dimensions.forEach((dimension, index) => {
        if (this.scrollY >= dimension[0] && this.scrollY <= dimension[1]) {
          activeIndex = index + 1
        }
      })
      return activeIndex
    },
  },
  mounted() {
    // 如果内容发生变化，需重新初始化block和scroller
    this.$_initScrollBlock()
    // this.$refs.scrollView.reflowScroller()
  },
  methods: {
    $_initScrollBlock() {
      const blocks = this.$el.querySelectorAll('.scroll-view-category')
      let offset = 0
      Array.prototype.slice.call(blocks).forEach((block, index) => {
        const innerHeight = block.clientHeight
        this.$set(this.dimensions, index, [offset, offset + innerHeight])
        offset += innerHeight
      })
    },
    $_onScroll({scrollTop}) {
      this.scrollY = scrollTop
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-4
  position relative
  height 800px
  background #FFF
  .scroll-view-striky-title
    position absolute
    top 0
    left 0
    right 0
    z-index 2
  .scroll-view-category-title, .scroll-view-striky-title
    padding 10px 0
    text-align center
    font-size 32px
    font-family DINAlternate-Bold
    background-color #f0f0f0
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    border-bottom .5px solid #efefef
</style>