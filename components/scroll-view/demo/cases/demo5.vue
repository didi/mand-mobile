<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-5">
    <md-tab-bar
      v-model="activeBlockIndex"
      :items="tabBarItems"
      :max-length="5"
      ref="tabBar"
      @change="$_onTabChange"
    ></md-tab-bar>
    <md-scroll-view
      class="scroll-view-with-tab-bar"
      ref="scrollView"
      :scrolling-x="false"
      @scroll="$_onScroll"
      @mousedown.native="$_onScrollStart"
      @touchstart.native="$_onScrollStart"
    >
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

const debounce = function(fn, delay) {
  let timer
  return function() {
    const context = this
    timer && clearTimeout(timer)

    timer = setTimeout(function() {
      fn.apply(context, arguments)
    }, delay)
  }
}
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
      activeBlockIndex: 0,
    }
  },
  computed: {
    tabBarItems() {
      return this.dimensions.map((item, index) => {
        return {name: index, label: `Block - ${index + 1}`}
      })
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

      // setTimeout(() => {
      //   this.$refs.tabBar.reflow()
      // }, 1000)
    },
    $_onScrollStart() {
      this.isManual = false
    },
    $_onScroll({scrollTop}) {
      if (!this.isManual) {
        this.dimensions.some((dimension, index) => {
          if (scrollTop >= dimension[0] && scrollTop <= dimension[1]) {
            this.activeBlockIndex = index
            return true
          }
        })
      }
    },
    $_onTabChange(item, index) {
      this.isManual = true
      debounce(() => {
        const offsetTop = this.dimensions[index][0]
        this.$refs.scrollView.scrollTo(0, offsetTop, true)
        this.scrollY = offsetTop
      }, 100)()
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-scroll-view-5
  position relative
  height 800px
  background #FFF
  .md-tab-bar
    position absolute
    left 0
    top 0
    right 0
    z-index 2
    box-shadow 0 2px 8px #f0f0f0
  .scroll-view-with-tab-bar
    & > .scroll-view-container
      padding-top 100px
    .scroll-view-item
      padding 30px 0
      text-align center
      font-size 32px
      border-bottom .5px solid #efefef
</style>