<template>
  <div
    class="md-swiper"
    :class="{'md-swiper-vertical': isVertical, 'md-swiper-fade': !isSlide, 'disabled': !isInitial}"
    @mousedown="$_onDragStart"
    @mousemove="$_onDragMove"
    @mouseup="$_onDragEnd"
    @mouseleave="$_onDragEnd"
    @touchstart="$_onDragStart"
    @touchmove="$_onDragMove"
    @touchend="$_onDragEnd"
    @touchcancel="$_onDragEnd"
  >
    <div class="md-swiper-box">
      <div class="md-swiper-container">
        <slot></slot>
      </div>
    </div>
    <div class="md-swiper-indicators" :class="{'disabled': !hasDots}" v-if="oItemCount > 1 && hasDots">
      <template v-for="index in oItemCount">
        <div
          class="md-swiper-indicator"
          :key="index"
          :class="{ 'md-swiper-indicator-active': index - 1 === realIndex }"
          ></div>
      </template>
    </div>
  </div>
</template>

<script>import Scroller from '../_util/scroller'
import {render} from '../_util/render'
import {warn, debounce} from '../_util'

// scale of sliding distance & touch duration that triggers page turning
const PAGING_SCALE = 0.5
const PAGING_DURATION = 300

export default {
  name: 'md-swiper',

  // components: {
  // },

  props: {
    autoplay: {
      type: Number,
      default: 3000,
      validator: function(value) {
        if (value === 0) {
          return true
        }
        return value >= 500
      },
    },
    transition: {
      type: String,
      default: 'slide',
      validator: function(value) {
        return ['slide', 'slideY', 'fade'].indexOf(value) > -1
      },
    },
    transitionDuration: {
      type: Number,
      default: 250,
    },
    defaultIndex: {
      // display index
      type: Number,
      default: 0,
      validator: function(value) {
        return value > -1
      },
    },
    hasDots: {
      type: Boolean,
      default: true,
    },
    isPrevent: {
      type: Boolean,
      default: true,
    },
    isLoop: {
      type: Boolean,
      default: true,
    },
    dragable: {
      type: Boolean,
      default: true,
    },
    useNativeDriver: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      ready: false,
      dragging: false,
      userScrolling: null,
      isInitial: false,
      duration: 0,
      index: 0, // real index (swiper perspective)
      fromIndex: 0, // display index (user perspective)
      toIndex: 0, // display index
      firstIndex: 0, // display index
      lastIndex: 0, // display index
      oItemCount: 0, // original item count
      rItemCount: 0, // real item count
      dimension: 0,
      dragState: {},
      touchAngle: 45,
      timer: null,
      noDrag: false,
      scroller: null,
      isStoped: true,
      $swiper: null,
      transitionEndHandler: null,
    }
  },

  watch: {
    autoplay: {
      handler(val) {
        this.duration = val
      },
      immediate: true,
    },
  },

  computed: {
    isLastItem() {
      return this.index === this.rItemCount - 1
    },
    isFirstItem() {
      return this.index === 0
    },
    realIndex() {
      return this.getIndex()
    },
    isSlide() {
      return this.transition.toLowerCase().indexOf('slide') > -1
    },
    isVertical() {
      return this.transition === 'slideY'
    },
  },

  // LiftCircle Hook
  /*
  beforeCreate
  created
  beforeMount
  */
  mounted() {
    this.$_resizeEnterBehavior()
  },
  /*
  beforeUpdate
  updated
  */
  activated() {
    this.$_resizeEnterBehavior()
  },
  deactivated() {
    this.$_resizeLeaveBehavior()
  },
  /**
   beforeDestroy
   */
  destroyed() {
    this.$_resizeLeaveBehavior()
  },
  /*
  errorCaptured
  */

  methods: {
    // MARK: private methods
    $_resize() {
      // 防止屏幕翻转时，容器的尺寸更改不及时导致异常
      if (this.__resizeTimeout__) {
        clearTimeout(this.__resizeTimeout__)
      }

      // if swiper stoped originally, keep status
      const startIndex = this.index
      this.__resizeTimeout__ = setTimeout(() => {
        this.$_reInitItems(startIndex)
      }, 300)
    },
    $_onDragStart(e) {
      /**
       * Consume unfinished transition handler first
       * Otherwise the offset calculation will be abnormal
       */
      this.transitionEndHandler && this.transitionEndHandler()

      if (this.isPrevent) {
        e.preventDefault()
      }
      this.dragging = true
      this.userScrolling = null
      this.$_doOnTouchStart(e)
    },
    $_onDragMove(e) {
      if (this.isPrevent) {
        e.preventDefault()
      }
      /* istanbul ignore if */
      if (!this.dragging) {
        return
      }
      this.$_doOnTouchMove(e)
    },
    $_onDragEnd(e) {
      if (this.isPrevent) {
        e.preventDefault()
      }
      /* istanbul ignore if */
      if (this.userScrolling) {
        this.play(this.duration)

        this.dragging = false
        this.dragState = {}
        return
      }
      /* istanbul ignore if */
      if (!this.dragging) {
        return
      }
      this.$_doOnTouchEnd(e)
      this.dragging = false
    },
    $_getDimension() {
      this.dimension = this.isVertical ? this.$el.clientHeight : this.$el.clientWidth
    },

    $_initScroller() {
      const scroller = new Scroller(
        (left, top) => {
          render(this.$swiper, left, top, 1, this.useNativeDriver)
        },
        {
          scrollingY: this.isVertical,
          scrollingX: !this.isVertical,
          snapping: false,
          bouncing: false,
          animationDuration: this.transitionDuration,
          // paging: true,
          scrollingComplete: () => {
            this.transitionEndHandler && this.transitionEndHandler()
          },
        },
      )

      const container = this.$swiperBox
      const contentWidth = this.isVertical ? container.clientWidth : container.clientWidth * this.rItemCount
      const contentHeight = this.isVertical ? container.clientHeight * this.rItemCount : container.clientHeight
      scroller.setPosition(container.clientLeft, container.clientTop)
      scroller.setDimensions(container.clientWidth, container.clientHeight, contentWidth, contentHeight)

      this.scroller = scroller
    },

    $_backupItem(children) {
      const firstNode = children[0].$el.cloneNode(true)
      const lastNode = children[children.length - 1].$el.cloneNode(true)

      if (children.length > 1 && this.isLoop) {
        const firstNodeCopy = this.$swiper.querySelector('.md-swiper-item-first-copy')
        const lastNodeCopy = this.$swiper.querySelector('.md-swiper-item-last-copy')
        firstNodeCopy && this.$swiper.removeChild(firstNodeCopy)
        lastNodeCopy && this.$swiper.removeChild(lastNodeCopy)

        firstNode.className += ' md-swiper-item-first-copy'
        lastNode.className += ' md-swiper-item-last-copy'
        if (this.isVertical) {
          firstNode.style.height = `${this.dimension}px`
          lastNode.style.height = `${this.dimension}px`
        } else {
          firstNode.style.width = `${this.dimension}px`
          lastNode.style.width = `${this.dimension}px`
        }
        this.$swiper.appendChild(firstNode)
        this.$swiper.insertBefore(lastNode, this.$swiper.childNodes[0])

        this.firstIndex++
        this.lastIndex++
        this.index++

        this.rItemCount += 2
      }
    },

    $_translate(element, offset, animate = true) {
      if (!element) {
        warn('[md-swiper] no element for translate')
        return
      }
      const x = this.isVertical ? 0 : -offset
      const y = this.isVertical ? -offset : 0
      this.scroller.scrollTo(x, y, animate)
    },

    $_opacity(animate = true, opacity) {
      const children = this.$children
      /* istanbul ignore if */
      if (!children || !children.length) {
        return
      }
      /* istanbul ignore if */
      if (typeof opacity !== 'undefined') {
        let toIndex = 0
        let fromIndex = this.toIndex
        const itemCount = this.rItemCount

        if (opacity > 0) {
          if (fromIndex > 0) {
            toIndex = fromIndex - 1
          } else if (fromIndex === 0) {
            toIndex = itemCount - 1
          }
        } else {
          if (fromIndex < itemCount - 1) {
            toIndex = fromIndex + 1
          } else if (fromIndex === itemCount - 1) {
            toIndex = 0
          }
        }
        const from = children[fromIndex].$el
        const to = children[toIndex].$el
        from.style.opacity = 1 - Math.abs(opacity)
        from.style.transition = animate ? 'opacity 300ms ease' : ''
        to.style.opacity = Math.abs(opacity)
        return
      }

      const from = children[this.fromIndex].$el
      const to = children[this.toIndex].$el
      from.style.opacity = 0
      from.style.transition = animate ? 'opacity 500ms ease' : ''
      to.style.opacity = 1
      if (animate) {
        setTimeout(() => {
          this.$emit('after-change', this.fromIndex, this.toIndex)
        }, 500)
      }
    },

    $_initState(children, startIndex) {
      this.oItemCount = children.length
      this.rItemCount = children.length
      this.noDrag = children.length === 1 || !this.dragable

      this.index =
        startIndex !== undefined
          ? this.$_calcDisplayIndex(startIndex)
          : this.defaultIndex >= 0 && this.defaultIndex < children.length ? parseInt(this.defaultIndex) : 0

      this.firstIndex = 0
      this.lastIndex = children.length - 1
      this.fromIndex =
        this.index === this.firstIndex
          ? this.lastIndex
          : this.index === this.lastIndex ? this.firstIndex : this.index + 1
      this.toIndex = this.index
    },

    $_reInitItems(startIndex) {
      const children = this.$children

      if (!children || !children.length) {
        return
      }

      this.$_getDimension()
      this.$_initState(children, startIndex)

      if (this.isSlide) {
        this.$_backupItem(children)
        this.$_initScroller()
        this.$_translate(this.$swiper, -this.dimension * this.index, false)
      } else {
        this.$_opacity(false)
      }
      this.isInitial = true
    },

    $_startPlay() {
      if (this.duration > 0 && this.oItemCount > 1) {
        this.$_clearTimer()
        this.timer = setInterval(() => {
          /* istanbul ignore if */
          if (!this.isLoop && this.index >= this.rItemCount - 1) {
            return this.$_clearTimer()
          }
          if (!this.dragging) {
            this.next()
          }
        }, this.duration)
      }
    },

    $_clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    $_isScroll(dragState, diffX, diffY) {
      const vertical = this.isVertical
      const {currentLeft, currentTop, startLeft, startTop} = dragState

      if (this.userScrolling === null) {
        if ((!vertical && currentTop === startTop) || (vertical && currentLeft === startLeft)) {
          return false
        } else {
          /* istanbul ignore next */
          if (diffX * diffX + diffY * diffY >= 25) {
            const _touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI
            return !vertical ? _touchAngle > this.touchAngle : 90 - _touchAngle > this.touchAngle
          } else {
            return false
          }
        }
      }

      return this.userScrolling
    },

    // real index => display index
    $_calcDisplayIndex(index) {
      if (this.isLoop && this.isSlide && this.oItemCount > 0) {
        return index - 1 < 0 ? this.oItemCount - 1 : index - 1 > this.oItemCount - 1 ? 0 : index - 1
      }
      return index
    },
    // display index => real index
    $_calcuRealIndex(index) {
      if (index < 0) {
        index = 0
      } else if (this.oItemCount > 0 && index > this.oItemCount - 1) {
        index = this.oItemCount - 1
      }

      if (this.isLoop && this.isSlide) {
        return index + 1
      }
      return index
    },

    $_doTransition(towards, options) {
      if (this.oItemCount === 0) {
        return
      }
      if (!options && this.oItemCount < 2) {
        return
      }

      const index = this.index
      const itemCount = this.rItemCount
      const oldIndex = this.index

      if (!towards) {
        return
      }
      /* istanbul ignore next */
      if (options && options.index !== undefined) {
        this.index = options.index
      } else if (towards === 'prev') {
        if (index > 0) {
          this.index = index - 1
        } else if (!this.isSlide && index === 0) {
          this.index = itemCount - 1
        } else if (this.isLoop && index === 0) {
          this.index = itemCount - 1
        }
      } else if (towards === 'next') {
        if (index < itemCount - 1) {
          this.index = index + 1
        } else if (!this.isSlide && index === itemCount - 1) {
          this.index = 0
        } else if (this.isLoop && index === itemCount - 1) {
          this.index = 1
        }
      }

      if (this.isLoop && this.isSlide) {
        this.fromIndex = this.$_calcDisplayIndex(oldIndex)
        this.toIndex = this.$_calcDisplayIndex(this.index)
      } else {
        this.fromIndex = this.toIndex
        this.toIndex = this.index
      }
      this.$emit('before-change', this.fromIndex, this.toIndex)
      if (!this.isSlide) {
        this.$_opacity()
        return
      }

      setTimeout(() => {
        const isFirstItem = this.isFirstItem && this.isLoop
        const isLastItem = this.isLastItem && this.isLoop
        /* istanbul ignore next */
        this.transitionEndHandler = () => {
          // Recover first and last page
          if (isLastItem) {
            const x = this.isVertical ? 0 : this.firstIndex * this.dimension
            const y = this.isVertical ? this.firstIndex * this.dimension : 0
            this.scroller.scrollTo(x, y, false)
          }
          if (isFirstItem) {
            const x = this.isVertical ? 0 : this.lastIndex * this.dimension
            const y = this.isVertical ? this.lastIndex * this.dimension : 0
            this.scroller.scrollTo(x, y, false)
          }

          this.$emit('after-change', this.fromIndex, this.toIndex)
          this.transitionEndHandler = null
        }
        this.$_translate(this.$swiper, -this.dimension * this.index)

        // Recover first and last indicator
        if (isFirstItem) {
          this.index = this.lastIndex
        } else if (isLastItem) {
          this.index = this.firstIndex
        }
      }, 10)
    },

    $_doOnTouchStart(event) {
      if (this.noDrag) {
        return
      }
      this.stop()

      const element = this.$el

      let dragState = this.dragState

      const point = event.changedTouches ? event.changedTouches[0] : event

      dragState.startTime = new Date()
      dragState.startLeft = point.pageX
      dragState.startTop = point.pageY
      dragState.itemWidth = process.env.MAND_ENV !== 'test' ? element.offsetWidth : 100
      dragState.itemHeight = process.env.MAND_ENV !== 'test' ? element.offsetHeight : 100
    },

    $_doOnTouchMove(event) {
      if (this.noDrag) {
        return
      }

      let dragState = this.dragState

      const point = event.changedTouches ? event.changedTouches[0] : event

      dragState.currentLeft = point.pageX
      dragState.currentTop = point.pageY

      let offsetLeft = dragState.currentLeft - dragState.startLeft
      let offsetTop = dragState.currentTop - dragState.startTop
      this.userScrolling = this.$_isScroll(dragState, Math.abs(offsetLeft), Math.abs(offsetTop))
      /* istanbul ignore if */
      if (this.userScrolling) {
        return
      }

      event.preventDefault()

      let _offsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1)
      let _offsetTop = Math.min(Math.max(-dragState.itemHeight + 1, offsetTop), dragState.itemHeight - 1)

      const offset = this.isVertical
        ? _offsetTop - dragState.itemHeight * this.index
        : _offsetLeft - dragState.itemWidth * this.index

      if (this.isSlide) {
        this.$_translate(this.$swiper, offset, false)
      } else {
        this.$_opacity(false, offsetLeft / dragState.itemWidth)
      }
    },

    $_doOnTouchEnd() {
      if (this.noDrag) {
        return
      }
      let dragState = this.dragState
      let towards = null
      // let offset

      const dragDuration = new Date() - dragState.startTime
      const offsetLeft = dragState.currentLeft - dragState.startLeft
      const offsetTop = dragState.currentTop - dragState.startTop
      const itemWidth = dragState.itemWidth
      const itemHeight = dragState.itemHeight
      const index = this.index
      const itemCount = this.rItemCount
      const isFastDrag = dragDuration < PAGING_DURATION

      if (isFastDrag && dragState.currentLeft === undefined) {
        this.play(this.duration)
        return
      }

      if (this.isVertical) {
        if (Math.abs(offsetTop) > itemHeight * PAGING_SCALE || isFastDrag) {
          towards = offsetTop < 0 ? 'next' : 'prev'
        } else {
          this.$_translate(this.$swiper, -this.dimension * index, true)
        }
      } else {
        if (Math.abs(offsetLeft) > itemWidth * PAGING_SCALE || isFastDrag) {
          towards = offsetLeft < 0 ? 'next' : 'prev'
        } else {
          if (this.isSlide) {
            this.$_translate(this.$swiper, -this.dimension * index, true)
          } else {
            this.$_opacity(true, 0)
          }
        }
      }

      if (!this.isLoop) {
        if ((index === 0 && towards === 'prev') || (index === itemCount - 1 && towards === 'next')) {
          towards = null
        }
      }

      this.$_doTransition(towards)

      this.dragState = {}

      this.play(this.duration)
    },
    $_resizeEnterBehavior() {
      this.ready = true
      this.$swiper = this.$el.querySelector('.md-swiper-container')
      this.$swiperBox = this.$el.querySelector('.md-swiper-box')
      this.$nextTick(() => {
        this.$_reInitItems()
        this.play(this.duration)
        window.addEventListener('resize', this.$_resize)
      })
    },
    $_resizeLeaveBehavior() {
      this.ready = false
      this.$_clearTimer()
      window.removeEventListener('resize', this.$_resize)
      if (this.__resizeTimeout__) {
        clearTimeout(this.__resizeTimeout__)
      }
    },

    // MARK: events handler, 如 $_onButtonClick

    // MARK: public methods
    next() {
      this.$_doTransition('next')
    },

    prev() {
      this.$_doTransition('prev')
    },

    goto(displayIndex) {
      if (isNaN(displayIndex)) {
        return
      }
      displayIndex = parseInt(displayIndex)

      const realIndex = this.$_calcuRealIndex(displayIndex)
      const towards = realIndex > this.index ? 'next' : 'pre'

      this.$_doTransition(towards, {
        index: realIndex,
      })

      // restart timer
      this.play(this.duration)
    },

    getIndex() {
      return this.$_calcDisplayIndex(this.index)
    },

    play(duration = 3000) {
      this.$_clearTimer()
      if (duration < 500) {
        return
      }

      this.duration = duration || this.autoplay
      this.$_startPlay()
      this.isStoped = false
    },

    stop() {
      this.$_clearTimer()
      this.isStoped = true
    },

    swiperItemCreated() {
      if (!this.ready) {
        return
      }
      /* istanbul ignore next */
      this.$nextTick(() => {
        this.$_clearTimer()
        this.$_reInitItems()
        if (!this.isStoped) {
          this.play(this.duration)
        }
      })
    },

    swiperItemDestroyed: debounce(function() {
      if (!this.ready) {
        return
      }
      /* istanbul ignore next */
      this.$nextTick(() => {
        this.$_clearTimer()
        this.$_reInitItems()
        if (!this.isStoped) {
          this.play(this.duration)
        }
      })
    }, 50),
  },
}
</script>

<style lang="stylus">
.md-swiper-box
  overflow hidden
  will-change tranform
.md-swiper, .md-swiper-box
  width 100%
  height 100%
  position relative
  &.disabled
    visibility hidden
  &.md-swiper-fade
    .md-swiper-item
      position absolute
      opacity 0
      top 0
      left 0
  &.md-swiper-vertical
    .md-swiper-container
      width 100%
      height auto
      box-orient vertical
      flex-direction column
    .md-swiper-indicators
      flex-direction column
      right 20px
      left auto
      bottom auto
      top 50%
      transform translate(0, -50%)
      &.disabled
        visibility hidden
      .md-swiper-indicator
        width 4px
        height 16px
        margin 2.5px 0

.md-swiper-container
  height 100%
  width auto
  position relative
  display flex
  box-sizing content-box

.md-swiper-indicators
    position absolute
    bottom 20px
    left 50%
    display flex
    transform translateX(-50%)

.md-swiper-indicator
  width 16px
  height 4px
  display inline-block
  background #ddd
  margin 0 3px
  &.md-swiper-indicator-active
    background swiper-indicator-fill
</style>
