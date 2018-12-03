<template>
  <div class="md-tag">
    <div :class="computedClass" :style="[computedStyle, jsStyle]">
      <template v-if="shape === 'quarter'">
        <div class="quarter-content">
          <slot></slot>
        </div>
        <div class="quarter-bg" :style="computedStyle"></div>
      </template>
      <template v-else>
        <div class="coupon-container" :style="computedStyle">
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
      jsStyle: {},
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
    // const padding = Math.max(this.$el.offsetHeight * 0.15, 3)
    // this.$set(this.jsStyle, 'paddingTop', padding + 'px')
    // this.$set(this.jsStyle, 'paddingBottom', padding + 'px')
    this.$nextTick(() => {
      if (this.shape === 'circle') {
        const height = this.$el.offsetHeight / 2
        this.$set(this.jsStyle, 'paddingLeft', height + 'px')
        this.$set(this.jsStyle, 'paddingRight', height + 'px')
        this.$set(this.jsStyle, 'borderRadius', height + 'px')
      }
      // if (this.shape === 'quarter') {
      //   this.$set(this.jsStyle, 'padding', '0 0 100% 0')
      // }
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
    padding 0 12px
    border-radius 0
  .shape-fillet
    padding 2px 8px
    border-radius tag-fillet-radius
  .shape-quarter
    position relative
    display flex
    width 86px
    height 86px
    background transparent !important
    overflow hidden
    .quarter-content
      position relative
      display flex
      justify-content center
      flex 1
      z-index 2
      padding-left 10%
      padding-top 24%
      box-sizing border-box
    .quarter-bg
      position absolute
      top -100%
      width 200%
      height 200%
      border-radius radius-circle
    .quarter-wrap
      display inline-block
      padding 16px 12px 10px 26px
    .quarter-wrap-hidden
      visibility hidden
      display inline-block
      padding 16px 12px 10px 26px
    
    &.size-small
      width 66px
      height 66px
    &.size-tiny
      width 46px
      height 46px

  .shape-coupon
    position relative
    padding 0 10px
    background transparent !important
    .coupon-container
      padding 2px 0
    .left-coupon,
    .right-coupon
      position absolute
      top 0
      width 10px
      height 100%
    .left-coupon
      left 0
    .right-coupon
      right 0
    
    &.size-small
      padding 0 8px
      .left-coupon,
      .right-coupon
        width 8px
    &.size-tiny
      padding 0 5px
      .left-coupon,
      .right-coupon
        width 5px

  .size-large
    font-size tag-large-font-size
  .size-small
    font-size tag-small-font-size
  .size-tiny
    font-size tag-tiny-font-size
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
