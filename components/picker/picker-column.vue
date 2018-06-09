<template>
  <div class="md-picker-column" :style="{ height: `${style.indicatorHeight + 2 * style.maskerHeight}px` }">
    <div class="md-picker-column-container">
      <div class="md-picker-column-masker top" :style="{ height: `${style.maskerHeight}px` }"></div>
      <div class="md-picker-column-masker bottom" :style="{ height: `${style.maskerHeight}px` }"></div>
      <div class="md-picker-column-list">
        <template v-for="(colunm, i) in columnValues">
          <div
            class="md-picker-column-item"
            :key="i"
          >
            <ul class="column-list" :style="{ 'padding-top': `${style.maskerHeight}px` }">
              <template v-for="(item, j) in colunm">
                <li
                  class="column-item"
                  :class="{'disabled': $_isColumnIndexInvalid(i, j)}"
                  :style="{
                    'height': `${style.indicatorHeight}px`,
                    'line-height': `${style.indicatorHeight}px`
                    }"
                  :key="j"
                  v-text="item.text || item.label"
                  >
                </li>
              </template>
            </ul>
          </div>
        </template>
        <template v-for="n in (cols - columnValues.length)">
          <div class="md-picker-column-item" :key="n + columnValues.length - 1">
            <ul class="column-list" :style="{ 'padding-top': `${style.maskerHeight}px` }"></ul>
          </div>
        </template>
      </div>
      <div class="md-picker-column-hooks">
        <template v-for="n in cols">
          <div
            class="md-picker-column-hook"
            :key="n - 1"
            @touchstart="$_onColumnTouchStart($event, n - 1)"
            @mousedown="$_onColumnTouchStart($event, n - 1, true)"
            @touchmove="$_onColumnTouchMove($event, n - 1)"
            @mousemove="$_onColumnTouchMove($event, n - 1, true)"
            @touchend="$_onColumnTouchEnd($event, n - 1)"
            @mouseup="$_onColumnTouchEnd($event, n - 1, true)"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>import Scroller from '../_util/scroller'
import {render} from '../_util/render'
import {noop, getDpr, traverse, inArray, warn} from '../_util'

const dpr = getDpr()
const API_LIST = [
  'getColumnValue',
  'getColumnValues',
  'getColumnIndex',
  'getColumnIndexs',
  'getColumnIndexByDefault',
  'setColumnValues',
  'refresh',
  'inheritPickerApi',
]

