<template>
  <div
    class="md-steps"
    :class="{
      'md-steps-vertical': direction == 'vertical',
      'md-steps-horizontal': direction == 'horizontal',
      'vertical-adaptive': direction == 'vertical' && verticalAdaptive,
      'no-current': currentLength % 1 !== 0
    }"
  >
    <slot v-if="custom" :steps="steps"></slot>
    <template v-else v-for="(step, index) of steps">
      <div class="step-wrapper"
        :class="[$_getStepStatusClass(index)]"
        :key="`steps-${index}`"
      >
        <!-- Customize uniformly -->
        <div v-if="$scopedSlots.icon" class="icon-wrapper" >
          <slot name="icon" :index="index" :current-index="currentLength"></slot>
        </div>
        <!-- Customize by status-->
        <div v-else class="icon-wrapper">
          <template v-if="index < currentLength">
            <slot
              v-if="$scopedSlots.reached || $slots.reached"
              name="reached"
              :index="index"
            ></slot>
            <div v-else class="step-node-default">
              <div class="step-node-default-icon" style="width: 6px;height: 6px;border-radius: 50%;"></div>
            </div>
          </template>
          <template v-else-if="index === currentLength">
            <slot
              v-if="$scopedSlots.current || $slots.current"
              name="current"
              :index="index"
            ></slot>
            <md-icon v-else name="success"></md-icon>
          </template>
          <template v-else>
            <slot
              v-if="$scopedSlots.unreached || $slots.unreached"
              name="unreached"
              :index="index"
            ></slot>
            <div v-else class="step-node-default">
              <div class="step-node-default-icon" style="width: 6px;height: 6px;border-radius: 50%;"></div>
            </div>
          </template>
        </div>
        <div class="text-wrapper">
          <slot
            v-if="$scopedSlots.content"
            name="content"
            :index="index"
            :step="step"
          ></slot>
          <template v-else>
            <div class="name">
              {{step.name}}
            </div>
            <div class="desc" v-if="step.text">
              {{step.text}}
            </div>
          </template>
        </div>
      </div>
      <div class="bar"
        :class="[direction === 'horizontal' ? 'horizontal-bar' : 'vertical-bar']"
        :style="$_getStepSizeForStyle(index)"
        :key="`bar-${index}`"
      >
        <i
          class="bar-inner"
          v-if="progress[index]"
          :style="$_barInnerStyle(index)"
        ></i>
      </div>
    </template>
  </div>
</template>

<script>import Icon from '../icon'
import {toArray} from '../_util'

export default {
  name: 'md-steps',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    steps: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    current: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0
      },
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    transition: {
      type: Boolean,
      default: false,
    },
    verticalAdaptive: {
      type: Boolean,
      default: false,
    },
    custom: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      initialed: false,
      progress: [],
      stepsSize: [],
      currentLength: 0,
      duration: 0.3,
      timer: null,
    }
  },

  computed: {
    $_barInnerStyle() {
      return index => {
        const {progress} = this
        const transform =
          this.direction === 'horizontal'
            ? `(${(progress[index]['len'] - 1) * 100}%, 0, 0)`
            : `(0, ${(progress[index]['len'] - 1) * 100}%, 0)`
        return {
          transform: `translate3d${transform}`,
          transition: `all ${progress[index]['time']}s linear`,
        }
      }
    },
  },

  watch: {
    current(val, oldVal) {
      const currentStep = this.$_formatValue(val)
      const newProgress = this.$_sliceProgress(currentStep)
      if (this.transition) {
        const isAdd = currentStep >= oldVal
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$_doTransition(newProgress, isAdd, len => {
            if ((isAdd && len > this.currentLength) || (!isAdd && len < this.currentLength)) {
              this.currentLength = len
            }
          })
        }, 100)
      } else {
        this.progress = newProgress
        this.currentLength = currentStep
      }
    },
  },

  created() {
    const currentStep = this.$_formatValue(this.current)
    this.currentLength = currentStep
    this.progress = this.$_sliceProgress(currentStep)
  },
  mounted() {
    this.$_initStepSize()
  },
  updated() {
    this.$nextTick(() => {
      this.$_initStepSize()
    })
  },

  methods: {
    // MARK: private methods
    $_initStepSize() {
      if (this.direction !== 'vertical' || this.verticalAdaptive) {
        return
      }
      const iconWrappers = this.$el.querySelectorAll('.icon-wrapper')
      const textWrappers = this.$el.querySelectorAll('.text-wrapper')
      const stepsSize = toArray(textWrappers).map((wrapper, index) => {
        let stepHeight = wrapper.clientHeight
        const iconHeight = iconWrappers[index].clientHeight
        if (index === textWrappers.length - 1) {
          // The last step needs to subtract floated height
          stepHeight -= iconHeight
        } else {
          // Add spacing between steps to prevent distance too close
          stepHeight += 40
        }
        return stepHeight > 0 ? stepHeight : 0
      })

      if (stepsSize.toString() !== this.stepsSize.toString()) {
        this.stepsSize = stepsSize
      }
    },
    $_getStepSizeForStyle(index) {
      const size = this.direction === 'vertical' && !this.verticalAdaptive ? this.stepsSize[index] : 0
      return size
        ? {
            height: `${size}px`,
          }
        : null
    },
    $_getStepStatusClass(index) {
      const currentLength = this.currentLength

      let status = []

      if (index < currentLength) {
        status.push('reached')
      }

      if (index === Math.floor(currentLength)) {
        status.push('current')
      }

      return status.join(' ')
    },
    $_formatValue(val) {
      if (val < 0) {
        return 0
      } else if (val > this.steps.length - 1) {
        return this.steps.length - 1
      } else {
        return val
      }
    },
    $_sliceProgress(current) {
      return this.steps.slice(0, this.steps.length - 1).map((step, index) => {
        const offset = current - index
        const progress = this.progress[index]
        const isNewProgress = progress === undefined
        let len, time
        if (offset <= 0) {
          len = 0
        } else if (offset >= 1) {
          len = 1
        } else {
          len = offset
        }
        time = (isNewProgress ? len : Math.abs(progress.len - len)) * this.duration
        return {
          len,
          time,
        }
      })
    },
    $_doTransition(progress, isAdd, step) {
      let currentLength = isAdd ? 0 : this.currentLength
      const walk = index => {
        if ((index < progress.length) & (index > -1) && progress[index]) {
          if (isAdd) {
            currentLength += progress[index].len
          } else {
            currentLength -= this.progress[index].len - progress[index].len
          }

          setTimeout(() => {
            index += isAdd ? 1 : -1
            step(currentLength)
            walk(index)
          }, progress[index].time * 1000)
        }
        this.$set(this.progress, index, progress[index])
      }
      walk(isAdd ? 0 : progress.length - 1)
    },
  },
}
</script>

