<template>
  <div class="md-activity-indicator-rolling">
    <svg
      :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
      :style="{width: `${size}px`, height: `${size}px`}"
      preserveAspectRatio="xMidYMid"
      class="md-activity-indicator-svg rolling"
    >
      <circle
        fill="none"
        :stroke="borderColor"
        :stroke-width="strokeWidth"
        :cx="viewBoxSize/2"
        :cy="viewBoxSize/2"
        :r="radius"
      />
      <g
        v-if="!$slots.default"
        class="circle"
      >
        <circle
          class="stroke"
          :cx="viewBoxSize/2"
          :cy="viewBoxSize/2"
          :fill="fill"
          :stroke="color"
          :stroke-width="strokeWidth"
          :stroke-dashoffset="this.circlePerimeter / 2"
          stroke-linecap="round"
          :r="radius"
          :style="circleStyle"
        >
          <animateTransform
            v-if="process === undefined"
            :dur="`${duration}s`"
            :values="`0 ${viewBoxSize/2} ${viewBoxSize/2};360 ${viewBoxSize/2} ${viewBoxSize/2}`"
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            keyTimes="0;1"
            begin="0"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </g>
      <slot v-else></slot>
    </svg>
  </div>
</template>

<script>export default {
  name: 'md-activity-indicator-rolling',

  props: {
    size: {
      type: Number,
      default: 70,
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
    process: {
      // process control 0-1
      type: Number,
    },
  },

  computed: {
    id() {
      return `${this.$options.name}-keyframes-${this.size}`
    },
    strokeWidth() {
      return this.size / 12
    },
    radius() {
      return this.size / 2
    },
    viewBoxSize() {
      return this.size + 2 * this.strokeWidth
    },
    circlePerimeter() {
      return this.size * 3.1415
    },
    circleStyle() {
      /* istanbul ignore else */
      if (this.process === undefined) {
        return {
          animation: `${this.id} 2s cubic-bezier(0.41, 0.314, 0.8, 0.6) infinite`,
        }
      } else {
        return {
          strokeDasharray: `${this.process * this.circlePerimeter} ${(1 - this.process) * this.circlePerimeter}`,
        }
      }
    },
    duration() {
      return 2
    },
  },

  watch: {
    size: {
      handler() {
        this.$_insertKeyframes()
      },
      immediate: true,
    },
  },

  methods: {
    $_insertKeyframes() {
      const id = this.id
      const keyframes = `from{stroke-dasharray:0 ${this.circlePerimeter};}to{stroke-dasharray:${this
        .circlePerimeter} 0;}`
      const css = `@-webkit-keyframes ${id}{${keyframes}}@keyframes ${id}{${keyframes}}}`

      let isCssExisting = true
      let elem = document.getElementById(id)

      if (!elem) {
        elem = document.createElement('style')
        elem.setAttribute('type', 'text/css')
        elem.setAttribute('id', id)
        isCssExisting = false
      }

      /* istanbul ignore else */
      if ('textContent' in elem) {
        elem.textContent = css
      } else {
        elem.styleSheet.cssText = css
      }

      if (!isCssExisting) {
        document.getElementsByTagName('head')[0].appendChild(elem)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-activity-indicator-rolling
  clearfix()
  .rolling
    float left
    circle.stroke
      will-change auto
</style>
