<template>
  <div class="md-tab-picker">
    <md-popup
      :value="value"
      position="bottom"
      :mask-closable="maskClosable"
      @input="$_onInput"
      @show="$emit('show')"
      @hide="$emit('hide')"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        @cancel="$_onCancel"
      >
        <md-icon name="close" size="lg" slot="cancel" />
      </md-popup-title-bar>
      <div class="md-tab-picker-content">
        <md-tabs v-model="currentTab">
          <md-tab-pane
            v-for="(pane, index) in panes"
            :key="pane.name"
            :name="pane.name"
            :label="pane.label"
          >
            <md-radio-list
              v-if="hasSlot"
              :value="pane.value"
              :options="pane.options"
              @input="$_onSelectPaneItem($event, index)"
              icon="right"
              icon-inverse=""
              icon-position="right"
            >
              <template slot-scope="{ option }">
                <slot :option="option"></slot>
              </template>
            </md-radio-list>
            <md-radio-list
              v-else
              :value="pane.value"
              :options="pane.options"
              @input="$_onSelectPaneItem($event, index)"
              icon="right"
              icon-inverse=""
              icon-position="right"
            />
          </md-tab-pane>
        </md-tabs>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import Icon from '../icon'
import Tabs from '../tabs'
import TabPane from '../tab-pane'
import RadioList from '../radio-list'

export default {
  name: 'md-tab-picker',

  components: {
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [RadioList.name]: RadioList,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    describe: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      selected: [],
      currentTab: '',
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
    $_onInput(val) {
      this.$emit('input', val)
    },
    $_onCancel() {
      this.$emit('input', false)
    },
    $_onSelectPaneItem(value, index) {
      this.selected.splice(index, this.selected.length - index, value)
      this.$emit('change', {
        values: this.getSelectedValues(),
        options: this.getSelectedOptions(),
      })
      this.$nextTick(function() {
        const nextPane = this.panes[index + 1]
        /* istanbul ignore else */
        if (nextPane) {
          this.currentTab = nextPane.name
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
  },
}
</script>

<style lang="stylus">
.md-tab-picker
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
  .md-tab-pane
    padding-left tab-picker-h-gap
    padding-right tab-picker-h-gap
  .md-popup-cancel
    width 90px !important
.md-tab-picker-content
  background-color tab-picker-bg
</style>
