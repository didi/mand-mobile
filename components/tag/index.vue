<template>
  <div class="md-tag">
    <div :class="computedClass" :style="[computedStyle, jsComputedStyle]">
      <template v-if="shape === 'quarter'">
        <div class="quarter-wrap">
          <slot></slot>
        </div>
      </template>
      <template v-else>
        <div
          class="left-coupon"
          :style="{ background: fillColor ? 'radial-gradient(circle at left, transparent 33%, ' + fillColor + ' 33%)' : ''}"
          v-if="shape === 'coupon'"
        >
        </div>
        <slot></slot>
        <div
          class="right-coupon"
          :style="{ background: fillColor ? 'radial-gradient(circle at right, transparent 33%, ' + fillColor + ' 33%)' : ''}"
          v-if="shape === 'coupon'"
        >
        </div>
      </template>
    </div>
  </div>
</template>

<script>export default {
  name: 'md-tag',
  props: {
    size: {
      type: String, // tiny, small, large
      default: 'large',
    },
    shape: {
      // square, circle, fillet, quarter, coupon
      type: String,
      default: 'square',
    },
    type: {
      // fill ghost
      type: String,
      default: 'ghost',
    },
    fillColor: {
      type: String,
      default: '',
    },
    fontWeight: {
      // normal, bold, bolder
      type: String,
      default: 'normal',
    },
    fontColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      jsComputedStyle: {},
    }
  },
  computed: {
    computedClass() {
      return [
        'default',
        `size-${this.size}`,
        `shape-${this.shape}`,
        `type-${this.type}`,
        `font-weight-${this.fontWeight}`,
      ]
    },
    computedStyle() {
      let style = {}
      if (this.type === 'fill') {
        // eslint-disable-next-line
        this.fillColor && (style.backgroundColor = this.fillColor)
      }
      if (this.fontColor) {
        if (this.type === 'ghost') {
          style.borderColor = this.fontColor
        }
        style.color = this.fontColor
      }
      return style
    },
  },
  mounted() {
    const padding = Math.max(this.$el.offsetHeight * 0.15, 3)
    this.$set(this.jsComputedStyle, 'padding', padding + 'px')
    this.$nextTick(() => {
      if (this.shape === 'circle') {
        const height = this.$el.offsetHeight / 2
        this.$set(this.jsComputedStyle, 'paddingLeft', height + 'px')
        this.$set(this.jsComputedStyle, 'paddingRight', height + 'px')
        this.$set(this.jsComputedStyle, 'borderRadius', height + 'px')
      }
      if (this.shape === 'quarter') {
        this.$set(this.jsComputedStyle, 'padding', '0 0 100% 0')
      }
    })
  },
}
</script>

<style lang="stylus">
.md-tag
  color color-text-base
  font-size 28px
  text-align center
  display inline-block
  .default
    background rgba(0,0,0,0)
    color tag-color
    border-color tag-color
  .shape-square
    border-radius 0
  .shape-fillet
    border-radius tag-fillet-radius
  .shape-quarter
    display flex
    height 0
    border-radius 0 0 0 100%
    .quarter-wrap
      display inline-block
      padding 14px 10px 10px 14px
  .shape-coupon
    position relative
    .left-coupon,
    .right-coupon
      position absolute
      top 0
      width 10px
      height 100%
    .left-coupon
      left -10px
    .right-coupon
      right -10px
  .shape-circle
  .size-large
    font-size tag-large-font-size
    padding 5px
  .size-small
    font-size tag-small-font-size
    padding 5px
  .size-tiny
    font-size tag-tiny-font-size
    padding 5px
  .type-fill
    color color-text-base-inverse
    background tag-color
  .type-ghost
    border 1px solid tag-color
    background rgba(0,0,0,0)

  .font-weight-normal
    font-weight normal
  .font-weight-bold
    font-weight bold
  .font-weight-bolder
    font-weight bolder
</style>
