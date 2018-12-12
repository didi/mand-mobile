<template>
  <div class="home-animation-0">
    <img class="animation-bg" src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" alt="">
    <div class="animation-container">
      <ul
        class="animation-list"
        v-show="show"
        :style="{
          webkitTransform: `translate3d(${-offsetX}px,0,0)`,
          webkitTransition: `all ${duration}ms cubic-bezier(.25,.1,.25,1)`
        }"
      >
        <li class="animation-item">
          <img src="//pt-starimg.didistatic.com/static/starimg/img/gIT5xQT6RP1544626712793.png" alt="">
        </li>
        <li class="animation-item">
          <img src="//pt-starimg.didistatic.com/static/starimg/img/GRafVY1zeM1544626712637.png" alt="">
        </li>
        <li class="animation-item">
          <img src="//pt-starimg.didistatic.com/static/starimg/img/CW80MCL5pu1544626712665.png" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      offsetX: 0,
      duration: 500
    }
  },
  mounted() {
    this.$_startPlay()
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    $_startPlay() {
      this.timer = setInterval(() => {
        this.$_next()
      }, 2000)
    },
    $_next() {
      if (this.offsetX === 170) {
        this.show = false
        this.duration = 0
        this.offsetX = 0
        this.show = true
      } else {
        this.duration = 500
        this.offsetX += 85
      }
    }
  }
}
</script>

<style lang="stylus">
.home-animation-0
  position relative
  .animation-bg
    width 614px
    height 410px
  .animation-container
    position absolute
    top 65px
    left 134px
    width 85px
    height 85px
    overflow hidden
    .animation-list
      display inline-block
      width 255px
      height 85px
      .animation-item
        float left
        width 85px
        height 85px
        img
          display block
          width 100%

@keyframes animation
  from
    opacity 1
    stroke-dashoffset 35
  to
    opacity 1
    stroke-dashoffset 0
</style>
