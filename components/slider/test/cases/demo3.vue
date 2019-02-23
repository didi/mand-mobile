<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="range" range></md-slider>
	</div>
</template>

<script>import {Slider} from 'mand-mobile'

export default {
  name: 'slider-demo',
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
