<template>
  <div class="md-swiper" :class="{'md-swiper-vertical': isVertical, 'md-swiper-fade': !isSlide, 'disabled': !isInitial}">
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
          :class="{ 'md-swiper-indicator-active': index - 1 === originalIndex }"
          ></div>
      </template>
    </div>
  </div>
</template>

<script>import Scroller from '../_util/scroller'
import {render} from '../_util/render'
import {warn} from '../_util'

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
    defaultIndex: {
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
      userScrolling: false,
      isInitial: false,
      hasTouch: 'ontouchstart' in window,
      index: 0,
      fromIndex: 0,
      toIndex: 0,
      firstIndex: 0,
      lastIndex: 0,
      oItemCount: 0, // original item count
      rItemCount: 0, // real item count
      dimension: 0,
      dragState: {},
      timer: null,
      noDrag: false,
      scroller: null,
      isStoped: false,
      $swiper: null,
      transitionEndHandler: null,
    }
  },

  computed: {
    isLastItem() {
      return this.index === this.rItemCount - 1
    },
    isFirstItem() {
      return this.index === 0
    },
    originalIndex() {
      if (this.isLoop && this.isSlide) {
        return this.index - 1
      } else {
        return this.index
      }
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
    this.ready = true
    this.hasTouch = 'ontouchstart' in window
    this.$swiper = this.$el.querySelector('.md-swiper-container')
    this.$nextTick(() => {
      this.$_reInitItems()
      this.$_startPlay()
      this.$_bindEvents()
    })
  },
  /*
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  */
  destroyed() {
    this.$_clearTimer()
  },
  /*
  errorCaptured
  */

  methods: {
    // MARK: private methods
    $_getDimension() {
      this.dimension = this.isVertical ? this.$el.clientHeight : this.$el.clientWidth
    },

    $_initScroller() {
      const scroller = new Scroller(
        (left, top) => {
          render(this.$swiper, left, top, this.useNativeDriver)
        },
        {
          scrollingY: this.isVertical,
          scrollingX: !this.isVertical,
          snapping: false,
          bouncing: false,
          // paging: true,
          scrollingComplete: () => {
            this.transitionEndHandler && this.transitionEndHandler()
            this.transitionEndHandler = null
          },
        },
      )

      const container = this.$swiper
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
        const from = this.$children[fromIndex].$el
        const to = this.$children[toIndex].$el
        from.style.opacity = 1 - Math.abs(opacity)
        from.style.transition = animate ? 'opacity 300ms ease' : ''
        to.style.opacity = Math.abs(opacity)
        return
      }

      const from = this.$children[this.fromIndex].$el
      const to = this.$children[this.toIndex].$el
      from.style.opacity = 0
      from.style.transition = animate ? 'opacity 500ms ease' : ''
      to.style.opacity = 1
      if (animate) {
        setTimeout(() => {
          this.$emit('after-change', this.fromIndex, this.toIndex)
        }, 500)
      }
    },

    $_initState(children) {
      this.oItemCount = children.length
      this.rItemCount = children.length
      this.noDrag = children.length === 1 || !this.dragable
      this.index = this.defaultIndex >= 0 && this.defaultIndex < children.length ? parseInt(this.defaultIndex) : 0
      this.firstIndex = 0
      this.lastIndex = children.length - 1
      this.fromIndex = this.index === this.firstIndex ? this.lastIndex : this.index + 1
      this.toIndex = this.index
    },

    $_reInitItems() {
      const children = this.$children

      if (!children || !children.length) {
        return
      }

      this.$_getDimension()

      this.$_initState(children)

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
      if (this.autoplay > 0 && this.oItemCount > 1 && this.isLoop) {
        this.timer = setInterval(() => {
          if (!this.isLoop && this.index >= this.rItemCount - 1) {
            return this.$_clearTimer()
          }
          if (!this.dragging) {
            this.next()
          }
        }, this.autoplay)
      }
    },

    $_bindEvents() {
      window.addEventListener('resize', () => {
        // 防止屏幕翻转时，容器的尺寸更改不及时导致异常
        setTimeout(() => {
          this.$_reInitItems()
        }, 300)
      })

      // if (!this.isSlide) {
      //   return
      // }

      const element = this.$el

      let isTouchEvent
      const _onTouchStart = event => {
        if (event.originalEvent) {
          event = event.originalEvent
        }
        isTouchEvent = event.type === 'touchstart'
        if (this.isPrevent) {
          event.preventDefault()
        }
        this.dragging = true
        this.userScrolling = false
        this.$_doOnTouchStart(event)
      }

      const _onTouchMove = event => {
        if (event.originalEvent) {
          event = event.originalEvent
        }
        if (isTouchEvent && event.type === 'mousemove') {
          return
        }
        if (this.isPrevent) {
          event.preventDefault()
        }
        if (!this.dragging) {
          return
        }
        this.$_doOnTouchMove(event)
      }

      const _onTouchEnd = event => {
        if (this.isPrevent) {
          event.preventDefault()
        }
        if (this.userScrolling) {
          this.dragging = false
          this.dragState = {}
          return
        }
        if (!this.dragging) {
          return
        }
        this.$_doOnTouchEnd(event)
        this.dragging = false
      }

      if (!this.hasTouch) {
        element.addEventListener('mousedown', _onTouchStart)
        element.addEventListener('mousemove', _onTouchMove)
        element.addEventListener('mouseup', _onTouchEnd)
      } else {
        element.addEventListener('touchstart', _onTouchStart)
        element.addEventListener('touchmove', _onTouchMove)
        element.addEventListener('touchend', _onTouchEnd)
      }
    },

    $_clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    $_isScroll(distanceX, distanceY) {
      const vertical = this.isVertical
      if (!vertical && (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX))) {
        return true
      } else if (vertical && (distanceY < 5 || (distanceY >= 5 && distanceX >= 1.73 * distanceY))) {
        return true
      } else {
        return false
      }
    },

    $_calcuRealIndex(index) {
      if (this.isLoop && this.isSlide && this.oItemCount > 0) {
        return index - 1 < 0 ? this.oItemCount - 1 : index - 1 > this.oItemCount - 1 ? 0 : index - 1
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

      let oldIndex = this.index

      if (!towards) {
        return
      }

      if (options && options.index) {
        this.index = options.index + (this.isLoop && this.isSlide ? 1 : 0)
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
        this.fromIndex = this.$_calcuRealIndex(oldIndex)
        this.toIndex = this.$_calcuRealIndex(this.index)
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
        this.transitionEndHandler = () => {
          if (this.isLastItem && this.isLoop) {
            const x = this.isVertical ? 0 : this.firstIndex * this.dimension
            const y = this.isVertical ? this.firstIndex * this.dimension : 0
            this.scroller.scrollTo(x, y, false)
            this.index = this.firstIndex
          }

          if (this.isFirstItem && this.isLoop) {
            const x = this.isVertical ? 0 : this.lastIndex * this.dimension
            const y = this.isVertical ? this.lastIndex * this.dimension : 0
            this.scroller.scrollTo(x, y, false)
            this.index = this.lastIndex
          }

          this.$emit('after-change', this.fromIndex, this.toIndex)
        }
        this.$_translate(this.$swiper, -this.dimension * this.index)
      }, 10)
    },

    $_doOnTouchStart(event) {
      if (this.noDrag) {
        return
      }
      this.stop()

      const element = this.$el
      const point = this.hasTouch ? event.touches[0] : event

      let dragState = this.dragState

      dragState.startTime = new Date()
      dragState.startLeft = point.pageX
      dragState.startTop = point.pageY
      dragState.itemWidth = element.offsetWidth
      dragState.itemHeight = element.offsetHeight
    },

    $_doOnTouchMove(event) {
      if (this.noDrag) {
        return
      }
      const point = this.hasTouch ? event.touches[0] : event
      let dragState = this.dragState

      dragState.currentLeft = point.pageX
      dragState.currentTop = point.pageY

      let offsetLeft = dragState.currentLeft - dragState.startLeft
      let offsetTop = dragState.currentTop - dragState.startTop
      const distanceX = Math.abs(offsetLeft)
      const distanceY = Math.abs(offsetTop)

      this.userScrolling = this.$_isScroll(distanceX, distanceY)
      if (this.userScrolling) {
        return
      } else {
        event.preventDefault()
      }

      let _offsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1)
      let _offsetTop = Math.min(Math.max(-dragState.itemHeight + 1, offsetTop), dragState.itemHeight - 1)

      const offset = this.isVertical
        ? _offsetTop - dragState.itemHeight * this.index
        : _offsetLeft - dragState.itemWidth * this.index

      if (this.isSlide) {
        this.$_translate(this.$swiper, offset)
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

      if (dragDuration < 300 && dragState.currentLeft === undefined) {
        this.play(this.autoplay)
        return
      }

      if (this.isVertical) {
        if (Math.abs(offsetTop) > itemHeight / 6) {
          towards = offsetTop < 0 ? 'next' : 'prev'
        } else {
          this.$_translate(this.$swiper, -this.dimension * index, true)
        }
      } else {
        if (Math.abs(offsetLeft) > itemWidth / 6) {
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

      this.play(this.autoplay)
    },

    // MARK: events handler, 如 $_onButtonClick

    // MARK: public methods
    next() {
      this.$_doTransition('next')
    },

    prev() {
      this.$_doTransition('prev')
    },

    goto(index) {
      if (isNaN(index)) {
        return
      }
      index = parseInt(index)
      if (index === this.index || index < 0 || index >= this.oItemCount) {
        return
      }
      const towards = index > this.index ? 'next' : 'pre'
      this.index = index
      this.$_doTransition(towards, {
        index,
      })
    },

    getIndex() {
      return this.$_calcuRealIndex(this.index)
    },

    play(autoplay = 3000) {
      this.$_clearTimer()
      if (autoplay < 500) {
        return
      }
      this.autoplay = autoplay || this.autoplay
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
      this.$nextTick(() => {
        this.$_clearTimer()
        this.$_reInitItems()
        if (this.autoplay > 0 && !this.isStoped) {
          this.$_startPlay()
        }
      })
    },

    swiperItemDestroyed() {
      if (!this.ready) {
        return
      }
      this.$nextTick(() => {
        this.$_clearTimer()
        this.$_reInitItems()
        if (this.autoplay > 0 && !this.isStoped) {
          this.$_startPlay()
        }
      })
    },
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
