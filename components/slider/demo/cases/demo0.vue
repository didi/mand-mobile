<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity"></md-slider>
	</div>
</template>

<script>import {Slider} from 'mand-mobile'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '基本',
  titleEnUS: 'Basic',
  /* DELETE */
  components: {
    [Slider.name]: Slider,
  },
  data() {
    return {
      quantity: 25,
    }
  },
}
</script>