<style lang="stylus">
.md-steps
  display flex
  justify-content space-around
  font-size 28px

  &.md-steps-horizontal
    align-items center
    padding 40px 100px 100px
    .step-wrapper
      margin 0 4px
      justify-content center
      align-items center
      flex-direction column
      &.reached
        .text-wrapper .name
          color steps-text-color
      &.current
        .text-wrapper .name
          color steps-color-active
    .text-wrapper
      top 100%
      padding-top steps-text-gap-horizontal
      text-align center
      .name
        color steps-desc-color
      .desc
        margin-top 10px
        color steps-desc-color
    &.no-current
      .reached:last-of-type
        display none !important

  &.md-steps-vertical
    align-items flex-start
    padding 40px
    flex-direction column
    &.vertical-adaptive
      justify-content normal
      padding 40px 40px 8px
      .bar.vertical-bar
        flex 1
    .step-wrapper
      width 100%
      margin 4px 0
      align-items stretch
      .icon-wrapper
        position relative
        .step-node-default
          min-width steps-icon-size
          min-height steps-icon-size
      .text-wrapper
        left steps-icon-size
        padding-left steps-text-gap-vertical
        .name, .desc
          white-space normal
        .name
          color steps-text-color
        .desc
          margin-top 18px
          color steps-desc-color

  .icon-wrapper
    display flex
    justify-content center
    align-items center
    color steps-color

    >div
      display flex
      justify-content center
      align-items center
    &:nth-child(2)
      display none

    .step-node-default-icon
      background steps-color

  .step-wrapper
    display flex
    position relative
    min-width steps-icon-size
    min-height steps-icon-size
    .icon-wrapper
      min-width steps-icon-size
      min-height steps-icon-size
      .md-icon
        width steps-icon-size
        height steps-icon-size
        font-size steps-icon-size
        line-height steps-icon-size
    .text-wrapper
      position absolute
      .name, .desc
        white-space nowrap
      .name
        line-height steps-text-font-size
        font-size steps-text-font-size
      .desc
        line-height steps-text-font-size
        font-size steps-desc-font-size
    &.reached, &.current
      .icon-wrapper
        color steps-color-active
        .step-node-default-icon
          background steps-color-active

  .bar
    position relative
    background-color steps-color
    overflow hidden
    .bar-inner
      z-index 10
      position absolute
      top 0
      left 0
      display block
      content ''
      transition all linear 1s
    &.horizontal-bar
      flex 1
      height steps-border-size
      .bar-inner
        width 100%
        height steps-border-size
        background-color steps-color-active
    &.vertical-bar
      left 16px
      width steps-border-size
      transform translateX(-50%)
      .bar-inner
        width steps-border-size
        height 100%
        background-color steps-color-active
    &:last-of-type
      &.horizontal-bar
        display none
      &.vertical-bar
        visibility hidden
</style>
