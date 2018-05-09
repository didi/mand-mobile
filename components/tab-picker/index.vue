<template>
  <div class="md-tab-picker">
    <md-popup
      v-model="isTabPickerShow"
      position="bottom"
      :mask-closable="false"
      @show="$_onShow"
      @hide="$_onHide"
    >
      <md-popup-title-bar
        :title="title"
        :ok-text="okText"
        :cancel-text="cancelText"
        @confirm="$_onConfirm"
        @cancel="$_onCancel"
      ></md-popup-title-bar>
      <div class="md-tab-picker-content">
        <md-tabs
          ref="tabs"
          :titles="subTitles"
          :default-index="defaultTabIndex"
          :force-use-array="hasTitleSlotScope"
          @indexChanged="$_onIndexChange"
        >
          <template
            slot="title"
            slot-scope="props">
            <slot :label="props" name="titles"></slot>
          </template>
          <div v-for="(title, index) of subTitles" :key="index">
            <md-radio
              ref="radio1"
              :options="renderData[index].data"
              :default-index="~renderData[index].clickedKey ? renderData[index].clickedKey : -1"
              :key="renderData[index].clickedKey"
              :is-slot-scope="hasOptionSlotScope"
              @change="$_onRadioChange"
            >
              <template
                slot-scope="props">
                <slot :option="props.option" :index="index" name="option"></slot>
              </template>
            </md-radio>
          </div>
        </md-tabs>
        <div class="slot-wrapper" v-if="isLoading || isDataError">
          <div class="slot-inner">
            <slot name="error" v-if="isDataError">数据异常</slot>
            <slot name="loading" v-if="isLoading">loading</slot>
          </div>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import Tabs from '../tabs'
import Icon from '../icon'
import Radio from '../radio'
import {noop, compareObjects} from '../_util'