export default {
  name: 'md-picker-column',

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    cols: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: Array,
      default() {
        return []
      },
    },
    defaultIndex: {
      type: Array,
      default() {
        return []
      },
    },
    invalidIndex: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data() {
    return {
      style: {
        maskerHeight: 81 * dpr,
        indicatorHeight: 36 * dpr,
      },
      columnValues: [],
      scrollers: [],
      scrollDirect: 1,
      scrollPosition: 0,
      activedIndexs: [],
      isInitialed: false,
      isScrollInitialed: false,
      isScrolling: false,
      isMouseDown: false,
    }
  },

  watch: {
    data: {
      handler(val) {
        this.columnValues = [...val]
      },
      deep: true,
    },
  },

  created() {
    this.columnValues = [...this.data]
  },

  methods: {
    // MARK: private methods
    // initial scroller for each column
    $_initColumnsScroller(startIndex = 0) {
      let hooks = this.$el.querySelectorAll('.md-picker-column-hook')

      /* istanbul ignore if */
      if (!hooks) {
        return
      }

      hooks = Array.isArray(hooks) ? hooks : Array.prototype.slice.call(hooks)

      for (let i = startIndex, len = hooks.length; i < len; i++) {
        const container = hooks[i]
        container && this.$_initSingleColumnScroller(container, i)
      }

      // initial index only refresh all columns
      if (!startIndex) {
        this.$_initColumnIndex()
        if (!this.isInitialed) {
          this.isInitialed = true
          setTimeout(() => {
            this.$emit('initialed')
          }, 0)
        }
      }

      this.isScrollInitialed = true
    },

    // initial scroller for column by index
    $_initSingleColumnScroller(container, index) {
      const columns = this.$el.querySelectorAll('.column-list')
      const content = columns[index]

      /* istanbul ignore if */
      if (index === undefined || !columns || !container || !content) {
        return
      }

      const rect = container.getBoundingClientRect()
      const scroller = new Scroller(
        (left, top) => {
          render(content, left, top)
        },
        {
          scrollingX: false,
          snapping: true,
          scrollingComplete: () => {
            this.$_onColumnScrollEnd(index)
          },
        },
      )

      // set scroller size
      scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop)
      scroller.setDimensions(
        container.clientWidth,
        container.clientHeight,
        content.offsetWidth,
        content.offsetHeight + this.style.maskerHeight,
      )
      scroller.setSnapSize(0, this.style.indicatorHeight)

      // save scroller instance
      this.$set(this.scrollers, index, scroller)
    },

    // each column scroll to active item by defaultIndex
    $_initColumnIndex() {
      const data = this.columnValues
      const scrollers = this.scrollers
      const defaultValue = this.defaultValue
      const defaultIndex = this.defaultIndex

      this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, (columnIndex, itemIndex) => {
        const scroller = scrollers[columnIndex]
        const offsetTop = this.$_getColumnOffsetByIndex(itemIndex)

        /* istanbul ignore if */
        if (!scroller) {
          warn(`initialColumnIndex: scroller of column ${columnIndex} is undefined`)
          return 1
        }

        scroller.scrollTo(0, offsetTop)

        // save active index of each column
        this.$set(this.activedIndexs, columnIndex, itemIndex)
      })
    },
    $_getColumnIndexByDefault(data, defaultIndex = [], defaultValue = [], fn = noop) {
      /* istanbul ignore if */
      if (!data) {
        return
      }

      traverse(data, (item, level, indexs) => {
        const columnIndex = indexs[0]
        const itemIndex = indexs[1]
        const itemDefaultIndex = defaultIndex[columnIndex]
        const itemDefaultValue = defaultValue[columnIndex]
        if (
          (itemDefaultIndex !== undefined && itemIndex === itemDefaultIndex) ||
          (itemDefaultValue !== undefined &&
            (item.text === itemDefaultValue || item.label === itemDefaultValue || item.value === itemDefaultValue))
        ) {
          fn(columnIndex, itemIndex)
          return 2
        }
      })
    },
    $_getColumnIndexByOffset(top) {
      return Math.round(top / this.style.indicatorHeight)
    },
    $_getColumnOffsetByIndex(index) {
      return index * this.style.indicatorHeight
    },
    $_isColumnIndexInvalid(columnIndex, itemIndex) {
      const invalidIndex = this.invalidIndex[columnIndex]
      return inArray(invalidIndex, itemIndex)
    },
    $_scrollToValidIndex(columnIndex, itemIndex) {
      const scroller = this.scrollers[columnIndex]
      const dirction = this.scrollDirect
      let count = itemIndex

      while (this.$_isColumnIndexInvalid(columnIndex, count)) {
        count += dirction
      }

      let offsetTop = this.$_getColumnOffsetByIndex(count)
      scroller.scrollTo(0, this.$_scrollInZoon(scroller, offsetTop), true)
    },
    $_scrollInZoon(scroller, top) {
      const MaxTop = scroller.getScrollMax().top

      if (top < 0) {
        return 0
      } else if (top > MaxTop) {
        return MaxTop
      } else {
        return top
      }
    },

    // MARK: events handler
    $_onColumnTouchStart(event, index, isMouse) {
      event.preventDefault()

      const scroller = this.scrollers[index]
      const touches = isMouse ? [{pageX: event.pageX, pageY: event.pageY}] : event.touches

      /* istanbul ignore if */
      if (!scroller) {
        warn(`touchstart: scroller of column ${index} is undefined`)
        return
      }

      this.scrollPosition = isMouse ? event.pageY : event.touches[0].pageY

      scroller.doTouchStart(touches, event.timeStamp)
      isMouse && (this.isMouseDown = true)
    },
    $_onColumnTouchMove(event, index, isMouse) {
      const scroller = this.scrollers[index]
      const touches = isMouse ? [{pageX: event.pageX, pageY: event.pageY}] : event.touches

      /* istanbul ignore if */
      if (!scroller || (isMouse && !this.isMouseDown)) {
        return
      }

      const diff = this.scrollPosition - (isMouse ? event.pageY : event.touches[0].pageY)
      this.scrollDirect = diff ? diff / Math.abs(diff) : 1

      scroller.doTouchMove(touches, event.timeStamp)
      isMouse && (this.isMouseDown = true)
    },
    $_onColumnTouchEnd(event, index, isMouse) {
      const scroller = this.scrollers[index]

      /* istanbul ignore if */
      if (!scroller || (isMouse && !this.isMouseDown)) {
        return
      }

      scroller.doTouchEnd(event.timeStamp)
      isMouse && (this.isMouseDown = false)
    },
    $_onColumnScrollEnd(index) {
      const scroller = this.scrollers[index]
      const top = scroller.getValues().top
      const scrollTop = this.$_scrollInZoon(scroller, top)
      const activeItemIndex = this.$_getColumnIndexByOffset(scrollTop)
      const isInvalid = this.$_isColumnIndexInvalid(index, activeItemIndex)

      if (isInvalid || activeItemIndex === this.activedIndexs[index]) {
        isInvalid && this.$_scrollToValidIndex(index, activeItemIndex)
        return false
      }

      /* istanbul ignore next */
      this.$set(this.activedIndexs, index, activeItemIndex)
      /* istanbul ignore next */
      this.$emit('change', index, activeItemIndex, this.getColumnValue(index))
    },

    // MARK: public methods
    inheritPickerApi(instance, blacklist = []) {
      traverse(API_LIST, api => {
        /* istanbul ignore if */
        if (!instance) {
          return 2
        } else if (~blacklist.indexOf(api)) {
          return 1
        }

        const fn = this[api]

        /* istanbul ignore else */
        if (fn) {
          instance[api] = fn
        } else {
          warn(`inheritPickerApi: Api method [${api}] is undefined`)
        }
      })
    },
    getColumnValue(index = 0) {
      const activeValues = this.getColumnValues()
      return activeValues[index]
    },
    getColumnValues() {
      const data = this.columnValues
      const activeIndexs = this.activedIndexs
      let activeValues = []

      data.forEach((item, index) => {
        activeValues[index] = item[activeIndexs[index]]
      })

      return activeValues
    },
    getColumnIndex(index = 0) {
      return this.activedIndexs[index]
    },
    getColumnIndexs() {
      return this.activedIndexs
    },
    getColumnIndexByDefault(data, defaultIndex = [], defaultValue = [], fn = noop) {
      /* istanbul ignore next */
      this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, fn)
    },
    setColumnValues(index, values, callback = noop) {
      /* istanbul ignore if */
      if (index === undefined || values === undefined) {
        return
      }
      this.$set(this.activedIndexs, index, 0) // reset active index
      this.$set(this.columnValues, index, values)
      this.$nextTick(() => {
        this.$_initSingleColumnScroller(index)
        callback()
      })
    },
    refresh(callback, startIndex = 0) {
      // this.activedIndexs = []
      this.$nextTick(() => {
        this.$_initColumnsScroller(startIndex)
        callback && callback()
      })
    },
  },
}
</script>

