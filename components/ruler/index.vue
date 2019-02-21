<template>
  <div
    class="md-ruler"
    @touchstart="$_startDrag"
    @touchend="$_stopDrag"
  >
    <canvas
      class="md-ruler-canvas"
      ref="canvas"
    ></canvas>
    <div class="md-ruler-cursor"></div>
    <div class="md-ruler-arrow"></div>
  </div>
</template>

<script>import Scroller from '../_util/scroller'

export default {
  name: 'md-ruler',

  components: {},

  props: {
    value: {
      type: Number,
      default: 0,
    },
    scope: {
      type: Array,
      default: () => [0, 100],
    },
    step: {
      type: Number,
      default: 10,
    },
    unit: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    bouncing: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      ctx: null,
      clientHeight: 60,
      scroller: null,
      ratio: 2,

      isDragging: false,

      x: 0,
      scrollingX: 0,
      blank: 20, // unit blank

      dragMousePos: 0,
      lastMovingLength: 0,
    }
  },

  computed: {
    unitCount() {
      const {scope: [min, max], unit} = this
      return Math.ceil((max - min) / unit)
    },

    canvasWidth() {
      return this.$refs.canvas.clientWidth * this.ratio
    },

    realMin() {
      const {scope, min} = this
      const [left] = scope
      return min > left ? min : left
    },

    realMax() {
      let {scope, max} = this
      const [left, right] = scope
      if (left > max) {
        max = right
      }
      return max > right ? right : max
    },

    blankLeft() {
      const {scope, realMin, unit, blank} = this
      const [min] = scope
      return Math.ceil((realMin - min) / unit) * blank
    },

    blankRight() {
      const {scope, realMax, unit, blank} = this
      const [, max] = scope
      return Math.ceil((max - realMax) / unit) * blank
    },
  },

  mounted() {
    const {$refs} = this

    this.ctx = $refs.canvas.getContext('2d')

    this.$_initCanvas()
    this.x = this.canvasWidth
    this.$_initScroller()
  },

  methods: {
    // MARK: private methods
    $_initCanvas() {
      const {ratio, ctx, canvasWidth, clientHeight, $refs} = this
      const {canvas} = $refs

      canvas.width = canvasWidth
      canvas.height = clientHeight * ratio

      const scale = 1 / ratio
      ctx.scale(scale, scale)
    },

    $_initScroller() {
      const {blankLeft, blankRight, blank, unitCount, canvasWidth, clientHeight} = this

      const scroller = new Scroller(
        left => {
          this.$_draw(left)
        },
        {
          scrollingX: true,
          scrollingY: false,
          bouncing: this.bouncing,
          zooming: false,
          animationDuration: 200,
          inRequestAnimationFrame: true,
          scrollingComplete: () => {
            this.$_redressX()
          },
        },
      )

      // set real scroll width
      const innerWidth = unitCount * blank + canvasWidth - blankLeft - blankRight
      const x = this.$_initX()
      scroller.setDimensions(canvasWidth, clientHeight, innerWidth, clientHeight)
      scroller.scrollTo(x, 0, false)

      this.scroller = scroller
      this.isInitialed = true
    },

    $_initX() {
      const {value, scope, realMin, realMax, unit, blank, unitCount, canvasWidth} = this
      const [min] = scope

      this.x = canvasWidth - Math.ceil((realMin - min) / unit) * blank

      if (value <= realMin) {
        return 0
      } else if (value >= realMax) {
        return unitCount * blank
      } else {
        return Math.ceil((value - realMin) / unit) * blank
      }
    },

    $_redressX() {
      if (!this.isInitialed) {
        return
      }
      const {x, value, scope, unit, blank, canvasWidth, scrollingX} = this
      const [min] = scope
      const range = Math.floor((value - min) / unit) * blank

      const length = canvasWidth - x - range
      this.scroller.scrollTo(scrollingX + length, 0, true)
    },

    $_draw(left) {
      left = +left.toFixed(2)
      const {ctx, ratio, scrollingX, canvasWidth, clientHeight} = this

      this.scrollingX = left
      this.x += scrollingX - left

      // clear canvas
      const scale = ratio * ratio
      ctx.clearRect(0, 0, canvasWidth * scale, clientHeight * scale)

      this.$_drawLine()
    },

    $_drawLine() {
      const {ctx, x, scope, step, unit, ratio, blank, unitCount} = this
      const {blankLeft, blankRight, canvasWidth, clientHeight} = this
      const [scopeLeft] = scope

      const _height = clientHeight * ratio
      const _y = 104
      const _fontSize = 38

      const _stepUnit = Math.round(step / unit)

      ctx.lineWidth = 2

      for (let i = 0; i <= unitCount; i++) {
        const _x = x + i * blank

        if (_x < 0 || _x > canvasWidth * 2) {
          continue
        }

        // over range use another color
        const outRange = _x < x + blankLeft || _x > x + 1 + unitCount * blank - blankRight
        if (outRange) {
          ctx.fillStyle = '#E2E4EA'
          ctx.strokeStyle = '#E2E4EA'
        } else {
          ctx.fillStyle = '#C5CAD5'
          ctx.strokeStyle = '#858B9C'
        }

        ctx.beginPath()
        ctx.moveTo(_x, _y)

        if (i % _stepUnit === 0) {
          // draw text
          const text = scopeLeft + unit * i
          const textOffset = String(text).length * _fontSize / 2
          ctx.font = `${_fontSize * ratio}px DINPro-Medium`
          ctx.fillText(text, _x - textOffset, _height + 80)

          // draw line
          ctx.lineTo(_x, 0)
        } else {
          ctx.lineTo(_x, _y - 52)
        }
        ctx.stroke()
      }

      // draw base line
      ctx.strokeStyle = '#E2E4EA'
      ctx.beginPath()
      ctx.moveTo(x, _y)
      ctx.lineTo(x + unitCount * blank, _y)
      ctx.stroke()

      this.$_updateValue()
    },

    $_startDrag(event) {
      if (this.isDragging) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      this.scroller.doTouchStart(event.touches, event.timeStamp)

      this.isDragging = true

      window.addEventListener('mousemove', this.$_onDrag)
      window.addEventListener('touchmove', this.$_onDrag)
    },

    $_onDrag(event) {
      event.preventDefault()
      event.stopPropagation()
      if (!this.isDragging) {
        return
      }
      this.scroller.doTouchMove(event.touches, event.timeStamp, event.scale)
    },

    $_stopDrag(event) {
      event.preventDefault()
      event.stopPropagation()
      this.isDragging = false

      this.scroller.doTouchEnd(event.timeStamp)

      window.removeEventListener('mousemove', this.$_onDrag)
      window.removeEventListener('touchmove', this.$_onDrag)
    },

    $_updateValue() {
      const {x, scope: [min], realMin, realMax, unit, blank, canvasWidth} = this

      if (x > canvasWidth) {
        this.$_onInput(realMin)
        return
      }

      const _x = x >= 0 ? Math.abs(x - canvasWidth) : Math.abs(x) + canvasWidth
      let value = min + Math.round(_x / blank) * unit

      value > realMax && (value = realMax)
      value < realMin && (value = realMin)
      this.$_onInput(value)
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onInput(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="stylus">
.md-ruler
  position relative
  padding 60px 0 20px
  width 100%
  height 176px
  box-sizing border-box
  .md-ruler-canvas
    width 100%
    height 60px
  .md-ruler-cursor
    z-index 10
    position absolute
    top 24px
    left 50%
    width 2px
    height 62px
    transform translate(-50%)
    background-color #2F86F6
    box-shadow 0 2px 4px #2F86F6
  .md-ruler-arrow
    z-index 10
    position absolute
    bottom 25px
    left 50%
    border-bottom 13px solid #2F86F6
    border-left 13px solid transparent
    border-right 13px solid transparent
    transform translate(-50%)
</style>
