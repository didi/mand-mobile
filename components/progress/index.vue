<template>
  <md-activity-indicator-rolling
    class="md-progress"
    :process="formatValue"
    :size="size"
    :width="width"
    :color="color"
    :border-color="borderColor"
    :fill="fill"
    :linecap="linecap"
    :rotate="rotate"
  >
    <slot></slot>
    <template slot="defs">
      <slot name="defs"></slot>
    </template>
  </md-activity-indicator-rolling>
</template>

<script>import Roller from '../activity-indicator/roller'
import {noop, inBrowser} from '../_util'
import Animate from '../_util/animate'

export default {
  name: 'md-progress',

  components: {
    [Roller.name]: Roller,
  },

  props: {
    size: {
      type: Number,
      default: 70,
    },
    width: {
      type: Number,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
    borderColor: {
      type: String,
      default: 'rgba(0, 0, 0, .1)',
    },
    fill: {
      type: String,
      default: 'transparent',
    },
    linecap: {
      // butt | round
      type: String,
      default: 'round',
    },
    rotate: {
      type: Number,
      default: 0,
    },
    value: {
      // progress control 0-1
      type: Number,
      default: 0,
    },
    transition: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },

  data() {
    return {
      formatValue: 0,
      isMounted: false,
    }
  },

  watch: {
    value: {
      handler(val, oldVal) {
        /* istanbul ignore if  */
        if ((!inBrowser && !this.isMounted) || !this.transition) {
          this.formatValue = val
          return
        }

        this.$_doAnimateDisplay(oldVal, val)
      },
      immediate: true,
    },
  },

  mounted() {
    this.isMounted = true
  },

  methods: {
    // MARK: private methods
    $_doAnimateDisplay(fromValue = 0, toValue = 0) {
      /* istanbul ignore next  */
      const step = percent => {
        this.formatValue = fromValue + (toValue - fromValue) * percent
      }

      const verify = id => id
      /* istanbul ignore next  */
      Animate.start(step, verify, noop, this.duration)
    },
  },
}
</script>
