<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-0">
    <md-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      ref="swiper"
      :is-prevent="false"
      :useNative-driver="false"
    >
      <md-swiper-item :key="$index" v-for="(item, $index) in simple">
        <div
          class="banner-item"
          :style="{'background': `${item.color}`}">{{item.text}}</div>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>import {Swiper, SwiperItem} from 'mand-mobile'
import simple from 'mand-mobile/components/swiper/demo/data/simple'

export default {
  name: 'swiper-demo',
  /* DELETE */
  title:
    '横向轮播 <a href="javascript:window.triggerSwiper0()">Goto 2</a><a href="javascript:window.triggerSwiper1()">Play</a><a href="javascript:window.triggerSwiper2()">Stop</a>',
  titleEnUS:
    'Horizontal rotation <a href="javascript:window.triggerSwiper0()">Goto 2</a><a href="javascript:window.triggerSwiper1()">Play</a><a href="javascript:window.triggerSwiper2()">Stop</a>',
  describe: '10秒后异步加载更多项，20秒后重置为初始数量',
  describEnUs: 'Async load more items in 10s, and reset to origin items in another 10s',
  message:
    '@before-change: from: <span id="valueSwiper0">0</span>, to: <span id="valueSwiper1">0</span><br/>@after-change: from: <span id="valueSwiper2">0</span>, to: <span id="valueSwiper3">0</span>',
  /* DELETE */
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  data() {
    return {
      simple,
    }
  },
  mounted() {
    // Simulation of asynchronous
    setTimeout(() => {
      this.simple = simple.concat(simple)
    }, 10000)
    // Simulation of asynchronous
    setTimeout(() => {
      this.simple = simple
    }, 24500)
    window.triggerSwiper0 = () => {
      this.goto()
    }
    window.triggerSwiper1 = () => {
      this.play()
    }
    window.triggerSwiper2 = () => {
      this.stop()
    }
  },
  methods: {
    setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    },
    beforeChange(from, to) {
      this.setValue('#valueSwiper0', from)
      this.setValue('#valueSwiper1', to)
    },
    afterChange(from, to) {
      this.setValue('#valueSwiper2', from)
      this.setValue('#valueSwiper3', to)
    },
    fn(index) {
      this.setValue('#valueSwiper4', index)
    },
    goto() {
      this.$refs.swiper.goto(2)
    },
    play() {
      this.$refs.swiper.play()
    },
    stop() {
      this.$refs.swiper.stop()
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-swiper-0
  height 250px
  .banner-item
    float left
    width 100%
    height 100%
    line-height 250px
    text-align center
    font-size 28px
    color #FFF
    box-align center
    align-items center
    box-pack center
    justify-content center
    text-decoration-line none
</style>
