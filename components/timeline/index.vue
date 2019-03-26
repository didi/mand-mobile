<template>
  <div
    class="md-timeline"
    :class="{
      'md-timeline-vertical': direction === 'vertical',
      'md-timeline-horizontal': direction === 'horizontal',
      'vertical-adaptive': direction === 'vertical' && verticalAdaptive,
      'no-current': currentLength % 1 !== 0
    }"
  >
    <template v-for="(step, index) of steps">
      <div
        :key="`steps-${index}`"
        class="step-wrapper"
        :class="[$_getStepStatusClass(index)]"
      >
        <div class="time-wrapper">
          <slot
            v-if="$scopedSlots.timeFlag"
            name="content"
            :index="index"
            :step="step"
          />
          <template v-else>
            <div class="name">
              {{ step.timeFlag }}
            </div>
            <div
              v-if="step.timeFlagDesc"
              class="desc"
            >
              {{ step.timeFlagDesc }}
            </div>
          </template>
        </div>
        <div class="icon-wrapper">
          <slot
            v-if="index < currentLength && (($scopedSlots.reached) || $slots.reached)"
            name="reached"
            :index="index"
          />
          <slot
            v-else-if="index === currentLength && (($scopedSlots.current) || $slots.current)"
            name="current"
            :index="index"
          />
          <md-icon
            v-else-if="index === currentLength"
            name="success"
          />
          <div
            v-else
            class="step-node-default"
          >
            <div
              class="step-node-default-icon"
              style="width: 8px;height: 8px;border-radius: 50%;"
            />
          </div>
        </div>
        <div class="text-wrapper">
          <slot
            v-if="$scopedSlots.timeFlagMsg"
            name="content"
            :index="index"
            :step="step"
          />
          <template v-else>
            <div class="name">
              {{ step.timeFlagMsg }}
            </div>
            <div
              v-if="step.timeFlagMsgDesc"
              class="desc"
            >
              {{ step.timeFlagMsgDesc }}
            </div>
          </template>
        </div>
      </div>
      <div
        :key="`bar-${index}`"
        class="bar"
        :class="[direction === 'horizontal' ? 'horizontal-bar' : 'vertical-bar']"
        :style="$_getStepSizeForStyle(index)"
      >
        <i
          v-if="progress[index]"
          class="bar-inner"
          :style="$_barInnerStyle(index)"
        />
      </div>
    </template>
  </div>
</template>

