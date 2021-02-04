<template>
  <div class="md-water-mark">
    <div class="water-mark-container">
      <slot></slot>
    </div>
    <div
      v-if="!!$scopedSlots.watermark || content"
      class="water-mark-list"
      ref="mark"
    >
      <div
        class="water-mark-list-wrapper"
        :style="{
           opacity,
           transform: `rotate(${rotate}deg)`
         }"
      >
        <template v-if="content">
          <canvas ref="canvas" class="water-mark-canvas"></canvas>
        </template>
        <template v-else-if="!!$scopedSlots.watermark">
          <ul
            v-for="i in (repeatY ? repetition : 1)"
            class="water-mark-line"
            :style="{
            marginBottom: spacing,
          }"
            :key="`line-${i}`"
          >
            <li
              v-for="j in (repeatX ? repetition : 1)"
              class="water-mark-item"
              :style="i % 2 === 0 ? {
              marginLeft: repeatX ? spacing : 0,
            } : {
              marginRight: repeatX ? spacing : 0,
            }"
              :key="`item-${j}`"
            >
              <slot
                name="watermark"
                :coord="{row: i, col: j}"
              ></slot>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>import {getDpr} from '../_util'

const fontSize = 14
const color = '#858B9C'

export default {
  name: 'md-water-mark',

  props: {
    content: {
      type: String,
      default: '',
    },
    spacing: {
      type: [String, Number],
      default: '20vw',
    },
    repeatX: {
      type: Boolean,
      default: true,
    },
    repeatY: {
      type: Boolean,
      default: true,
    },
    rotate: {
      type: [String, Number],
      default: -30,
    },
    opacity: {
      type: [String, Number],
      default: 0.1,
    },
  },

  data() {
    return {
      repetition: process.env.MAND_ENV === 'test' ? 2 : 50,
    }
  },

  mounted() {
    if (this.content) {
      this.ctx = this.$refs.canvas.getContext('2d')
      this.ratio = Math.max(getDpr(), 2) // min ratio = 2

      this.$_initCanvas()
      this.$_computedSpacing()
      this.$_draw()
    }
  },

  methods: {
    $_initCanvas() {
      const {ctx, ratio, $refs} = this
      const {mark, canvas} = $refs
      const {clientWidth, clientHeight} = mark

      this.ctxWidth = canvas.width = clientWidth * ratio
      this.ctxHeight = canvas.height = clientHeight * ratio

      ctx.scale(1 / ratio, 1 / ratio)
    },

    $_computedSpacing() {
      const {spacing, ratio} = this

      if (typeof spacing === 'number') {
        this.realSpacing = spacing
        return
      }
      const [, amount = 20, unit = 'vw'] = /([0-9]+)([A-Za-z]+)/.exec(spacing)

      if (unit === 'px') {
        this.realSpacing = amount
      } else if (unit === 'vh') {
        const height = window.screen.height
        this.realSpacing = amount * height / 100
      } else if (unit === 'vw') {
        const width = window.screen.width
        this.realSpacing = amount * width / 100
      }

      this.realSpacing *= ratio
    },

    $_draw() {
      const {content, ctx, realSpacing, ratio, ctxWidth, ctxHeight} = this

      const _fontSize = fontSize * ratio
      const contentLength = content.length * _fontSize
      const xCount = Math.ceil(ctxWidth * ratio / (contentLength + realSpacing))
      const yCount = Math.ceil(ctxHeight * ratio / (_fontSize + realSpacing))

      ctx.font = `${_fontSize}px DIN Alternate, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`
      ctx.fillStyle = color

      let ctxX = 0
      let ctxY = 0
      for (let y = 0; y < yCount; y++) {
        ctxX = 0
        for (let x = 0; x < xCount; x++) {
          ctx.fillText(content, ctxX, ctxY)
          ctxX += contentLength
        }
        ctxY += _fontSize + realSpacing
      }
    },
  },
}
</script>

<style lang="stylus">
.md-water-mark
  position relative
  overflow hidden

.water-mark-container
  position relative
  z-index 2

.water-mark-list
  clearfix()
  absolute-pos()
  position absolute
  filter grayscale(100%)
  display flex
  flex-direction column
  justify-content center
  overflow hidden

  .water-mark-canvas
    position absolute
    top 0
    left 0
    transform translate3d(-50%, -50%, 0)

.water-mark-line
  position relative
  left 50%
  float left
  width 10000%
  display flex
  justify-content center
  transform translateX(-50%)

.water-mark-item
  float left
  font-size font-body-large
  color color-text-caption
</style>
