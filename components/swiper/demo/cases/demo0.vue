<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-0">
    <md-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      ref="swiper">
      <md-swiper-item :key="$index" v-for="(item, $index) in simple">
        <a href="javascript:void(0)"
          class="banner-item"
          :style="{'background': `${item.color}`}">{{item.text}}</a>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'mand-mobile'
import simple from 'mand-mobile/components/swiper/demo/data/simple'

export default {
  name: 'swiper-demo',
  /* DELETE */
  title:
    '横向轮播 <a href="javascript:window.triggerSwiper0()">Goto 2</a><a href="javascript:window.triggerSwiper1()">Play</a><a href="javascript:window.triggerSwiper2()">Stop</a>',
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

<style lang="stylus" scoped>
.md-example-child
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
