<template>
  <div class="home-animation-1">
    <img class="animation-bg" src="//pt-starimg.didistatic.com/static/starimg/img/txk6OxAGlI1544629726327.png" alt="">
    <div class="animation-container">
      <div class="face">
        <div class="circle"></div>
      </div>
      <div class="face">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {

  }
}
</script>

<style lang="stylus">
.home-animation-1
  position relative
  .animation-bg
    width 544px
    height 503px
  .animation-container
    position absolute
    width 95px
    height 95px
    top 219px
    right 105px
    .face
      position absolute
      border-radius 50%
      border-style solid
      animation rotation 5s linear infinite
      color rgba(255, 255, 255, .3)
      &:nth-child(1)
        width 100%
        height 100%
        border-color currentColor transparent transparent currentColor
        border-width 0.2em 0.2em 0em 0em
        --deg -45deg
        animation-direction normal;
      &:nth-child(2)
        width 70%
        height 70%
        border-color currentColor currentColor transparent transparent
        border-width 0.2em 0em 0em 0.2em
        --deg -135deg
        animation-direction reverse
      .circle
        position absolute
        width 50%
        height 0.1em
        top 50%
        left 50%
        background-color transparent
        transform rotate(var(--deg))
        transform-origin left
        &::before
          position absolute;
          top -.25em
          right -.25em
          content ''
          width .5em
          height .5em
          background-color rgba(255, 255, 255, .8)
          border-radius 50%
          box-shadow 0 0 2em,
                      0 0 4em,
                      0 0 6em,
                      0 0 8em,
                      0 0 10em,
                      0 0 0 0.5em rgba(255, 255, 255, 0.1)

  @keyframes rotation
    to
      transform rotate(1turn)
  
  @media (max-width: 750px)
    .home-animation-1
      .animation-container
        display none
</style>
