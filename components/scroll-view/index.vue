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
    <div class="scroll-view-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div
      class="scroll-view-container"
      :class="{
        'horizon': scrollingX && !scrollingY
      }"
    >
      <div
        v-if="hasRefresher"
        class="scroll-view-refresh"
        :class="{
          'refreshing': isRefreshing,
          'refresh-active': isRefreshActive,
        }"
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
    <div class="scroll-view-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>import {debouce} from '../_util'
import Scroller from '../_util/scroller'
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
    autoReflow: {
      type: Boolean,
      default: false,
    },
    manualInit: {
      type: Boolean,
      default: false,
    },
    endReachedThreshold: {
      type: Number,
      default: 0,
    },
    immediateCheckEndReaching: {
      type: Boolean,
      default: false,
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
      containerW: 0,
      containerH: 0,
      contentW: 0,
      contentH: 0,
      reflowTimer: null,
      endReachedHandler: null,
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
    if (!this.manualInit) {
      this.$_initScroller()
    }
  },
  destroyed() {
    this.reflowTimer && clearInterval(this.reflowTimer)
  },
  methods: {
    $_initScroller() {
      /* istanbul ignore if */
      if (this.isInitialed) {
        return
      }
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
          inRequestAnimationFrame: true,
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
      this.reflowScroller(true)
      this.autoReflow && this.$_initAutoReflow()
      this.endReachedHandler = debouce(() => {
        this.isEndReaching = true
        this.$emit('endReached')
      }, 150)

      setTimeout(() => {
        this.isInitialed = true
      }, 50)

      if (this.immediateCheckEndReaching) {
        this.$nextTick(this.$_checkScrollerEnd)
      }
    },
    $_initAutoReflow() {
      this.reflowTimer = setInterval(() => {
        this.reflowScroller()
      }, 100)
    },
    $_checkScrollerEnd() {
      if (!this.scroller) {
        return
      }
      const containerHeight = this.scroller._clientHeight
      const content = this.scroller._contentHeight
      const top = this.scroller._scrollTop
      const moreOffsetY = this.moreOffsetY
      const moreThreshold = this.endReachedThreshold
      const endOffset = content - containerHeight - (top + moreOffsetY + moreThreshold)
      if (
        top >= 0 &&
        !this.isEndReaching &&
        endOffset <= 0 &&
        (this.bouncing && Math.abs(endOffset) < 50) &&
        this.endReachedHandler
      ) {
        this.endReachedHandler()
      }
    },
    // MARK: events handler
    $_onScollerTouchStart(event) {
      // event.target.tagName && event.target.tagName.match(/input|textarea|select/i)
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.scroller.doTouchStart(event.touches, event.timeStamp)
    },
    $_onScollerTouchMove(event) {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      event.preventDefault()
      this.scroller.doTouchMove(event.touches, event.timeStamp, event.scale)
    },
    $_onScollerTouchEnd(event) {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.scroller.doTouchEnd(event.timeStamp)
    },
    $_onScollerMouseDown(event) {
      /* istanbul ignore if */
      if (!this.scroller) {
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
      /* istanbul ignore if */
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
      /* istanbul ignore if */
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
      this.$_checkScrollerEnd()
      this.$emit('scroll', {scrollLeft: left, scrollTop: top})
    },
    init() {
      this.$nextTick(() => {
        this.$_initScroller()
      })
    },
    scrollTo(left, top, animate = false) {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.scroller.scrollTo(left, top, animate)
    },
    reflowScroller(force = false) {
      const container = this.container
      const content = this.content
      /* istanbul ignore if */
      if (!this.scroller || !container || !content) {
        return
      }
      this.$nextTick(() => {
        const containerW = container.clientWidth
        const containerH = container.clientHeight
        const contentW = content.offsetWidth
        const contentH = content.offsetHeight

        if (
          force ||
          this.containerW !== containerW ||
          this.containerH !== containerH ||
          this.contentW !== contentW ||
          this.contentH !== contentH
        ) {
          this.scroller.setDimensions(
            container.clientWidth,
            container.clientHeight,
            content.offsetWidth,
            content.offsetHeight,
          )
          this.containerW = containerW
          this.containerH = containerH
          this.contentW = contentW
          this.contentH = contentH
        }
      })
    },
    triggerRefresh() {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.scroller.triggerPullToRefresh()
    },
    finishRefresh() {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.scroller.finishPullToRefresh()
      this.reflowScroller()
    },
    finishLoadMore() {
      /* istanbul ignore if */
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
  position relative
  display block
  height 100%
  overflow hidden
  user-select none
  .scroll-view-header, .scroll-view-footer
    position absolute
    left 0
    right 0
    z-index 2
  .scroll-view-header
    top 0
  .scroll-view-footer
    bottom 0
  .scroll-view-container
    clearfix()
    position relative
    // display inline-block
    .scroll-view-refresh
      clearfix()
      position absolute
      left 0
      right 0
      transform translate3d(0, -100%, 0)
    .scroll-view-more
      visibility hidden
      &.active
        visibility visible
    &.horizon
      display inline-block
</style>