<style lang="stylus">
.md-picker-column
  position relative
  width 100%
  padding-bottom constant(safe-area-inset-bottom)
  background color-bg-base
  transform translate3d(0, 0, 0)
  .md-picker-column-container
    height 100%
    .md-picker-column-masker
      position absolute !important
      z-index 2
      left 0
      right 0
      transform translate3d(0, 0, 0)
      &.top
        top 0
        background -webkit-gradient(linear,left bottom,left top,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)))
        hairline(bottom, picker-border-color)
        // border-bottom solid 1px picker-border-color
      &.bottom
        bottom 0
        bottom constant(safe-area-inset-bottom)
        background -webkit-gradient(linear,left top,left bottom,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)))
        hairline(top, picker-border-color)
        // border-top solid 1px picker-border-color
    .md-picker-column-hooks
      display flex
      position absolute
      z-index 3
      absolute-pos()
      .md-picker-column-hook
        display flex
        flex 1
        height 100%
    .md-picker-column-list
      display flex
      height 100%
      .md-picker-column-item
        position relative
        display flex
        flex 1
        clearfix()
        overflow hidden
        ul.column-list
          position absolute
          top 0
          left 0
          width 100%
          transform-origin left top
          box-sizing border-box
          transform translate3d(0, 0, 0)
          li.column-item
            float left
            width 100%
            padding 0 h-gap-md
            box-sizing border-box
            color picker-color
            font-size picker-font-size
            text-align center
            word-ellipsis()
            &.disabled
              opacity picker-disabled-opacity
</style>
