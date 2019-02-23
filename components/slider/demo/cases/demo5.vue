<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="range" :min="15" :max="80" range></md-slider>
	</div>
</template>

<script>import {Slider} from 'mand-mobile'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '边界值',
  titleEnUS: 'Min & Max',
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
