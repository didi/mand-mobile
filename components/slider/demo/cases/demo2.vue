<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity" :format="format"></md-slider>
	</div>
</template>

<script>import {Slider} from 'mand-mobile'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '格式化',
  titleEnUS: 'Format',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  data() {
    return {
      quantity: 50,
    }
  },
  methods: {
    format(val) {
      return '￥' + val
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
