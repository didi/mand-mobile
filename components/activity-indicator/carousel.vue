<template>
  <div class="md-activity-indicator-carousel">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      :fill="color"
      :style="{width: `${viewWidth}px`, height: `${size}px`}"
      class="md-activity-indicator-svg carouseling"
    >
      <md-activity-indicator-carousel-circle
        v-for="(value, index) in circleAnimateValues"
        :key="`carousel-circle-${index}`"
        :size="size"
        :index="index"
        :animate-values="value"
      ></md-activity-indicator-carousel-circle>
    </svg>
  </div>
</template>

<script>import CarouselCircle from './carousel-circle'

export default {
  name: 'md-activity-indicator-carousel',

  components: {
    [CarouselCircle.name]: CarouselCircle,
  },

  props: {
    size: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
  },

  data() {
    return {
      circleAnimateValues: [
        [1, 0.8, 0.6, 0.6, 0.6, 0.8, 1],
        [0.6, 0.8, 1, 0.8, 0.6, 0.6, 0.6],
        [0.6, 0.6, 0.6, 0.8, 1, 0.8, 0.6],
      ],
    }
  },

  computed: {
    viewWidth() {
      const size = this.size
      const len = this.circleAnimateValues.length
      return len * size + (len - 1) * size / 2
    },
    viewBox() {
      return `0 0 ${this.viewWidth} ${this.size}`
    },
  },
}
</script>

<style lang="stylus">
.md-activity-indicator-carousel
  clearfix()
  .carouseling
    float left
    overflow visible
</style>
