<template>
  <div
    class="md-steps"
    :class="{
      'md-steps-vertical': direction == 'vertical',
      'md-steps-horizontal': direction == 'horizontal'
    }"
  >
    <template v-for="(step, index) of steps">
      <div class="step-wrapper" :key="`step-${index}`">
        <div
          class="icon-wrapper"
          :class="{
            reached: index <= currentLength,
            current: index === currentLength
          }"
        >
          <slot
            v-if="index < currentLength && (($scopedSlots.reached) || $slots.reached)"
            name="reached"
            :index="index"
          ></slot>
          <slot
            v-else-if="index === currentLength && (($scopedSlots.current) || $slots.current)"
            name="current"
            :index="index"
          ></slot>
          <md-icon
            v-else-if="index === currentLength"
            name="success"
          ></md-icon>
          <div v-else class="step-node-default"></div>
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
        v-if="index !== steps.length - 1"
        :class="[direction === 'horizontal' ? 'horizontal-bar' : 'vertical-bar']"
        :key="`bar-${index}`"
      >
        <i
          class="bar-inner"
          v-if="progress[index]"
          :style="{
            transform: `${progress[index]['translate']}(${(progress[index]['len'] - 1) * 100}%)`,
            transition: `all ${progress[index]['time']}s linear`
          }"
        ></i>
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
  },

  data() {
    return {
      initialed: false,
      progress: [],
      currentLength: 0,
      duration: 0.3,
      timer: null,
    }
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

  methods: {
    // MARK: private methods
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
          translate: this.direction === 'horizontal' ? 'translateX' : 'translateY',
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
    .text-wrapper
      top 100%
      padding-top steps-text-gap-horizontal
      text-align center
      .desc
        margin-top 10px
        
  &.md-steps-vertical
    align-items flex-start
    padding 40px 40px 80px
    flex-direction column
    .step-wrapper
      width 100%
      margin 4px 0
      align-items stretch
      .icon-wrapper
        position relative
        justify-content flex-start
        .step-node-default
          min-width steps-icon-size
          min-height steps-icon-size
      .text-wrapper
        left steps-icon-size
        padding-left steps-text-gap-vertical
        .name, .desc
          white-space normal
        .desc
          margin-top 18px

  .icon-wrapper
    display flex
    justify-content center
    align-items center
    color steps-color-active

    >div
      display flex
      justify-content center
      align-items center
    &:nth-child(2)
      display none

    .step-node-default:after
      content ""
      width 12px
      height 12px
      background steps-color
      border-radius 12px

    &.reached
      .step-node-default:after
        background steps-color-active

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
        color steps-text-color
        line-height steps-text-font-size
        font-size steps-text-font-size
      .desc
        color steps-desc-color
        line-height steps-text-font-size
        font-size steps-desc-font-size

  .bar
    position relative
    flex 1
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
</style>
