<script>import TabBar from '../tab-bar'

export default {
  name: 'md-tabs',

  components: {
    [TabBar.name]: TabBar,
  },

  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
    },
    showInkBar: {
      type: Boolean,
      default: true,
    },
    inkBarLength: {
      type: Number,
      default: 70,
      validator(length) {
        return length > 0 && length <= 100
      },
    },
    inkBarAnimate: {
      type: Boolean,
      default: true,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    noslide: {
      type: Boolean,
      default: false,
    },
    upsideDown: {
      type: Boolean,
      default: false,
    },
    forceUseArray: {
      type: Boolean,
      default: undefined,
    },
  },

  data() {
    return {
      activeIndex: 0,
    }
  },

  watch: {
    activeIndex(val, preVal) {
      this.$emit('change', val, preVal)
      this.$emit('indexChanged', val, preVal)
    },
  },

  mounted() {
    this.selectTab(this.activeIndex)
  },

  methods: {
    // MARK: public methods
    selectTab(i) {
      const index = parseInt(i)
      if (index >= 0 && index < this.titleList().length) {
        this.activeIndex = index
      }
    },

    titleList() {
      if (this.titles && this.titles.length) {
        return this.titles
      } else if (this.$slots.title && this.$slots.title.length) {
        return this.$slots.title.filter(el => el.tag)
      } else {
        return []
      }
    },

    contentList() {
      if (this.$slots.default) {
        return this.$slots.default.filter(el => el.tag)
      } else {
        return []
      }
    },
  },

  render(createElement) {
    const self = this

    const titleBarRenderer = createElement(
      'md-tab-bar',
      {
        props: {
          titles: self.titles,
          defaultIndex: self.activeIndex,
          showInkBar: self.showInkBar,
          inkBarLength: self.inkBarLength,
          inkBarAnimate: self.inkBarAnimate,
          forceUseArray: self.forceUseArray,
        },
        class: {
          'on-bottom': self.upsideDown,
        },
        on: {
          indexChanged(i) {
            self.selectTab(i)
          },
        },
        scopedSlots: this.$scopedSlots,
      },
      this.$slots.title || [],
    )

    const contentRenderer = this.contentList().map((content, index) => {
      return createElement(
        'div',
        {
          class: {
            'md-tab-content': true,
          },
          key: index,
          attrs: {
            key: index,
          },
        },
        [content],
      )
    })

    const contentWrapperRenderer = createElement(
      'div',
      {
        class: {
          'md-tab-content-wrapper': true,
        },
        style: {
          transform: self.noslide ? '' : `translateX(${-this.activeIndex * 100}%)`,
        },
      },
      [self.noslide ? contentRenderer[this.activeIndex] : contentRenderer],
    )

    return createElement(
      'div',
      {
        class: {
          'md-tabs': true,
        },
      },
      self.upsideDown ? [contentWrapperRenderer, titleBarRenderer] : [titleBarRenderer, contentWrapperRenderer],
    )
  },
}
</script>

<style lang="stylus">
.md-tabs
  z-index tab-zindex
  font-size tab-font-size
  display flex
  flex-direction column
  overflow hidden
  flex 1

  .md-tab-bar
    flex-shrink 0
    hairline(bottom, tab-border-color)
    &.on-bottom
      border-bottom none
      hairline(top, tab-border-color)

  .md-tab-content-wrapper
    position relative
    min-height 100px
    display flex
    flex 1
    transition transform .5s
    .md-tab-content
      width 100%
      height 100%
      top 0
      overflow-y scroll
      flex-shrink 0
</style>
