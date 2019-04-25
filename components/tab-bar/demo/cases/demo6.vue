<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-6">
    <md-tab-bar
      v-model="current"
      :items="items"
      @change="onTabChange"
    ></md-tab-bar>
    <md-swiper
      ref="swiper"
      :autoplay="0"
      :is-prevent="false"
      :is-loop="false"
      :has-dots="false"
      @before-change="onSwiperChange"
    >
      <md-swiper-item>
        她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
      </md-swiper-item>
      <md-swiper-item>
        又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>import {TabBar, Swiper, SwiperItem} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '手势切换',
  titleEnUS: 'Gesture switching',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
  },
  data() {
    return {
      current: 0,
      items: [{name: 0, label: '标签1'}, {name: 1, label: '标签2'}],
    }
  },
  methods: {
    onSwiperChange(from, to) {
      this.current = to
    },
    onTabChange(item, index) {
      this.$refs.swiper.goto(index)
    },
  },
}
</script>

<style>
.md-example-child-tab-bar-6 .md-swiper {
  background: #FFF;
}
.md-example-child-tab-bar-6 .md-swiper .md-swiper-item {
  padding: 20px;
  box-sizing: border-box;
  font-size: 24px;
  line-height: 1.5;
  color: #666;
}
</style>

