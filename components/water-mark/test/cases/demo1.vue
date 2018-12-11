<template>
  <div class="md-example-child md-example-child-water-mark-0">
    <md-water-mark
      class="text-container"
      spacing="10vw"
    >
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <p class="text">
        通过<b>作用域插槽</b>的坐标属性(coord)可以对水印行列进行定制
      </p>
      <div slot="watermark" slot-scope="props">
        <span v-if="props.coord.row % 2 "> 奇数行</span>
        <span v-else>偶数行</span>
      </div>
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