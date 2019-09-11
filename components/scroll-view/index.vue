<template>
  <div
    class="md-scroll-view"
    @touchstart="$_onScrollerTouchStart"
    @touchmove="$_onScrollerTouchMove"
    @touchend="$_onScrollerTouchEnd"
    @touchcancel="$_onScrollerTouchEnd"
    @mousedown="$_onScrollerMouseDown"
    @mousemove="$_onScrollerMouseMove"
    @mouseup="$_onScrollerMouseUp"
    @mouseleave="$_onScrollerMouseUp"
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
        :class="{active: isEndReachingStart || isEndReaching}"
        class="scroll-view-more"
      >
        <slot name="more" :is-end-reaching="isEndReachingStart || isEndReaching"></slot>
      </div>
    </div>
    <div class="scroll-view-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>import {debounce} from '../_util'
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
    touchAngle: {
      type: Number,
      default: 45,
    },
    isPrevent: {
      type: Boolean,
      default: true,
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
      isEndReachingStart: false,
      isEndReaching: false,
      scrollX: null,
      scrollY: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
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
          speedMultiplier: 1.2,
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
      this.endReachedHandler = debounce(() => {
        this.isEndReaching = true
        this.$emit('endReached')
        this.$emit('end-reached')
      }, 50)

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
      if (top >= 0 && !this.isEndReaching && endOffset <= 0 && this.endReachedHandler) {
        // First prepare for "load more" state
        this.isEndReachingStart = true
        // Second enter "load more" state
        // & trigger endReached event only once after the rebounding animation
        this.endReachedHandler()
      }
    },
    $_getScrollerAngle() {
      const diffX = this.currentX - this.startX
      const diffY = this.currentY - this.startY
      const angle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI
      return this.scrollingX ? 90 - angle : angle
    },
    // MARK: events handler
    $_onScrollerTouchStart(event) {
      // event.target.tagName && event.target.tagName.match(/input|textarea|select/i)
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.startX = event.targetTouches[0].pageX
      this.startY = event.targetTouches[0].pageY
      this.scroller.doTouchStart(event.touches, event.timeStamp)
    },
    $_onScrollerTouchMove(event) {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      let hadPrevent = false

      if (this.isPrevent) {
        event.preventDefault()

        hadPrevent = true
      }

      this.currentX = event.targetTouches[0].pageX
      this.currentY = event.targetTouches[0].pageY

      if (!this.scrollingX || !this.scrollingY) {
        const currentTouchAngle = this.$_getScrollerAngle()
        if (currentTouchAngle < this.touchAngle) {
          return
        }
      }

      if (!hadPrevent && event.cancelable) {
        event.preventDefault()
      }

      this.scroller.doTouchMove(event.touches, event.timeStamp, event.scale)

      const boundaryDistance = 15
      const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

      const pX = this.currentX - scrollLeft
      const pY = this.currentY - scrollTop
      if (
        pX > document.documentElement.clientWidth - boundaryDistance ||
        pY > document.documentElement.clientHeight - boundaryDistance ||
        pX < boundaryDistance ||
        pY < boundaryDistance
      ) {
        this.scroller.doTouchEnd(event.timeStamp)
      }
    },
    $_onScrollerTouchEnd(event) {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.scroller.doTouchEnd(event.timeStamp)
    },
    $_onScrollerMouseDown(event) {
      /* istanbul ignore if */
      if (!this.scroller) {
        return
      }
      this.startX = event.pageX
      this.startY = event.pageY
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
    $_onScrollerMouseMove(event) {
      /* istanbul ignore if */
      if (!this.scroller || !this.isMouseDown) {
        return
      }

      this.currentX = event.pageX
      this.currentY = event.pageY
      if (!this.scrollingX || !this.scrollingY) {
        const currentTouchAngle = this.$_getScrollerAngle()
        if (currentTouchAngle < this.touchAngle) {
          return
        }
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
    $_onScrollerMouseUp(event) {
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
      this.isEndReachingStart = false
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
    z-index 1
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
