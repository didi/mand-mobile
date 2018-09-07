<template>
  <div class="md-drop-menu">
    <div class="md-drop-menu-bar">
      <template v-for="(item, index) in data">
        <div
          class="bar-item"
          :class="{
            active: index === activeMenuBarIndex,
            selected: $_checkBarItemSelect(index),
            disabled: item.disabled
          }"
          :key="index"
          @click="$_onBarItemClick(item, index)"
        >
          <span
            v-text="$_getBarItemText(item, index)"
          ></span>
        </div>
      </template>
    </div>
    <md-popup
      v-model="isPopupShow"
      position="top"
      prevent-scroll
      :prevent-scroll-exclude="scroller"
      @show="$_onListShow"
      @hide="$_onListHide"
      @before-hide="$_onListBeforeHide"
    >
      <div class="md-drop-menu-list">
        <md-radio
          v-model="selectedMenuListValue[activeMenuBarIndex]"
          :options="activeMenuListData"
          :optionRender="optionRender"
          :is-slot-scope="hasSlot"
          is-align-center
          @change="$_onListItemClick"
        >
          <template slot-scope="{ option }">
            <slot :option="option"></slot>
          </template>
        </md-radio>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import Radio from '../radio'
import {noop, traverse, compareObjects} from '../_util'

export default {
  name: 'md-drop-menu',

  components: {
    [Popup.name]: Popup,
    [Radio.name]: Radio,
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    defaultValue: {
      type: Array,
      default() {
        return []
      },
    },
    optionRender: {
      type: Function,
      default: noop,
    },
  },

  data() {
    return {
      isPopupShow: false,
      selectedMenuListItem: [],
      selectedMenuListValue: [],
      selectedMenuListIndex: [],
      activeMenuBarIndex: -1,
      activeMenuListData: [],
      scroller: '',
    }
  },

  computed: {
    hasSlot() {
      return !!this.$scopedSlots.default
    },
  },

  watch: {
    data(val, oldVal) {
      // Avoid  Literals
      /* istanbul ignore if  */
      if (!compareObjects(val, oldVal)) {
        this.$_initSelectedBar()
      }
    },
    defaultValue(val, oldVal) {
      /* istanbul ignore if  */
      if (!compareObjects(val, oldVal)) {
        this.$_initSelectedBar()
      }
    },
  },

  mounted() {
    this.$_initSelectedBar()
  },

  methods: {
    // MARK: private methods
    $_initSelectedBar() {
      this.selectedMenuListValue = this.defaultValue
      traverse(this.data, ['options'], (item, level, indexs) => {
        const barItemIndex = indexs[0]
        const defaultValue = this.defaultValue[barItemIndex]
        if (
          defaultValue !== undefined &&
          (item.value === defaultValue || item.text === defaultValue || item.label === defaultValue)
        ) {
          this.$set(this.selectedMenuListItem, barItemIndex, item)
          return 2
        }
      })
    },
    $_checkBarItemSelect(index) {
      return !!(this.selectedMenuListItem[index] !== undefined || this.defaultValue[index])
    },
    $_getBarItemText(item, index) {
      return this.selectedMenuListItem[index] !== undefined ? this.selectedMenuListItem[index].text : item.text
    },
    $_setScroller() {
      const boxer = this.$el ? this.$el.querySelector('.md-popup-box') : null
      if (boxer && boxer.clientHeight >= this.$el.clientHeight) {
        this.scroller = '.md-field-content'
      } else {
        return ''
      }
    },

    // MARK: events handler
    $_onBarItemClick(barItem, index) {
      /* istanbul ignore if  */
      if (!barItem || barItem.disabled) {
        return
      }

      if (!this.isPopupShow) {
        this.isPopupShow = true
        this.activeMenuBarIndex = index
        this.activeMenuListData = barItem.options
      } else {
        this.isPopupShow = false
      }
    },
    $_onListItemClick(listItem) {
      const activeMenuBarIndex = this.activeMenuBarIndex
      const barItem = this.data[activeMenuBarIndex]
      this.isPopupShow = false
      this.$set(this.selectedMenuListItem, activeMenuBarIndex, listItem)
      this.$emit('change', barItem, listItem)
    },
    $_onListShow() {
      /* istanbul ignore next  */
      this.$_setScroller()
      this.$emit('show')
    },
    $_onListHide() {
      /* istanbul ignore next  */
      this.$emit('hide')
    },
    $_onListBeforeHide() {
      /* istanbul ignore next  */
      this.activeMenuBarIndex = -1
    },

    // MARK: public methods
    getSelectedValues() {
      return this.selectedMenuListItem
    },
    getSelectedValue(index) {
      return this.selectedMenuListItem[index]
    },
  },
}
</script>

<style lang="stylus">
.md-drop-menu
  position fixed
  z-index drop-menu-zindex
  top 0
  left 0
  right 0
  height drop-menu-height
  padding-bottom constant(safe-area-inset-bottom)
  box-sizing border-box
  color color-text-minor
  font-size drop-menu-font-size
  font-weight drop-menu-font-weight

.md-drop-menu-bar
  z-index drop-menu-zindex
  display flex
  height 100%
  background drop-menu-bar-bg
  hairline(bottom, drop-menu-bar-border-color)
  .bar-item
    display flex
    flex 1
    margin 2% 0
    align-items center
    justify-content center
    span
      position relative
      padding-right 30px
      &:after
        content ""
        position absolute
        right 0
        top 50%
        width 0
        height 0
        margin-top -4px
        border-left solid 8px transparent
        border-right solid 8px transparent
        border-top solid 9px color-text-minor
        transition transform .3s ease-in-out-quint
    &.active
      span:after
        transform rotate(180deg)
    &.selected
      color drop-menu-color
      span:after
        border-top-color drop-menu-color
    &.disabled
      opacity drop-menu-disabled-opacity

.md-drop-menu-list
  width 100%
  padding-top drop-menu-height
  background drop-menu-list-bg
  box-sizing border-box
</style>
