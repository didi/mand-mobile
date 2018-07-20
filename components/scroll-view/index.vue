<template>
  <div
    class="md-scroll-view"
    @touchstart="$_onScollerTouchStart"
    @touchmove="$_onScollerTouchMove"
    @touchend="$_onScollerTouchEnd"
    @touchcancel="$_onScollerTouchEnd"
    @mousedown="$_onScollerMouseDown"
    @mousemove="$_onScollerMouseMove"
    @mouseup="$_onScollerMouseUp"
    @mouseleave="$_onScollerMouseUp"
  >
    <div class="scroll-view-container">
      <div
        v-if="hasRefresher"
        class="scroll-view-refresh"
        :class="{'refreshing': isRefreshing, 'refresh-active': isRefreshActive}"
        :style="{top: `-${refreshOffsetY}px`}"
      >
        <slot
          name="refresh"
          :scroll-top="scrollY"
          :is-refreshing="isRefreshing"
          :is-refresh-active="isRefreshActive"
        ></slot>
      </div>
      <slot></slot>
      <div
        v-if="hasMore"
        :is-end-reaching="isEndReaching"
        :class="{active: isEndReaching}"
        class="scroll-view-more"
      >
        <slot name="more"></slot>
      </div>
    </div>
  </div>
</template>

<script>import Scroller from '../_util/scroller'
import {render} from '../_util/render'
export default {
  name: 'md-scroll-view',
  props: {
    scrollingX: {
      type: Boolean,
      default: true,
    },
    scrollingY: {
      type: Boolean,
      default: true,
    },
    bouncing: {
      type: Boolean,
      default: true,
    },
    endReachedThreshold: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      container: null,
      content: null,
      refresher: null,
      more: null,
      scroller: null,
      refreshOffsetY: 0,
      isInitialed: false,
      isMouseDown: false,
      isRefreshing: false,
      isRefreshActive: false,
      isEndReaching: false,
      scrollX: null,
      scrollY: null,
    }
  },
  computed: {
    hasRefresher() {
      return !!(this.$slots.refresh || this.$scopedSlots.refresh)
    },
    hasMore() {
      return !!(this.$slots.more || this.$scopedSlots.more)
    },
  },
  mounted() {
    window.addEventListener(
      'resize',
      () => {
        this.$_initScroller()
      },
      false,
    )
    this.$_initScroller()
  },
  methods: {
    $_initScroller() {
      this.container = this.$el
      this.refresher = this.$el.querySelector('.scroll-view-refresh')
      this.more = this.$el.querySelector('.scroll-view-more')
      this.content = this.$el.querySelector('.scroll-view-container')
      this.refreshOffsetY = this.refresher ? this.refresher.clientHeight : 0
      this.moreOffsetY = this.more ? this.more.clientHeight : 0
      const container = this.container
      const content = this.content
      const rect = container.getBoundingClientRect()
      const scroller = new Scroller(
        (left, top) => {
          render(content, left, top)
          if (this.isInitialed) {
            this.$_onScroll(left, top)
          }
        },
        {
          scrollingX: this.scrollingX,
          scrollingY: this.scrollingY,
          bouncing: this.bouncing,
          zooming: false,
          animationDuration: 200,
        },
      )
      scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop)
      if (this.hasRefresher) {
        scroller.activatePullToRefresh(
          this.refreshOffsetY,
          () => {
            this.isRefreshActive = true
            this.isRefreshing = false
          },
          () => {
            this.isRefreshActive = false
            this.isRefreshing = false
            this.$emit('refreshActive')
          },
          () => {
            this.isRefreshActive = false
            this.isRefreshing = true
            this.$emit('refreshing')
          },
        )
      }
      this.scroller = scroller
      this.reflowScroller()
      setTimeout(() => {
        this.isInitialed = true
      }, 50)
    },
    // MARK: events handler
    $_onScollerTouchStart(event) {
      if (
        !this.scroller ||
        (event.touches[0] && event.touches[0].target && event.touches[0].target.tagName.match(/input|textarea|select/i))
      ) {
        return
      }
      this.scroller.doTouchStart(event.touches, event.timeStamp)
      event.preventDefault()
    },
    $_onScollerTouchMove(event) {
      if (!this.scroller) {
        return
      }
      this.scroller.doTouchMove(event.touches, event.timeStamp, event.scale)
    },
    $_onScollerTouchEnd(event) {
      if (!this.scroller) {
        return
      }
      this.scroller.doTouchEnd(event.timeStamp)
    },
    $_onScollerMouseDown(event) {
      if (!this.scroller || event.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      this.scroller.doTouchStart(
        [
          {
            pageX: event.pageX,
            pageY: event.pageY,
          },
        ],
        event.timeStamp,
      )
      this.isMouseDown = true
    },
    $_onScollerMouseMove(event) {
      if (!this.scroller || !this.isMouseDown) {
        return
      }
      this.scroller.doTouchMove(
        [
          {
            pageX: event.pageX,
            pageY: event.pageY,
          },
        ],
        event.timeStamp,
      )
      this.isMouseDown = true
    },
    $_onScollerMouseUp(event) {
      if (!this.scroller || !this.isMouseDown) {
        return
      }
      this.scroller.doTouchEnd(event.timeStamp)
      this.isMouseDown = false
    },
    $_onScroll(left, top) {
      left = +left.toFixed(2)
      top = +top.toFixed(2)
      if (this.scrollX === left && this.scrollY === top) {
        return
      }
      this.scrollX = left
      this.scrollY = top
      const containerHeight = this.scroller._clientHeight
      const content = this.scroller._contentHeight
      const moreOffsetY = this.moreOffsetY
      const moreThreshold = this.endReachedThreshold
      if (
        top > 0 &&
        !this.isEndReaching &&
        content > containerHeight &&
        content - containerHeight <= top + moreOffsetY + moreThreshold
      ) {
        this.isEndReaching = true
        this.$emit('endReached')
      }
      this.$emit('scroll', {scrollLeft: left, scrollTop: top})
    },
    scrollTo(left, top, animate = false) {
      if (!this.scroller) {
        return
      }
      this.scroller.scrollTo(left, top, animate)
    },
    reflowScroller() {
      const container = this.container
      const content = this.content
      if (!this.scroller || !container || !content) {
        return
      }
      this.$nextTick(() => {
        this.scroller.setDimensions(
          container.clientWidth,
          container.clientHeight,
          content.offsetWidth,
          content.offsetHeight,
        )
        this.isEndReaching = false
      })
    },
    triggerRefresh() {
      if (!this.scroller) {
        return
      }
      this.scroller.triggerPullToRefresh()
    },
    finishRefresh() {
      if (!this.scroller) {
        return
      }
      this.scroller.finishPullToRefresh()
      this.reflowScroller()
    },
    finishLoadMore() {
      if (!this.scroller) {
        return
      }
      this.isEndReaching = false
      this.reflowScroller()
    },
  },
}
</script>

<style lang="stylus">
.md-scroll-view
  display block
  // width 100%
  height 100%
  background #fff
  overflow hidden
  user-select none
  .scroll-view-container
    clearfix()
    position relative
    // display inline-block
    .scroll-view-refresh
      clearfix()
      position absolute
      left 0
      right 0
    .scroll-view-more
      visibility hidden
      &.active
        visibility visible
</style>