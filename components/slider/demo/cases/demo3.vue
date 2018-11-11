<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="range" range></md-slider>
	</div>
</template>

<script>import {Slider} from 'mand-mobile'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '范围',
  titleEnUS: 'Range',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  data() {
    return {
      range: [25, 50],
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
