<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-2">
    <md-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      :autoplay="5000"
      transition="fade"
      ref="swiper">
      <md-swiper-item :key="$index" v-for="(item, $index) in simple">
        <a href="javascript:void(0)"
          class="banner-item"
          :style="{'background': `${item.color}`}">{{item.text}}</a>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>import {Swiper, SwiperItem} from 'mand-mobile'
import simple from 'mand-mobile/components/swiper/demo/data/simple'

export default {
  name: 'swiper-demo',
  /* DELETE */
  title: '渐隐轮播 <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  titleEnUS: 'Fade carousel <a href="javascript:window.triggerSwiper3()">Goto 2</a>',
  message:
    '@before-change: from: <span id="valueSwiper10">0</span>, to: <span id="valueSwiper11">0</span><br/>@after-change: from: <span id="valueSwiper12">0</span>, to: <span id="valueSwiper13">0</span>',
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
    window.triggerSwiper3 = () => {
      this.goto()
    }
  },
  methods: {
    setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    },
    beforeChange(from, to) {
      this.setValue('#valueSwiper10', from)
      this.setValue('#valueSwiper11', to)
    },
    afterChange(from, to) {
      this.setValue('#valueSwiper12', from)
      this.setValue('#valueSwiper13', to)
    },
    goto() {
      this.$refs.swiper.goto(2)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-swiper-2
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
