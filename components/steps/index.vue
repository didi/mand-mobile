<template>
  <div class="md-steps">
    <template class="step" v-for="(step, index) of steps">
      <div class="bar"
        v-if="index"
        :key="`bar-${index}`"
        :class="{reached: index<=current}">
      </div>
      <div class="icon-wrapper"
          :key="`icon-${index}`">
        <div
          class="icon"
          :class="{
            reached: index<=current,
            current: index === current,
          }">

          <slot
            name="reached"
            v-if="index < current && $scopedSlots.reached">
          </slot>

          <slot
            name="current"
            v-else-if="index === current && $slots.current">
          </slot>

          <md-icon
            name="circle-right"
            v-else-if="index < current">
          </md-icon>

          <md-icon
            name="circle-alert"
            v-else-if="index === current">
          </md-icon>

          <div
            class="md-stain"
            v-else>
          </div>
        </div>

        <div class="text-wrapper">
          <div class="text">
            {{step.name}}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'md-steps',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    steps: {
      type: Array,
      default() {
        return []
      },
    },
    current: {
      type: Number,
      default: 0,
      validator(currentStep) {
        return currentStep >= 0
      },
    },
  },
}
</script>

<style lang="stylus">
.md-steps
  display flex
  justify-content space-around
  align-items center
  padding 20px 100px 70px
  font-size 28px

  .icon-wrapper
    display flex
    justify-content center
    align-items center
    flex-direction column
    position relative
    min-width steps-size-active
    min-height steps-size-active

  .icon
    display flex
    justify-content center
    align-items center
    color steps-color-active

    >div
      display flex
      justify-content center
      align-items center

    .md-stain
      width steps-size
      height steps-size
      background steps-color
      border-radius 6px

  .text-wrapper
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    width 0
    height 0
    margin auto
    .text
      position absolute
      top 30px
      color color-text-base
      white-space nowrap
      transform translateX(-50%)

  .bar
    flex 1
    margin 0 20px
    border-top steps-border
    transition all 0.3s
    &.reached
      border-top steps-border-active
</style>
