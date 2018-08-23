<template>
  <nav class="md-tabs">
    <div class="md-tabs-wrapper" ref="wrapper">
      <template v-if="maxLength < this.items.length">
        <div class="md-tabs-start"></div>
        <div class="md-tabs-end"></div>
      </template>
      <md-scroll-view
        :scrolling-x="scrollable"
        :scrolling-y="false"
        ref="scroller"
      >
        <a
          class="md-tabs-item"
          :class="{
            'is-active': activeKey === item.key
          }"
          :style="itemStyle"
          v-for="(item, index) in items"
          :key="item.key"
          v-text="item.label"
          @click="onClick(item, index)"
        ></a>
        <span class="md-tabs-bar" :style="barStyle"></span>
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
    maxLength: {
      type: Number,
      default: 5,
    },
  },

  data() {
    return {
      activeKey: '',
      wrapperWidth: 0,
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
      return 0
    },
    listStyle() {
      return {
        width: this.itemWidth * this.items.length + 'px',
      }
    },
    itemWidth() {
      return this.wrapperWidth / Math.min(this.items.length, this.maxLength)
    },
    itemStyle() {
      return {
        width: this.itemWidth + 'px',
      }
    },
    barStyle() {
      const pos = this.itemWidth * this.activeIndex
      return {
        width: this.itemWidth + 'px',
        transform: `translateX(${pos}px)`,
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
  },

  created() {
    if (this.activeKey === '' && this.items.length) {
      this.activeKey = this.items[0].key
    }
  },

  mounted() {
    this.reflow()
  },

  methods: {
    reflow() {
      this.wrapperWidth = this.$refs.wrapper.offsetWidth
      this.$nextTick(function() {
        this.$refs.scroller.reflowScroller()
      })
    },
    onClick(item) {
      this.activeKey = item.key
    },
  },
}
</script>

<style lang="stylus">
.md-tabs
  padding-left tab-offset
  padding-right tab-offset
  background-color #fff
.md-tabs-item
  flex 1 0 auto
  display flex
  align-items center
  justify-content center
  color tab-text-color
  font-size tab-font-size
  padding-left tab-space
  padding-right tab-space
  box-sizing border-box
  &.is-active
    color tab-active-color
    font-weight 500
.md-tabs-wrapper
  position relative
  line-height 0
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
.md-tabs-bar
  position absolute
  bottom 0
  left 0
  display block
  height tab-bar-height
  background-color tab-active-color
  transition transform 300ms

.md-tabs
  .scroll-view-container
    display inline-flex
    height tab-height
</style>