<script>
  import MdIcon from '../icon';
  import {toArray} from '../_util';

  export default {
    name: 'MdTimeline',

    components: {
      [MdIcon.name]: MdIcon
    },

    props: {
      type: {
        type: String,
        default: ''
      },
      steps: {
        type: Array,
        default() {
          /* istanbul ignore next */
          return [];
        }
      },
      step: {
        type: Number,
        default: -1
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      transition: {
        type: Boolean,
        default: false
      },
      verticalAdaptive: {
        type: Boolean,
        default: false
      },
      shortInactiveSteps: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        initialed: false,
        progress: [],
        stepsSize: [],
        currentLength: 0,
        duration: 0.3,
        timer: null
      };
    },

    computed: {
      $_barInnerStyle() {
        return index => {
          const {progress} = this;
          const transform
            = this.direction === 'horizontal'
            ? `(${(progress[index].len - 1) * 100}%, 0, 0)`
            : `(0, ${(progress[index].len - 1) * 100}%, 0)`;
          return {
            transform: `translate3d${transform}`,
            transition: `all ${progress[index].time}s linear`
          };
        };
      },
      current() {
        if (this.step !== -1) {
          return this.step;
        }
        const current = this.steps.findIndex(item => (item.SysNo === '1'));
        return current === -1 ? 0 : current;
      }
    },
    watch: {
      current(val, oldVal) {
        const currentStep = this.$_formatValue(val);
        const newProgress = this.$_sliceProgress(currentStep);
        if (this.transition) {
          const isAdd = currentStep >= oldVal;
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.$_doTransition(newProgress, isAdd, len => {
              if ((isAdd && len > this.currentLength) || (!isAdd && len < this.currentLength)) {
                this.currentLength = len;
              }
            });
          }, 100);
        }
        else {
          this.progress = newProgress;
          this.currentLength = currentStep;
        }
      }
    },

    created() {
      const currentStep = this.$_formatValue(this.current);
      this.currentLength = currentStep;
      this.progress = this.$_sliceProgress(currentStep);
    },
    mounted() {
      this.$_initStepSize();
    },
    updated() {
      this.$nextTick(() => {
        this.$_initStepSize();
      });
    },

    methods: {
      // MARK: private methods
      $_initStepSize() {
        if (this.direction !== 'vertical' || this.verticalAdaptive) {
          return;
        }
        const iconWrappers = this.$el.querySelectorAll('.icon-wrapper');
        const textWrappers = this.$el.querySelectorAll('.text-wrapper');
        const stepsSize = toArray(textWrappers).map((wrapper, index) => {
          let stepHeight = wrapper.clientHeight || 22;
          const iconHeight = iconWrappers[index].clientHeight || 22;
          if (index === textWrappers.length - 1) {
            // The last step needs to subtract floated height
            stepHeight -= iconHeight;
          }
          else {
            // Add spacing between steps to prevent distance too close
            stepHeight += 16;
          }
          return stepHeight > 0 ? stepHeight : 0;
        });

        if (stepsSize.toString() !== this.stepsSize.toString()) {
          this.stepsSize = stepsSize;
        }
      },
      $_getStepSizeForStyle(index) {
        const size = this.direction === 'vertical' && !this.verticalAdaptive ? this.stepsSize[index] : 0;
        return size
          ? {
            height: `${size}px`
          }
          : null;
      },
      $_getStepStatusClass(index) {
        const currentLength = this.currentLength;

        let status = [];

        if (index < currentLength) {
          status.push('reached');
        }

        if (index === Math.floor(currentLength)) {
          status.push('current');
        }

        return status.join(' ');
      },
      $_formatValue(val) {
        if (val < 0) {
          return 0;
        }
        else if (val > this.steps.length - 1) {
          return this.steps.length - 1;
        }
        return val;

      },
      $_sliceProgress(current) {
        return this.steps.slice(0, this.steps.length - 1).map((step, index) => {
          const offset = current - index;
          const progress = this.progress[index];
          const isNewProgress = progress === undefined;
          let len;
          let time;
          if (offset <= 0) {
            len = 0;
          }
          else if (offset >= 1) {
            len = 1;
          }
          else {
            len = offset;
          }
          time = (isNewProgress ? len : Math.abs(progress.len - len)) * this.duration;
          return {
            len,
            time
          };
        });
      },
      $_doTransition(progress, isAdd, step) {
        let currentLength = isAdd ? 0 : this.currentLength;
        const walk = index => {
          if ((index < progress.length) & (index > -1) && progress[index]) {
            if (isAdd) {
              currentLength += progress[index].len;
            }
            else {
              currentLength -= this.progress[index].len - progress[index].len;
            }

            setTimeout(() => {
              index += isAdd ? 1 : -1;
              step(currentLength);
              walk(index);
            }, progress[index].time * 1000);
          }
          this.$set(this.progress, index, progress[index]);
        };
        walk(isAdd ? 0 : progress.length - 1);
      }
    }
  };

</script>

<style lang="stylus">
  @require "./../_style/mixin/util.styl"
  @require "./../_style/mixin/theme.components.styl"
  @require "./../_style/mixin/theme.basic.styl"
  @require "./../../theme.custom.styl"
  @require "./../_style/global.styl"
  .md-timeline
    display flex
    justify-content space-around
    font-size 14px

    &.md-timeline-horizontal
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

    &.md-timeline-vertical
      align-items flex-start
      padding 0
      flex-direction column
      &.vertical-adaptive
        justify-content normal
        padding 0
        .bar.vertical-bar
          flex 1
      .step-wrapper
        width 100%
        height steps-icon-size
        line-height steps-icon-size
        /*margin 4px 0*/
        align-items stretch
        z-index 1
        .time-wrapper
          font-size: 13px
          width: 75px
          display flex
          align-items center
          justify-content flex-end
          margin-right steps-text-gap-vertical
          .name
            color steps-text-color
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
            line-height steps-icon-size
            white-space normal
            text-align left
          .name
            color steps-text-color
          .desc
            /*margin-top 18px*/
            color steps-desc-color
        &.current
          .time-wrapper,
          .text-wrapper
            .name
              color: steps-color-active

    .icon-wrapper
      display flex
      justify-content center
      align-items center
      color steps-color-active

      >div
        display flex
        justify-content center
        align-items center
      &:nth-child(3)
        display none

      .step-node-default-icon
        border: 1px solid steps-color
        background transparent
        box-sizing border-box

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
        .name, .desc
          white-space nowrap
        .name
          line-height steps-text-font-size
          font-size steps-text-font-size
        .desc
          line-height steps-text-font-size
          font-size steps-desc-font-size
      &.reached
        .icon-wrapper .step-node-default-icon
          background steps-color-active
          border-color steps-color-active

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
        left 98px
        margin-top -7px
        margin-bottom -7px
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
          margin 0
</style>
