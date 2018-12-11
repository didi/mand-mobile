<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity" disabled></md-slider>
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
      quantity: 50,
    }
  },
}
</script>
