<template>
  <svg class="md-chart" :viewBox="`0 0 ${width} ${height}`">
    <defs>
      <linearGradient
        v-for="color in colors"
        :key="color"
        :id="`path-fill-gradient-${color}`" x1="0" x2="0" y1="0" y2="1">
        <stop :style="`stop-color: ${color}`" offset="0%" stop-opacity="0.4"></stop>
        <stop :style="`stop-color: ${color}`" offset="50%" stop-opacity="0.3"></stop>
        <stop :style="`stop-color: ${color}`" offset="100%" stop-opacity="0.1"></stop>
      </linearGradient>
    </defs>
    <g class="md-chart-graph" :transform="`translate(${offset.left}, ${offset.top})`">
      <g class="md-chart-axis-y">
        <g
          v-for="(item, index) in yaxis"
          :key="index"
          :transform="`translate(0, ${item.offset})`"
        >
          <line x1="0" :x2="innerWidth" y1="0" y2="0"></line>
          <text v-text="item.label" x="0" y="0" dx="-0.5em" dy="0.32em"></text>
        </g>
      </g>
      <g class="md-chart-axis-x" :transform="`translate(0, ${innerHeight})`">
        <g
          v-for="(item, index) in xaxis"
          :key="index"
          :transform="`translate(${item.offset}, 0)`"
        >
          <line x1="0" x2="0" y1="0" y2="6"></line>
          <text v-text="item.label" x="0" y="0" dy="2em"></text>
        </g>
      </g>
      <g class="md-chart-paths">
        <template v-for="(path, index) in paths">
          <path
            class="md-chart-path"
            :key="`line-${index}`"
            :style="path.style"
            :d="path.value"
          ></path>
          <path
            v-if="path.area"
            :key="`area-${index}`"
            class="md-chart-path-area"
            :style="path.area.style"
            :d="path.area.value"
          ></path>
        </template>
      </g>
    </g>
  </svg>
</template>

<script>export default {
  name: 'md-chart',

  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    datasets: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Array,
      default: () => [480, 320],
    },
    max: {
      type: Number,
      default() {
        let max = Math.max.apply(
          Math,
          this.datasets.map(data => {
            return Math.max.apply(Math, data.values)
          }),
        )
        let multiple = 1
        while (max > 10) {
          multiple *= 10
          max /= 10
        }
        max = Math.ceil(max) * multiple

        return max
      },
    },
    min: {
      type: Number,
      default() {
        let min = Math.min.apply(
          Math,
          this.datasets.map(data => {
            return Math.min.apply(Math, data.values)
          }),
        )
        let multiple = 1
        while (min > 10) {
          multiple *= 10
          min = min / 10
        }
        min = Math.floor(min) * multiple

        return min
      },
    },
    lines: {
      type: Number,
      default: 5,
    },
    step: {
      type: Number,
      default() {
        return (this.max - this.min) / this.lines
      },
    },
    shift: {
      type: Number,
      default: 0.6,
    },
    format: {
      type: Function,
      default: val => val,
    },
  },

  data() {
    return {
      unit: 16,
    }
  },

  computed: {
    offset() {
      return {
        top: 0.2 * this.unit,
        bottom: 0.5 * this.unit,
        left: this.shift * this.unit,
        right: 0.2 * this.unit,
      }
    },
    width() {
      if (typeof this.size[0] === 'string' && this.size[0].indexOf('rem') !== -1) {
        return parseFloat(this.size[0]) * this.unit
      } else {
        return parseFloat(this.size[0])
      }
    },
    height() {
      if (typeof this.size[1] === 'string' && this.size[1].indexOf('rem') !== -1) {
        return parseFloat(this.size[1]) * this.unit
      } else {
        return parseFloat(this.size[1])
      }
    },
    innerWidth() {
      return this.width - this.offset.left - this.offset.right
    },
    innerHeight() {
      return this.height - this.offset.top - this.offset.bottom
    },
    xaxis() {
      const deltaX = this.innerWidth / (this.labels.length - 1)
      const items = this.labels.map((label, index) => {
        return {
          offset: index * deltaX,
          label: label,
        }
      })

      return items
    },
    yaxis() {
      const items = []
      const deltaY = this.innerHeight / this.lines

      for (let i = 0; i < this.lines; i++) {
        items.push({
          offset: i * deltaY,
          label: this.format(this.max - i * this.step),
        })
      }

      items.push({
        offset: this.innerHeight,
        label: this.format(this.min),
      })

      return items
    },
    lower() {
      return this.max - (this.lines - 1) * this.step
    },
    paths() {
      return this.datasets.map(data => {
        const deltaX = this.innerWidth / (data.values.length - 1)
        const deltaY = this.innerHeight / this.lines
        const points = data.values.map((value, index) => {
          if (value < this.lower) {
            return {
              x: index * deltaX,
              y: this.innerHeight - (1 - (this.lower - value) / (this.lower - this.min)) * deltaY,
            }
          } else {
            return {
              x: index * deltaX,
              y: (1 - (value - this.lower) / (this.max - this.lower)) * (this.innerHeight - deltaY),
            }
          }
        })

        const ret = {
          style: {
            fill: 'none',
            stroke: data.color || '#fa8919',
            strokeWidth: data.width || 1,
          },
        }

        if (data.theme === 'heat') {
          ret.style.stroke = `url(#path-fill-gradient-${data.color})`
        } else if (data.theme === 'region') {
          ret.area = {
            value:
              `M0,${this.innerHeight} ` +
              points.map(point => `L${point.x},${point.y}`).join(' ') +
              ` L${points[points.length - 1].x},${this.innerHeight}`,
            style: {
              fill: `url(#path-fill-gradient-${data.color})`,
              stroke: 'none',
            },
          }
        }

        ret.value = `M0,${points.shift().y} ` + points.map(point => `L${point.x},${point.y}`).join(' ')

        return ret
      })
    },
    colors() {
      const uniqueColors = []
      this.datasets.map(data => {
        if (data.color && uniqueColors.indexOf(data.color) === -1) {
          uniqueColors.push(data.color)
        }
      })
      return uniqueColors
    },
  },

  // LiftCircle Hook
  mounted() {
    if (document.readyState !== 'loading') {
      this.$_resize()
    }
    document.addEventListener('DOMContentLoaded', this.$_resize)
    window.addEventListener('resize', this.$_resize)
  },
  beforeDestroy() {
    document.removeEventListener('DOMContentLoaded', this.$_resize)
    window.removeEventListener('resize', this.$_resize)
  },

  methods: {
    // MARK: private methods
    $_resize() {
      this.unit = parseFloat(
        window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size'),
      )
    },
  },
}
</script>

<style lang="stylus">
.md-chart
  line
    stroke chart-line-color
    stroke-width 0.5
    stroke-linecap square
  path
    stroke chart-path-color
    stroke-width 1
    stroke-linecap butt

.md-chart-axis-y
  text
    fill chart-text-color
    font-size chart-value-size
    text-anchor end

.md-chart-axis-x
  text
    fill chart-text-color
    font-size chart-label-size
    text-anchor middle
</style>
