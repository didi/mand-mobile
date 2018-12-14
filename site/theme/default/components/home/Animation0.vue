<template>
  <div class="home-animation-0">
    <img class="animation-bg" src="//pt-starimg.didistatic.com/static/starimg/img/XEowm9ygfF1544626192687.png" alt="">
    <div class="animation-container animation-container-0">
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
    <div class="animation-container animation-container-1"><p></p></div>
    <div class="animation-container animation-container-2"><p></p></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      offsetX: 0,
      offsetXPer: 0,
      duration: 500,
      dir: -1,
    }
  },
  mounted() {
    this.$_startPlay()
    this.offsetXPer = $(window).width() <= 750 ? 50 : 85
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
      if (this.offsetX === this.offsetXPer * 2 || this.offsetX === 0) {
        this.dir = this.dir * -1
      }
      this.offsetX += (this.offsetXPer * this.dir)
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
  .animation-container-0
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
  .animation-container-1
    position absolute
    width 175px
    height 266px
    top 53px
    left 404px
    overflow hidden
    p
      position absolute
      width 10px
      height 100%
      top 0
      left -100%
      opacity .3
      background #CCC
      transition all 1s ease-out
      transform skewX(-25deg)
      animation reflect 1s ease-in-out 1.5s
  .animation-container-2
    position absolute
    width 82px
    height 82px
    border-radius 50%
    top 146px
    right 44px
    animation rotation 30s linear infinite
    p
      position absolute
      width 25px
      height 25px
      top 6px 
      left 6px
      background-color rgba(255, 255, 255, .5)
      border-radius 50%
      box-shadow 0 0 20px #FFF

@keyframes reflect
	0%
		left -100%
	100%
		left 200%

@media (max-width: 750px)
  .home-animation-0
    .animation-container
      display none

</style>
