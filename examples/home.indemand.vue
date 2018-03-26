<template>
  <div class="md-home">
    <div class="md-home-logo">
      <img src="//manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg" alt="">
    </div>
    <div class="md-home-name" data-in-effect="fadeInLeftBig">
      Mand Mobile
    </div>
    <div class="md-home-time">0%</div>
    <h1 class="md-home-copyright">Produced By DiDi - FDC &times; MFE</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
    }
  },
  mounted() {
    $('.md-home-name')
      .textillate()
      .on('end.tlt')
    this.timeCount(() => {
      this.$router.replace('/category')
    })
  },
  methods: {
    timeCount(fn) {
      const duration = 2000
      const tick = 100
      const per = 100 / (duration / tick)

      let percent = 0
      const time = setInterval(() => {
        if (percent < 100) {
          percent += per
          $('.md-home-time').text(`${parseInt(percent)}%`)
        } else {
          clearInterval(time)
          fn()
        }
      }, tick)
    },
  },
}

</script>

<style lang="stylus">
.md-home
  position fixed
  absolute-pos()
  background color-bg-base
  .md-home-logo
    position absolute
    top 30%
    left 50%
    transform translateX(-50%)
  .md-home-name
    position absolute
    width 100%
    top 45%
    left 0
    font-size font-heading-medium
    font-weight 300
    color color-text-minor
    text-align center
    span.word5
      .char1, .char2, .char3
        color color-text-base
    span.word6 .char1
        color color-text-base
    span.word7 .char1
        color color-text-base
  .md-home-time
    position absolute
    width 100%
    top 50%
    left 0
    font-size font-minor-normal
    color color-text-minor
    text-align center
  .md-home-copyright
    position fixed
    left 0
    bottom 20px
    width 100%
    text-align center
    font-size font-minor-normal
    font-weight 300
    color color-text-caption
</style>
