<template>
  <svg
    v-if="name"
    class="md-icon"
    :class="[`md-icon-${name}`, size]"
    :style="{fill: color}"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#${name}`"/>
  </svg>
</template>

<script>import loadSprite from './load-spirte'

export default {
  name: 'md-icon',

  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: '',
    },
  },

  mounted() {
    loadSprite()
  },
}
</script>

<style lang="stylus">
.md-icon
  background-size contain
  fill currentColor
  // size
  &.xss
    width icon-size-xxs
    height icon-size-xxs
  &.xs
    width icon-size-xs
    height icon-size-xs
  &.sm
    width icon-size-sm
    height icon-size-sm
  &.md
    width icon-size-md
    height icon-size-md
  &.lg
    width icon-size-lg
    height icon-size-lg
</style>