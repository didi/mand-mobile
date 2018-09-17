<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-4">
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      @scroll="$_onScroll"
    >
      <md-tab-bar
        slot="header"
        ref="tabBar"
        :default-index="activeBlockIndex - 1"
        :titles="tabBarTitles"
        :show-ink-bar="true"
        :key="activeBlockIndex"
        @indexChanged="$_onTabChange"
      ></md-tab-bar>
      <div
        v-for="i in category"
        :key="i"
        class="scroll-view-category"
      >
        <div
          v-for="j in list"
          :key="j"
          class="scroll-view-list"
        >
          <p class="scroll-view-item">{{`${i} - ${j}`}}</p>
        </div>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>import {ScrollView, TabBar} from 'mand-mobile'

export default {
  name: 'scroll-view-demo-3',
  /* DELETE */
  title: '配合TabBar',
  titleEnUS: 'With TabBar',
  message: '请在移动设备中扫码预览',
  messageEnUS: 'Please scan QR code and preview on mobile device',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [TabBar.name]: TabBar,
  },
  data() {
    return {
      category: 5,
      list: 5,
      dimensions: [],
      scrollY: 0,
      isManual: false,
    }
  },
  computed: {
    tabBarTitles() {
      return this.dimensions.map((item, index) => {
        return index + 1
      })
    },
    activeBlockIndex() {
      let activeIndex = 1
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
      if (!this.isManual) {
        this.scrollY = scrollTop
      }
    },
    $_onTabChange(index) {
      const offsetTop = this.dimensions[index][0]
      this.isManual = true
      this.$refs.scrollView.scrollTo(0, offsetTop, true)
      setTimeout(() => {
        this.scrollY = offsetTop
        this.isManual = false
      }, 500)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-4
  position relative
  height 800px
  .md-tab-bar
    box-shadow 0 2px 8px #f0f0f0
  .md-scroll-view
    padding-top 80px
  .scroll-view-item
    padding 30px 0
    text-align center
    font-size 32px
    border-bottom .5px solid #efefef
</style>