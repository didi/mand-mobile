<template>
  <div class="md-tag">
    <div :class="computedClass" :style="[computedStyle, jsComputedStyle]">
      <slot></slot>
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
      // square, circle, fillet
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
    const vm = this
    vm.$set(vm.jsComputedStyle, 'padding', Math.max(vm.$el.offsetHeight * 0.15, 3) + 'px')
    vm.$nextTick(function() {
      if (vm.shape === 'circle') {
        const height = vm.$el.offsetHeight / 2
        vm.$set(vm.jsComputedStyle, 'paddingLeft', height + 'px')
        vm.$set(vm.jsComputedStyle, 'paddingRight', height + 'px')
        vm.$set(vm.jsComputedStyle, 'borderRadius', height + 'px')
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
