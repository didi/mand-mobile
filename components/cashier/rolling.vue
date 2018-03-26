<template lang="html">
  <div class="md-cashier-rolling">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="rolling">
      <template v-if="!successFlag">
        <g class="circle" transform="matrix(0, 1, 1, 0, 0, 0)">
          <circle class="loading" cx="50" cy="50" fill="#FFF6F1" stroke="#fc9153" :stroke-width="strokeWidth" :r="radius">
            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite" ></animateTransform>
          </circle>
        </g>
      </template>
      <template v-else>
        <g class="circle">
          <circle class="success" cx="50" cy="50" fill="#FFF6F1" stroke="none" :r="radius"></circle>
        </g>
        <g class="right">
          <line x1="32" y1="47" x2="45" y2="62" style="stroke:#fc9153" :style="{'strokeWidth':strokeWidth}" stroke-dasharray="20"/>
          <line x1="42" y1="62" x2="68.4" y2="40" style="stroke:#fc9153" :style="{'strokeWidth':strokeWidth}" stroke-dasharray="35"/>
        </g>
      </template>
    </svg>
  </div>
</template>

<script>export default {
  name: 'md-cashier-rolling',

  props: {
    size: {
      type: Number,
      default: 70,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      animating: false,
      circleRate: 0,
      rightRate: 0,
      startTmp: Date.now(),
      successFlag: false,
    }
  },

  watch: {
    isSuccess(val) {
      if (val) {
        this.doSuccess()
      } else {
        this.startTmp = Date.now()
        this.successFlag = false
      }
    },
  },

  computed: {
    strokeWidth() {
      return this.size / 16
    },
    strokeDasharray() {
      return `${this.baseStrokeDasharray * this.circleRate} ${this.baseStrokeDasharray * (1 - this.circleRate)}`
    },
    baseStrokeDasharray() {
      return Math.PI * this.size
    },
    radius() {
      return this.size / 2
    },
  },

  mounted() {
    this.isSuccess && this.doSuccess()
  },

  methods: {
    doSuccess() {
      const st = this.startTmp
      const et = Date.now()
      const delay = Math.ceil((et - st) / 2000) * 2000 - (et - st)
      setTimeout(() => {
        this.successFlag = true
      }, delay)
    },
  },
}
</script>

<style lang="stylus">
.md-cashier-rolling
  circle.loading
    will-change auto
    animation circle 2s cubic-bezier(1.0, 0.5, 0.8, 1.0) infinite
    stroke-dashoffset 110
  line
    will-change auto
    &:first-child
      animation line0 .2s cubic-bezier(1.0, 0.5, 0.8, 1.0) forwards
    &:last-child
      opacity 0
      animation line1 .2s cubic-bezier(1.0, 0.5, 0.8, 1.0) .2s forwards

@keyframes line0
  from
    stroke-dashoffset 20
  to
    stroke-dashoffset 0
@keyframes line1
  from
    opacity 1
    stroke-dashoffset 35
  to
    opacity 1
    stroke-dashoffset 0
@keyframes circle
  from
    stroke-dasharray 0 220
  to
    stroke-dasharray 220 0
</style>
