<script>
export default {
  name: 'md-tab-bar',

  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    },
    showInkBar: {
      type: Boolean,
      default: true
    },
    inkBarLength: {
      type: Number,
      default: 70,
      validator (length) {
        return length > 0 && length <= 100
      }
    },
    inkBarAnimate: {
      type: Boolean,
      default: true
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    forceUseArray: {
      type: Boolean,
      default: undefined
    }
  },

  data () {
    return {
      activeIndex: this.defaultIndex
    }
  },

  watch: {
    defaultIndex (val) {
      this.selectTab(val)
    },
    activeIndex (val, preVal) {
      this.$emit('indexChanged', val, preVal)
    }
  },

  mounted () {
    this.selectTab(this.activeIndex)
  },

  methods: {
    // MARK: private methods
    $_onSelectTab (index) {
      this.selectTab(index)
    },

    // MARK: public methods
    selectTab (i) {
      const index = parseInt(i)
      if (index >= 0 && index < this.titleList().length) {
        this.activeIndex = index
      }
    },

    titleList () {
      if (this.titles && this.titles.length) {
        return this.titles
      } else if (this.$slots.default && this.$slots.default.length) {
        return this.$slots.default.filter(el => el.tag)
      } else {
        return []
      }
    }
  },

  render (createElement) {
    const self = this
    let tabTitles = []
    const mapper = (item, index) => {
      return createElement(
        'div',
        {
          class: {
            'md-tab-title': true,
            active: this.activeIndex === index
          },
          on: {
            click: () => {
              self.$_onSelectTab(index)
            }
          }
        },
        [
          (this.forceUseArray !== undefined ? this.forceUseArray : !!this.$scopedSlots.title) ? this.$scopedSlots.title(item) : item
        ]
      )
    }

    tabTitles = this.titleList().map(mapper)

    const innerElements = [...tabTitles]
    if (this.showInkBar) {
      const padPercent = (100 - this.inkBarLength) / 2
      const width = this.inkBarLength / tabTitles.length
      const pad = padPercent / tabTitles.length
      const offset = ((this.activeIndex * 100) / tabTitles.length) + pad

      innerElements.push(createElement(
        'div',
        {
          class: {
            'ink-bar': true,
            'animate': this.inkBarAnimate
          },
          style: {
            width: `${width}%`,
            left: `${offset}%`
          }
        }
      ))
    }

    return createElement(
      'div',
      {
        class: {
          'md-tab-bar': true
        }
      },
      [createElement(
        'div',
        {
          class: {
            'md-tab-titles-wrpper': true
          }
        },
        innerElements
      )]
    )
  }
}
</script>

<style lang="stylus">
.md-tab-bar
  position relative
  z-index tab-zindex
  height tab-height
  font-size tab-font-size
  color color-gray-1
  background color-bg-base

  .md-tab-titles-wrpper
    position relative
    height 100%
    display flex
    justify-content space-around
  .md-tab-title
    display flex
    justify-content center
    align-items center
    flex 1
    height 100%
    text-align center
    &.active
      color tab-color

  .ink-bar
    position absolute
    bottom 0
    height tab-ink-bar-height
    background tab-color
    &.animate
      transition left 0.3s
</style>
