<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="bucket" :step="10"></md-slider>
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
      bucket: 10,
    }
  },
}
</script>
