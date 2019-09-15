<template>
  <nav class="md-tab-bar">
    <div class="md-tab-bar-inner" ref="wrapper">
      <template v-if="scrollable">
        <div class="md-tab-bar-start" v-show="maskStartShown"></div>
        <div class="md-tab-bar-end" v-show="maskEndShown"></div>
      </template>
      <md-scroll-view
        ref="scroller"
        :scrolling-x="scrollable"
        :scrolling-y="false"
        :key="scrollerTmpKey"
        @scroll="$_onScroll"
      >
         <div class="md-tab-bar-list" :style="{width: contentW + 'px'}">
          <a
            class="md-tab-bar-item"
            :class="{
              'is-active': currentName === item.name,
              'is-disabled': !!item.disabled
            }"
            v-for="(item, index) in items"
            :key="item.name"
            ref="items"
            @click="$_onClick(item, index)"
          >
            <slot
              name="item"
              :item="item"
              :items="items"
              :index="index"
              :currentName="currentName"
            >{{ item.label }}</slot>
          </a>
        </div>
        <span
          class="md-tab-bar-ink"
          :class="{
            'is-disabled': currentTab && currentTab.disabled
          }"
          v-if="hasInk"
          :style="{
            width: inkWidth + 'px',
            transform: 'translateX(' + inkPos + 'px)',
          }"
        ></span>
      </md-scroll-view>
    </div>
  </nav>
</template>

<script>import ScrollView from '../scroll-view'

export default {
  name: 'md-tab-bar',

  components: {
    [ScrollView.name]: ScrollView,
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    hasInk: {
      type: Boolean,
      default: true,
    },
    inkLength: {
      type: Number,
      default: 100,
    },
    immediate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentName: '',
      wrapperW: 0,
      contentW: 0,
      inkWidth: 0,
      inkPos: 0,
      scrollerTmpKey: Date.now(),
      maskStartShown: false,
      maskEndShown: true,
    }
  },

  computed: {
    scrollable() {
      return this.contentW > this.wrapperW
    },
    currentIndex() {
      for (let i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].name === this.currentName) {
          return i
        }
      }
    },
    currentTab() {
      if (this.currentIndex) {
        return this.items[this.currentIndex]
      }
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== this.currentName) {
          this.currentName = val
        }
      },
    },
    inkWidth() {
      /* istanbul ignore next */
      this.$nextTick(function() {
        this.reflow()
      })
    },
    items() {
      this.$nextTick(function() {
        this.reflow()
      })
    },
    currentIndex() {
      this.$nextTick(function() {
        this.reflow()
      })
    },
    scrollable() {
      this.scrollerTmpKey = Date.now()
    },
  },

  created() {
    if (this.currentName === '' && this.items.length) {
      this.currentName = this.items[0].name
      this.$emit('change', this.items[0], 0, 0)
    }
  },
  mounted() {
    window.addEventListener('resize', this.reflow)
    this.reflow()

    if (this.immediate) {
      this.$nextTick(() => {
        this.$emit('change', this.items[this.currentIndex], this.currentIndex)
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reflow)
  },

  methods: {
    // MARK: private events
    $_onScroll({scrollLeft}) /* istanbul ignore next */ {
      if (scrollLeft > 0) {
        this.maskStartShown = true
      } else {
        this.maskStartShown = false
      }

      if (scrollLeft >= this.$refs.scroller.contentW - this.$refs.scroller.containerW) {
        this.maskEndShown = false
      } else {
        this.maskEndShown = true
      }
    },
    $_onClick(item, index) {
      if (item.disabled) {
        return
      }
      this.$emit('change', item, index, this.currentIndex)
      this.currentName = item.name
      this.$emit('input', item.name)
    },
    // MARK: public methods
    reflow() {
      if (!this.$refs.items || this.$refs.items.length === 0) {
        return
      }

      this.wrapperW = this.$refs.wrapper.offsetWidth

      let contentWidth = 0
      for (let i = 0, len = this.items.length; i < len; i++) {
        contentWidth += this.$refs.items[i].offsetWidth
      }
      this.contentW = contentWidth
      this.$refs.scroller.reflowScroller()
      this.$nextTick(() => {
        if (!this.$refs.items || !this.$refs.items[this.currentIndex]) {
          return
        }

        const target = this.$refs.items[this.currentIndex]
        this.inkWidth = target.offsetWidth * this.inkLength / 100
        this.inkPos = target.offsetLeft + (target.offsetWidth - this.inkWidth) / 2

        const prevTarget = this.$refs.items[this.currentIndex - 1]
        const nextTarget = this.$refs.items[this.currentIndex + 1]

        if (!prevTarget) {
          this.$refs.scroller.scrollTo(0, 0, true)
          return
        }

        if (!nextTarget) {
          this.$refs.scroller.scrollTo(this.contentW, 0, true)
          return
        }

        const wrapperRect = this.$refs.wrapper.getBoundingClientRect()
        const prevTargetRect = prevTarget.getBoundingClientRect()
        const nextTargetRect = nextTarget.getBoundingClientRect()

        /* istanbul ignore next */
        if (prevTargetRect && prevTargetRect.left < wrapperRect.left) {
          this.$refs.scroller.scrollTo(prevTarget.offsetLeft, 0, true)
        } else if (nextTargetRect && nextTargetRect.right > wrapperRect.right) {
          this.$refs.scroller.scrollTo(nextTarget.offsetLeft + nextTarget.offsetWidth - this.wrapperW, 0, true)
        }
      })
    },
  },
}
</script>

<style lang="stylus">
.md-tab-bar
  position relative
  padding-left tab-offset
  padding-right tab-offset
  background-color tab-bg

.md-tab-bar-inner
  position relative
  width 100%
  // line-height 0

.md-tab-bar-list
  display flex
  justify-content space-between
  min-width 100%

.md-tab-bar-item
  flex auto
  flex-shrink 0
  position relative
  display inline-flex
  align-items center
  justify-content center
  color tab-text-color
  font-size tab-font-size
  font-weight tab-font-weight
  min-height tab-height
  padding 0 tab-item-gap
  margin 0 auto
  box-sizing border-box
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &.is-active
    color tab-active-color
  &.is-disabled
    color tab-disabled-color

.md-tab-bar-ink
  position absolute
  bottom 0
  left 0
  display block
  height tab-ink-height
  background-color tab-active-color
  transition all 300ms
  &.is-disabled
    background-color tab-disabled-color

.md-tab-bar-start,
.md-tab-bar-end
  position absolute
  top 0
  left 0
  width 14px
  height tab-height
  overflow hidden
  &::after
    content ''
    display block
    position absolute
    left -14px
    top 50%
    width 14px
    if tab-height is a 'unit'
      margin-top 0 - tab-height * 0.4
      height tab-height * 0.8
    else
      margin-top "calc(0 - %s * 0.4)" % tab-height
      height "calc(%s * 0.8)" % tab-height
    border-radius 50%
    box-shadow: -1px 0 12px 0 rgba(0,0,0,0.2)
.md-tab-bar-end
  left auto
  right 0
  transform rotate(180deg)

.md-tab-bar
  .md-scroll-view
    display block
  .scroll-view-container
    min-width 100%
</style>