export default {
  name: 'md-tab-picker',

  components: {
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Radio.name]: Radio,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '确认',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    dataStruct: {
      type: String,
      default: 'normal',
    },
    defaultIndex: {
      type: Array,
      default() {
        return []
      },
    },
    optionRender: {
      type: Array,
      default() {
        return []
      },
      validator(value) {
        if (value.length > 0) {
          return value.every(item => {
            return typeof item === 'function'
          })
        } else {
          return true
        }
      },
    },
    asyncFunc: {
      type: Function,
      default() {
        return noop
      },
    },
  },

  data() {
    return {
      isTabPickerShow: false,
      subTitles: [],
      renderData: [],
      defaultTabIndex: 0,
      currentIndex: 0,
      isLoading: true,
      isDataError: false,
      currentColumnLock: false,
    }
  },

  watch: {
    value(val) {
      val && (this.isTabPickerShow = val)
    },
    isTabPickerShow(val) {
      !val && this.$emit('input', val)
    },
    data: {
      handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.$_initTabPicker()
        }
      },
      deep: true,
    },
    isDataError(val) {
      if (val) {
        setTimeout(() => {
          this.isDataError = false
        }, 2000)
      }
    },
  },

  computed: {
    hasTitleSlotScope() {
      return !!this.$scopedSlots.titles
    },
    hasOptionSlotScope() {
      return !!this.$scopedSlots.option
    },
  },

  created() {
    this.$_initTabPicker()
  },

  methods: {
    // MARK: private methods
    $_initTabPicker() {
      switch (this.dataStruct) {
        case 'normal':
          this.$_initNoCascadeData()
          break
        case 'cascade':
          this.$_initCascadeData()
          break
        case 'async':
          this.$_initAsyncCascadeData()
          break
        default:
          break
      }
    },
    $_initCascadeData() {
      if (this.data.length === 0) {
        return
      }
      this.isLoading = false
      if (this.defaultIndex && this.defaultIndex.length > 0) {
        let i = 0
        const func = array => {
          if (i < this.defaultIndex.length) {
            const temp = this.defaultIndex[i]
            array.forEach((item, eq) => {
              if (eq === temp) {
                this.subTitles.push(item.label)
                this.renderData.push({index: i, clickedKey: temp, data: array})
                if (item && item.children && Array.isArray(item.children)) {
                  i++
                  func(item.children)
                }
              }
            })
          } else {
            this.defaultTabIndex = i
            return false
          }
        }
        func(this.data)
      } else {
        this.subTitles.push('请选择')
        this.renderData.push({index: 0, clickedKey: -1, data: this.data})
      }
    },
    $_initNoCascadeData() {
      if (this.data.length === 0) {
        return
      }
      this.isLoading = false
      this.data.forEach((item, index) => {
        const temp = {
          index: index,
          clickedKey: this.defaultIndex.length > 0 && ~this.defaultIndex[index] ? this.defaultIndex[index] : -1,
          data: item.children,
        }
        this.renderData.push(temp)
        const currentColumn = this.renderData[index]
        if (this.defaultIndex && this.defaultIndex.length > 0) {
          this.subTitles.push(currentColumn.data[currentColumn.clickedKey].label)
        } else {
          this.subTitles.push(item.label)
        }
      })
    },
    $_initAsyncCascadeData() {
      this.asyncFunc(null, this.$_renderNextTabContent)
    },
    $_renderNextTabContent(err, data) {
      this.isLoading = false
      if (err) {
        this.isDataError = err
        return
      }
      try {
        this.subTitles.splice(this.currentIndex + 1, this.subTitles.length - 1, '请选择')
        this.renderData.splice(this.currentIndex + 1, this.renderData.length - 1, {
          index: this.currentIndex,
          clickedKey: -1,
          data: data.options,
          asyncFunc: data.asyncFunc,
        })
        if (this.renderData.length > 1) {
          this.$nextTick(() => {
            this.$refs.tabs.selectTab(++this.currentIndex)
          })
        }
      } catch (error) {
        this.isDataError = true
      }
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
    },
    $_onConfirm() {
      this.isTabPickerShow = false
      const selectedItem = this.getSelectedItem()
      this.$emit('confirm', selectedItem)
    },
    $_onCancel() {
      this.isTabPickerShow = false
      this.$emit('cancel')
    },
    $_onRadioChange(value, index) {
      if (this.dataStruct === 'cascade' && this.currentColumnLock) {
        return
      }
      this.currentColumnLock = true
      this.subTitles[this.currentIndex] = value.label
      const currentColumn = this.renderData[this.currentIndex]
      currentColumn.clickedKey = index
      this.$emit('change', {
        selectTab: this.currentIndex,
        selectIndex: index,
        selectItem: value,
      })
      if (this.dataStruct === 'cascade') {
        if (value && value.children && Array.isArray(value.children) && value.children.length > 0) {
          this.subTitles.splice(this.currentIndex + 1, this.subTitles.length - 1, '请选择')
          this.renderData.splice(this.currentIndex + 1, this.renderData.length - 1, {
            index: ++this.currentIndex,
            clickedKey: -1,
            data: value.children,
          })
          this.$nextTick(() => {
            this.$refs.tabs.selectTab(this.currentIndex)
            setTimeout(() => {
              this.currentColumnLock = false
            }, 500)
          })
          return
        }
        this.currentColumnLock = false
      }
      if (this.dataStruct === 'async' && currentColumn.asyncFunc) {
        value = {
          index: index,
          ...value,
        }
        // Object.assign(value, {index})
        this.isLoading = true
        typeof currentColumn.asyncFunc === 'function' && currentColumn.asyncFunc(value, this.$_renderNextTabContent)
      }
    },
    $_onIndexChange(index) {
      this.currentIndex = index
    },

    // MARK: public methods
    getSelectedItem() {
      return this.renderData.map((item, index) => {
        if (~item.clickedKey) {
          const selected = item.data[item.clickedKey]
          return {
            index: index,
            item: {
              label: selected.label,
              value: selected.value,
            },
          }
        } else {
          return null
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.md-tab-picker
  color color-gray-1
  -webkit-font-smoothing antialiased
  font-size tab-picker-font-size
  .md-tab-picker-content
    background color-bg-base
</style>

<style lang="stylus">
.md-tab-picker
  .md-tab-picker-content
    position relative
  .md-tabs
    .md-tab-content-wrapper
      height 400px
      .md-tab-content
        height 400px
        overflow scroll
  .slot-wrapper
    background rgba(255, 255, 255, 0.7)
    position absolute
    top 80px
    left 0
    width 100%
    bottom 0
    .slot-inner
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
  .md-popup-box
    background-color color-bg-base
</style>
