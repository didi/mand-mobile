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
    $_titleList () {
      if (this.titles && this.titles.length) {
        return this.titles
      } else if (this.$slots.default && this.$slots.default.length) {
        return this.$slots.default.filter(el => el.tag)
      } else {
        return []
      }
    },

    // MARK: public methods
    selectTab (i) {
      const index = parseInt(i)
      if (index >= 0 && index < this.$_titleList().length) {
        this.activeIndex = index
      }
    }
  },

  render (h) {
    const self = this
    let tabTitles = []
    const mapper = (item, index) => {
      return h(
        'a',
        {
          class: {
            'md-tab-title': true,
            active: this.activeIndex === index
          },
          on: {
            click: () => {
              self.selectTab(index)
            }
          }
        },
        [
          (this.forceUseArray !== undefined ? this.forceUseArray : !!this.$scopedSlots.title) ? this.$scopedSlots.title(item) : item
        ]
      )
    }

    tabTitles = this.$_titleList().map(mapper)

    const innerElements = [...tabTitles]

    if (this.showInkBar) {
      const padPercent = (100 - this.inkBarLength) / 2
      const width = this.inkBarLength / tabTitles.length
      const pad = padPercent / tabTitles.length
      const offset = ((this.activeIndex * 100) / tabTitles.length) + pad

      innerElements.push(h(
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

    return h('nav', { staticClass: 'md-tab-bar' },
      [
        h('div', { staticClass: 'md-tab-bar-inner' },
          [
            h('div', { staticClass: 'md-tab-titles-wrapper' },
              innerElements
            )
          ]
        )
      ]
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
  color tab-text-color
  background tab-bg

  .md-tab-bar-inner
    width 100%
    height tab-height
    overflow auto
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none

  .md-tab-titles-wrapper
    position relative
    height 100%
    min-width 100%
    display inline-flex
    justify-content space-around

  .md-tab-title
    display inline-flex
    justify-content center
    align-items center
    flex 1 0 100px
    min-width 100px
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
