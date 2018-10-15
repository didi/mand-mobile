<template>
  <div
    class="md-steps"
    :class="{
      'md-steps-vertical': direction == 'vertical',
      'md-steps-horizontal': direction == 'horizontal'
    }"
  >
    <div
      class="md-step"
      v-for="(step, index) of steps"
      :key="index"
    >
      <div class="horizontal-bar-left horizontal-bar bar"
        :key="`bar-${index}-horizontal-left`"
        :class="{
          'reached-no-delay': index <= cIndex,
          'delay': !increase,
          hide: index == 0
        }"
        v-if="direction == 'horizontal'"
      >
      </div>
      <div
        class="icon-wrapper"
        :key="`icon-${index}`"
      >
        <div
          class="icon"
          :class="{
            reached: index <= cIndex,
            current: index === cIndex
          }"
        >
          <div
            class="vertical-bar-top vertical-bar bar"
            :key="`bar-${index}-vertical-left`"
            :class="{
              'reached-no-delay': index <= cIndex,
              'delay': !increase,
              hide: index == 0
            }"
            v-if="direction == 'vertical'"
          >
          </div>
          <slot
            name="reached"
            :index="index"
            v-if="index < iIndex && ($scopedSlots.reached || $slots.reached)">
          </slot>
          <slot
            name="current"
            :index="index"
            v-else-if="index === iIndex && ($scopedSlots.current || $slots.current)">
          </slot>
          <!-- <md-icon
            name="warn"
            v-else-if="index < iIndex">
          </md-icon> -->
          <md-icon
            name="success"
            v-else-if="index === iIndex">
          </md-icon>
          <div
            class="md-stain-wrap"
            v-else
          >
            <div class="md-stain"></div>
          </div>
          <div class="vertical-bar-bottom vertical-bar bar"
            v-if="direction == 'vertical'"
            :key="`bar-${index}-vertical-bottom`"
            :class="{
              'reached-delay': index <= cIndex,
              hide: index == steps.length - 1
            }"
          >
          </div>
        </div>
        <div class="text-wrapper">
          <div class="text">
            {{step.name}}
          </div>
          <div class="desc" v-if="direction == 'vertical' && step.description">
            {{step.description}}
          </div>
        </div>
      </div>
      <div class="horizontal-bar-right horizontal-bar bar"
        v-if="direction == 'horizontal'"
        :class="{
          'reached-delay': index <= cIndex,
          hide: index == steps.length - 1
        }"
        :key="`bar-${index}-horizontal-right`"
      >
      </div>
    </div>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'md-steps',

  components: {
    [Icon.name]: Icon,
  },

  data() {
    return {
      cIndex: 0,
      iIndex: 0,
      increase: true,
      timeout: null,
      delay: 300, // same as steps-transition-delay * 2
    }
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
    direction: {
      type: String,
      default: 'horizontal',
    },
  },

  watch: {
    current(val, oldVal) {
      this.increase = val >= oldVal
      this.timeout && clearTimeout(this.timeout)
      this.$nextTick(() => {
        this.animate(val, val >= oldVal)
      })
    },
  },

  methods: {
    animate(target, isAdd) {
      this.timeout = setTimeout(() => {
        isAdd ? this.cIndex++ : this.cIndex--
        target !== this.cIndex && this.animate(target, isAdd)

        setTimeout(() => {
          this.iIndex = this.cIndex
        }, this.delay / 2)
      }, this.delay)
    },
  },

  created() {
    this.cIndex = this.current
    this.iIndex = this.current
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
  &.md-steps-horizontal
    .md-step
      flex 1
      display flex
      justify-content space-between
      align-items center
    .bar
      flex 1
      &.delay
        &:before
          transition-delay steps-transition-delay
      &.reached-delay
        &:before
          transform translateX(0)
          transition-delay steps-transition-delay
      &.reached-no-delay
        &:before
          transform translateX(0)
          transition-delay 0s
    .icon-wrapper
      justify-content center
      align-items center
      flex-direction column
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
        white-space nowrap
        transform translateX(-50%)

  &.md-steps-vertical
    flex-direction column
    align-items flex-start
    .icon-wrapper
      align-items stretch
      .icon
        position relative
        align-items center
        flex-direction column
        .bar
          &.delay
            &:before
              transition-delay steps-transition-delay
          &.reached-delay
            &:before
              transform translateY(0)
              transition-delay steps-transition-delay
          &.reached-no-delay
            &:before
              transform translateY(0)
              transition-delay 0s
        .vertical-bar-top
          min-height 40px
        .vertical-bar-bottom
          flex 1
        .md-stain-wrap
          min-width steps-size-active
          min-height steps-size-active
      .text-wrapper
        padding 40px 40px 24px

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
      border-radius steps-size

    &.reached
      .md-icon
        width steps-size-active
        height steps-size-active
        font-size steps-size-active
        line-height steps-size-active
      .md-stain
        background steps-color-active

  .icon-wrapper
    margin 0 4px
    display flex
    position relative
    min-width steps-size-active
    min-height steps-size-active
    .icon
      min-width steps-size-active
      min-height steps-size-active
    .text-wrapper
      .text
        color steps-text-color
        line-height steps-text-font-size
        font-size steps-text-font-size
      .desc
        margin-top 18px
        color steps-desc-color
        line-height steps-text-font-size
        font-size steps-desc-font-size

  .bar
    background-color steps-color
    &.hide
      visibility hidden
    &.horizontal-bar,
    &.vertical-bar
      position relative
      overflow hidden
      &:before
        z-index 10
        position absolute
        top 0
        left 0
        display block
        content ''
        transition all linear steps-transition-delay
    &.horizontal-bar
      height 2px
      &:before
        width 100%
        border-top steps-border-active
        transform translateX(-100%)
    &.vertical-bar
      width 2px
      &:before
        height 100%
        border-right steps-border-active
        transform translateY(-100%)
</style>
