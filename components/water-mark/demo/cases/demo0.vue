<template>
  <div class="md-example-child md-example-child-water-mark-0">
    <md-water-mark
      class="text-container"
      content="MAND MOBILE"
    >
      <p class="text">
        每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。
      </p>
      <p class="text">
        希望你可以记住我，记住我这样活过，这样在你身边待过。
      </p>
      <p class="text">
        少年时我们追求激情，成熟后却迷恋平庸。在我们寻找、伤害、背离之后，还能一如既往地相信爱情，这是一种勇气。
      </p>
    </md-water-mark>
	</div>
</template>

<script>import {WaterMark} from 'mand-mobile'

export default {
  name: 'water-mark-demo',
  components: {
    [WaterMark.name]: WaterMark,
  },
}
</script>

<style lang="stylus">
.md-example-child-water-mark-0
  .text-container
    padding 32px
    background #FFF
  .text
    margin-bottom 20px
    line-height 1.5
    font-size 24px
    text-indent 2em
</style>