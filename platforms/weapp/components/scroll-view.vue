<template>
  <div class="md-scroll-view-private">
    <scroll-view
      class="scroll-view-wrapper"
      :scroll-x="scrollingX"
      :scroll-y="scrollingY"
      :scroll-top="scrollTop"
      :scroll-left="scrollLeft"
      :scroll-with-animation="scrollWithAnimation"
      :lower-threshold="endReachedThreshold"
      @scroll="$_onScroll"
      @scrolltolower="$_onScrollEnd"
    >
      <div class="scroll-view-container">
        <slot></slot>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'md-scroll-view-private',
  props: {
    scrollingX: {
      type: Boolean,
      default: true,
    },
    scrollingY: {
      type: Boolean,
      default: true,
    },
    endReachedThreshold: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      scrollTop: 0,
      scrollLeft: 0,
      scrollWithAnimation: false
    }
  },
  methods: {
    $_onScroll (e) {
      this.$emit('scroll', e.mp.detail)
    },
    $_onScrollEnd () {
      console.log('xxxxx')
      this.$emit('endReached')
    },
    scrollTo (left = 0, top = 0, animate = false) {
      this.scrollWithAnimation = animate
      this.$nextTick(() => {
        this.scrollLeft = left
        this.scrollTop = top
      })
    }
  }
}
</script>

<style lang="stylus">
.md-scroll-view-private .scroll-view-wrapper
  width 100%
  height 100%

::-webkit-scrollbar
  width 0
  height 0
  color transparent
</style>
