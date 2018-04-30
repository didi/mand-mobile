<template>
  <div class="md-example-child md-example-child-swiper md-example-child-swiper-1">
    <md-swiper
      @before-change="beforeChange"
      @after-change="afterChange"
      :has-dots="false"
      :default-index="1"
      :dragable="false"
      :autoplay="5000"
      transition="slideY">
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
  title: '纵向轮播',
  describe: '纵向，默认显示第2屏（index 1），不显示导航点，不可拖动，滚动间隔为5秒',
  message:
    '@before-change: from: <span id="valueSwiper5">0</span>, to: <span id="valueSwiper6">0</span><br/>@after-change: from: <span id="valueSwiper7">0</span>, to: <span id="valueSwiper8">0</span>',
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
  methods: {
    setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    },
    beforeChange(from, to) {
      this.setValue('#valueSwiper5', from)
      this.setValue('#valueSwiper6', to)
    },
    afterChange(from, to) {
      this.setValue('#valueSwiper7', from)
      this.setValue('#valueSwiper8', to)
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
