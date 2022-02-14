<template>
  <div class="pictorial-wrap">
    <div class="pictorial">
      <div class="pic backboard"></div>
      <div class="pic list">
        <div class="hover-wrap">
          <img src="../../assets/images/home/pictorial/list.png" alt="Icon list" />
        </div>
      </div>
      <div class="pic mr-king">
        <div class="hover-wrap">
          <img src="../../assets/images/home/pictorial/mr-king.png" alt="Mr King" />
        </div>
      </div>
      <div
        v-for="icon, i in icons"
        :key="i"
        :class="`pic icon icon${i}`"
      >
        <div class="hover-wrap">
          <img :src="icon" alt="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon0Png from '../../assets/images/home/pictorial/0.png'
import icon1Png from '../../assets/images/home/pictorial/1.png'
import icon2Png from '../../assets/images/home/pictorial/2.png'
import icon3Png from '../../assets/images/home/pictorial/3.png'
import icon4Png from '../../assets/images/home/pictorial/4.png'
import icon5Png from '../../assets/images/home/pictorial/5.png'

export default {
  data() {
    return {
      icons: [icon0Png, icon1Png, icon2Png, icon3Png, icon4Png, icon5Png],
    }
  },
}
</script>

<style lang="stylus" scoped>
  hover-scale(scale)
    width 100%
    height 100%
    transition transform .8s cubic-bezier(.34,1.56,.64,1)
    &:hover
      transform scale(scale)

  icon-offset(index, sum = 6)
    radius = -2em
    radians = PI / ( sum - 1)
    (translate(radius * cos(index * radians), radius * sin(index * radians)))

  .pictorial-wrap
    font-size 100px

    .pictorial
      position relative
      width 7.45em
      height 6.9em

      .pic
        position absolute

      .backboard
        width 6.01em
        height 4.79em
        top .18em
        right .53em
        opacity .4
        background url('../../assets/images/home/pictorial/backboard.png') 0 0 / 100% no-repeat
        animation fadeIn .7s ease-in-out 1 forwards

      .mr-king
        width 3.45em
        height 4.51em
        left .98em
        bottom .1em
        opacity .4
        transition: transform 1s
        transform translateY(0.1em)
        animation mrKing  1s ease-in-out 1 forwards, fadeIn 1s ease-in-out 1 forwards

        .hover-wrap
          hover-scale: 1.05

          img
            width 100%

      .list
        width 3.58em
        height 3.13em
        top 3.64em
        left 3.94em
        opacity 0
        transition: transform 1s
        animation list 0.7s ease-in-out 0s forwards

        .hover-wrap
          hover-scale: 1.05

          img
            width 100%

      .icon
        width 1.2em
        height 1.2em
        top 2.8em
        left 2em

        .hover-wrap
          hover-scale: 1.2

      for n in 0..5
        .icon{n}
          opacity 0
          animation icon-move+n .8s ease-in-out 0s forwards

          img
            width 100%
            if n % 2 is 0
              animation flutter-up 3s ease-in-out .8s infinite alternate
            else
              animation flutter-down 3s ease-in-out .8s infinite alternate

        @keyframes icon-move{n}
          from
            opacity 0
            transform translate(0, 0)
          to
            opacity 1
            transform icon-offset(n)

  @keyframes flutter-down
    0%
      transform translateY(0)

    to
      transform translateY(.1em)

  @keyframes flutter-up
    0%
      transform translateY(0)

    to
      transform translateY(-0.1em)

  @keyframes list
    from
      opacity .4
      transform translate(0)
    to
      opacity 1
      transform translateY(-0.06em)

  @keyframes mrKing
    from
      transform translateY(0.1em)

    to
      transform translate(0)


  @keyframes fadeIn
    from
      opacity 0.4

    to
      opacity 1

  @media (max-width: 1440px)
    .pictorial-wrap
      font-size 80px

  @media (max-width: 750px)
    .pictorial-wrap
      font-size .9rem
      // for delay, index in icon-delay
      //   .icon{index}
      //     opacity 1 !important
      //     transform icon-offset(index)
      //     animation none !important

</style>
