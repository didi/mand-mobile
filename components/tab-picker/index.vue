<template>
  <div class="md-tab-picker">
    <md-popup
      :value="value"
      position="bottom"
      :mask-closable="maskClosable"
      @input="$_onPopupInput"
      @show="$_onPopupShow"
      @hide="$_onPopupHide"
      @maskClick="$_onCancel"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        :large-radius="largeRadius"
        only-close
        @cancel="$_onCancel"
      >
        <md-icon name="close" size="lg" slot="cancel" />
      </md-popup-title-bar>
      <div class="md-tab-picker-content">
          <md-tabs
            v-model="currentTab"
            :key="tabsTmpKey"
            :inkLength="100"
            ref="tabs"
          >
            <md-scroll-view
              ref="scrollView"
              :scrolling-x="false"
              auto-reflow
            >
              <md-tab-pane
                v-for="(pane, index) in panes"
                :key="pane.name"
                :name="pane.name"
                :label="pane.label"
              >
                <md-radio-list
                  :value="pane.value"
                  :options="pane.options"
                  :is-slot-scope="hasSlot"
                  @input="$_onSelectPaneItem($event, index)"
                  icon=""
                  icon-inverse=""
                  icon-position="right"
                >
                  <template slot-scope="{ option }">
                    <slot :option="option"></slot>
                  </template>
                </md-radio-list>
              </md-tab-pane>
            </md-scroll-view>
          </md-tabs>
      </div>
    </md-popup>
  </div>
</template>

<script>import {t} from '../_locale'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import Icon from '../icon'
import Tabs from '../tabs'
import TabPane from '../tab-pane'
import RadioList from '../radio-list'
import ScrollView from '../scroll-view'
import {extend} from '../_util'

export default {
  name: 'md-tab-picker',

  mixins: [popupMixin, popupTitleBarMixin],

  components: {
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [RadioList.name]: RadioList,
    [ScrollView.name]: ScrollView,
  },

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: t('md.tab_picker.choose'),
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // title: {
    //   type: String,
    //   default: '',
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
  },

  data() {
    return {
      selected: [],
      oldSelected: [],
      currentTab: '',
      oldCurrentTab: '',
      tabsTmpKey: Date.now(),
    }
  },

  computed: {
    panes() {
      const panes = []
      let target = this.data
      let cursor = 0
      while (target && target.name) {
        const pane = {
          name: target.name,
          label: target.label || this.placeholder,
          value: this.selected[cursor],
          selected: null,
          options: target.options,
        }
        let find = false
        for (let i = 0, len = target.options.length; i < len; i++) {
          if (target.options[i].value === this.selected[cursor]) {
            pane.label = target.options[i].label
            pane.selected = target.options[i]
            target = target.options[i].children
            find = true
            cursor++
            break
          }
        }
        if (!find) {
          target = null
        }
        panes.push(pane)
        this.currentTab = pane.name // select the tab corresponding to this pane
      }

      return panes
    },
    hasSlot() {
      return !!this.$scopedSlots.default
    },
  },

  created() {
    /* istanbul ignore else */
    if (this.defaultValue) {
      this.selected = this.defaultValue
    }

    /* istanbul ignore else */
    if (this.data) {
      this.currentTab = this.data.name
    }
  },

  methods: {
    // MARK: private events
    $_onPopupInput(val) {
      this.$emit('input', val)
    },
    $_onPopupShow() {
      this.$refs.tabs.reflowTabBar()
      this.$emit('show')
      setTimeout(() => {
        this.oldSelected = extend([], this.selected)
        this.oldCurrentTab = this.currentTab
      }, 100)
    },
    $_onPopupHide() {
      this.$emit('hide')
    },
    $_onCancel() {
      this.hideTabPicker()
      setTimeout(() => {
        this.selected = extend([], this.oldSelected)
        this.currentTab = this.oldCurrentTab
        this.tabsTmpKey = Date.now()
      }, 100)
    },
    $_onSelectPaneItem(value, index) {
      this.selected.splice(index, this.selected.length - index, value)
      this.$nextTick(() => {
        const nextPane = this.panes[index + 1]

        this.$emit('select', {
          index,
          value,
          option: this.panes[index],
        })

        /* istanbul ignore else */
        if (nextPane) {
          this.currentTab = nextPane.name
          this.$refs.scrollView.scrollTo(0, 0)
        } else if (value !== '') {
          setTimeout(() => {
            this.$emit('change', {
              values: this.getSelectedValues(),
              options: this.getSelectedOptions(),
            })
            this.hideTabPicker()
          }, 300)
        }
      })
    },
    // MARK: public methods
    getSelectedValues() {
      return this.selected
    },
    getSelectedOptions() {
      if (this.panes && this.panes.length) {
        return this.panes.filter(pane => pane.value).map(pane => pane.selected)
      } else {
        return []
      }
    },
    hideTabPicker() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="stylus">
.md-tab-picker
  .md-popup
    z-index tab-picker-zindex
  .md-tab-bar
    position relative
    margin-left tab-picker-h-gap
    margin-right tab-picker-h-gap
    padding-left 0
    padding-right 0
    background-color tab-picker-bg
    hairline(bottom, color-border-base)
  .md-tabs-content
    height tab-picker-height
    overflow auto
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
  .md-tab-bar-list
    justify-content flex-start
    .md-tab-bar-item
      flex none
      margin 0 0
      padding 0 30px
      font-size font-caption-normal
  .md-tab-pane
    padding-left tab-picker-h-gap
    padding-right tab-picker-h-gap
    box-sizing border-box
  .md-popup-cancel
    width 90px !important
.md-tab-picker-content
  background-color tab-picker-bg
  .md-radio-item.is-selected
    .md-cell-item-body .md-cell-item-title
      color radio-color
</style>
