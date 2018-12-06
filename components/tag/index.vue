<template>
  <div class="md-tag">
    <template v-if="shape === 'quarter'">
      <div :class="computedClass">
        <div class="quarter-content">
          <slot></slot>
        </div>
        <div class="quarter-bg" :style="colorStyle"></div>
      </div>
    </template>
    <template v-else-if="shape === 'coupon'">
      <div :class="computedClass">
        <div class="coupon-container" :style="colorStyle">
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
      </div>
    </template>
    <template v-else>
      <div :class="computedClass" :style="[colorStyle, sizeStyle]">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>import {transformCamelCase} from '../_util'
export default {
  name: 'md-tag',
  props: {
    size: {
      type: String, // tiny, small, large
      default: 'large',
    },
    shape: {
      // square, circle, fillet, quarter, coupon, bubble
      type: String,
      default: 'square',
    },
    sharp: {
      // top-left, top-right, bottom-left, bottom-right
      type: String,
      default: '',
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
      sizeStyle: {},
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
    colorStyle() {
      let style = {}
      if (this.type === 'fill') {
        // eslint-disable-next-line
        this.fillColor && (style.background = this.fillColor)
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
    this.$nextTick(() => {
      if (this.shape === 'circle') {
        const radius = this.$el.offsetHeight / 2
        this.$set(this.sizeStyle, 'paddingLeft', radius + 'px')
        this.$set(this.sizeStyle, 'paddingRight', radius + 'px')
        this.$set(this.sizeStyle, 'borderRadius', radius + 'px')
        if (this.sharp) {
          this.$set(this.sizeStyle, transformCamelCase(`border-${this.sharp}-radius`), 0)
        }
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
  -webkit-user-select none

  .default
    background rgba(0,0,0,0)
    color tag-color
    border-color tag-color
  .shape-square
    padding 0 12px
    border-radius 50%
  .shape-square
    padding 0 12px
    border-radius 0
  .shape-fillet
    padding 2px 8px
    border-radius tag-fillet-radius
  .shape-quarter
    position relative
    display flex
    width 56px
    height 56px
    background transparent !important
    overflow hidden
    .quarter-content
      position relative
      left 10%
      bottom 10%
      display flex
      flex 1
      z-index 2
      justify-content center
      align-items center
      // transform translate(-50%, -75%)
    .quarter-bg
      position absolute
      top -100%
      left 0
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
      width 40px
      height 40px
    &.size-tiny
      width 24px
      height 24px

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

  .shape-bubble
    width 50px
    padding 6px 0
    border-radius radius-circle
    border-bottom-left-radius 0
    box-sizing border-box

    &.size-small
      width 38px
      padding 3px 0
    &.size-tiny
      width 24px
      padding 2px 0

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

  .md-icon.icon-font
    font-size inherit
    transform scale(1.2)
</style>
