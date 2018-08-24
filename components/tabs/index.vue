<template>
  <nav class="md-tabs">
    <div class="md-tabs-wrapper" ref="wrapper">
      <template v-if="maxLength < this.items.length">
        <div class="md-tabs-start" v-show="maskStartShown"></div>
        <div class="md-tabs-end" v-show="maskEndShown"></div>
      </template>
      <md-scroll-view
        :scrolling-x="scrollable"
        :scrolling-y="false"
        @scroll="$_onScroll"
        ref="scroller"
      >
        <a
          class="md-tabs-item"
          :class="{
            'is-active': activeKey === item.key
          }"
          :style="{
            paddingLeft: itemSpace + 'px',
            paddingRight: itemSpace + 'px'
          }"
          v-for="(item, index) in items"
          :key="item.key"
          ref="items"
          @click="$_onClick(item)"
        >
          <slot
            name="item"
            :item="item"
            :items="items"
            :index="index"
            :activeKey="activeKey"
          >{{ item.label }}</slot>
        </a>
        <span
          class="md-tabs-ink"
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
  name: 'md-tabs',

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
      default: 80,
    },
    maxLength: {
      type: Number,
      default: 5,
    },
  },

  data() {
    return {
      activeKey: '',
      wrapperWidth: 0,
      itemSpace: 10,
      inkWidth: 0,
      inkPos: 0,
      maskStartShown: false,
      maskEndShown: true,
    }
  },

  computed: {
    scrollable() {
      return this.items.length > this.maxLength
    },
    activeIndex() {
      for (let i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].key === this.activeKey) {
          return i
        }
      }
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== this.activeKey) {
          this.activeKey = val
        }
      },
    },
    inkWidth() {
      /* istanbul ignore next */
      this.reflow()
    },
    activeKey() {
      this.reflow()
    },
  },

  created() {
    if (this.activeKey === '' && this.items.length) {
      this.activeKey = this.items[0].key
    }
  },
  mounted() {
    window.addEventListener('resize', this.reflow)
    this.reflow()
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
    $_onClick(item) {
      this.activeKey = item.key
      this.$emit('input', item.key)
      this.$emit('change', item, this.activeIndex)
    },
    // MARK: public methods
    reflow() {
      if (!this.$refs.items || this.$refs.items.length === 0) {
        return
      }

      this.wrapperWidth = this.$refs.wrapper.offsetWidth

      const maxLength = Math.min(this.items.length, this.maxLength)
      let itemsWidth = 0
      for (let i = 0; i < maxLength; i++) {
        const styles = window.getComputedStyle(this.$refs.items[i])
        itemsWidth +=
          this.$refs.items[i].offsetWidth - parseFloat(styles['padding-left']) - parseFloat(styles['padding-right'])
      }
      const leftSpace = this.wrapperWidth - itemsWidth
      this.itemSpace = Math.max(leftSpace / maxLength / 2, 10)

      this.$refs.scroller.reflowScroller()
      this.$nextTick(() => {
        if (!this.$refs.items || !this.$refs.items[this.activeIndex]) {
          return
        }

        const target = this.$refs.items[this.activeIndex]
        this.inkWidth = target.offsetWidth * this.inkLength / 100
        this.inkPos = target.offsetLeft + (target.offsetWidth - this.inkWidth) / 2

        const prevTarget = this.$refs.items[this.activeIndex - 1]
        const nextTarget = this.$refs.items[this.activeIndex + 1]

        const wrapperRect = this.$refs.wrapper.getBoundingClientRect()
        const prevTargetRect = prevTarget && prevTarget.getBoundingClientRect()
        const nextTargetRect = nextTarget && nextTarget.getBoundingClientRect()

        /* istanbul ignore next */
        if (prevTargetRect && prevTargetRect.left < wrapperRect.left) {
          this.$refs.scroller.scrollTo(prevTarget.offsetLeft, 0, true)
        } else if (nextTargetRect && nextTargetRect.right > wrapperRect.right) {
          this.$refs.scroller.scrollTo(nextTarget.offsetLeft + nextTarget.offsetWidth - this.wrapperWidth, 0, true)
        }
      })
    },
  },
}
</script>

<style lang="stylus">
.md-tabs
  padding-left tab-offset
  padding-right tab-offset
  background-color tab-bg

.md-tabs-item
  position relative
  flex 0 0 auto
  width max-content
  display flex
  align-items center
  justify-content center
  color tab-text-color
  font-size tab-font-size
  height tab-height
  box-sizing border-box
  &.is-active
    color tab-active-color

.md-tabs-wrapper
  position relative
  width 100%
  line-height 0

.md-tabs-ink
  position absolute
  bottom 0
  left 0
  display block
  height tab-ink-height
  background-color tab-active-color
  transition all 300ms

.md-tabs-start,
.md-tabs-end
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
    margin-top 0 - tab-height * 0.4
    height tab-height * 0.8
    border-radius 50%
    box-shadow: -1px 0 12px 0 rgba(0,0,0,0.2)
.md-tabs-end
  left auto
  right 0
  transform rotate(180deg)

.md-tabs
  .md-scroll-view
    background none
  .scroll-view-container
    display inline-flex
    justify-content space-between
    min-width 100%
</style>
