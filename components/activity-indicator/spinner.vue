<template>
  <div
    class="md-activity-indicator-spinning"
    :class="{dark: color === 'dark'}"
  >
    <md-icon
      class="md-activity-indicator-svg"
      name="spinner"
      :style="{width: `${size}px`, height: `${size}px`}"
    ></md-icon>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'md-activity-indicator-spinning',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    size: {
      type: Number,
      default: 70,
    },
    color: {
      type: String,
      default: 'dark',
      validator(val) {
        return val === 'dark' || val === 'light'
      },
    },
  },
}
</script>

<style lang="stylus">
.md-activity-indicator-spinning
  clearfix()
  .md-icon
    float left
  &.dark
    .md-icon
      filter invert(1)
</style>
