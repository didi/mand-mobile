<template>
  <div class="md-tab-picker">
    <md-popup
      v-model="isTabPickerShow"
      position="bottom"
      :mask-closable="maskClosable"
      @show="$_onShow"
      @hide="$_onHide"
      @maskClick="$_onMaskClose"
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
          :key="refreshTabPicker"
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
              is-across-border
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
            <slot name="error" v-if="isDataError">{{errorLabel}}</slot>
            <slot name="loading" v-if="isLoading">{{loadingLabel}}</slot>
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
    placeholder: {
      type: String,
      default: '请选择',
    },
    loadingLabel: {
      type: String,
      default: '载入中',
    },
    errorLabel: {
      type: String,
      default: '数据异常',
    },
    maskClosable: {
      type: Boolean,
      default: true,
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
      lastSelectIndex: null,
      refreshTabPicker: 0,
      walkTimes: 0,
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
    $_initNoCascadeData() {
      if (this.data.length === 0) {
        return
      }
      this.isLoading = false

      const initialIndex = this.lastSelectIndex || this.defaultIndex
      this.$_initTabContent()

      this.data.forEach((item, index) => {
        const temp = {
          index: index,
          clickedKey: initialIndex.length > 0 && ~initialIndex[index] ? initialIndex[index] : -1,
          data: item.children,
        }
        this.renderData.push(temp)
        const currentColumn = this.renderData[index]
        if (initialIndex && initialIndex.length > 0) {
          this.subTitles.push(currentColumn.data[currentColumn.clickedKey].label)
        } else {
          this.subTitles.push(item.label)
        }
      })
    },
    $_initCascadeData() {
      if (this.data.length === 0) {
        return
      }
      const initialIndex = this.lastSelectIndex || this.defaultIndex
      this.$_walk(initialIndex, this.data)
    },
    $_initAsyncCascadeData() {
      this.asyncFunc(null, this.$_renderInitalAsync)
    },
    $_renderInitalAsync(err, data) {
      if (err) {
        this.isDataError = err
        return
      }
      const initialIndex = this.lastSelectIndex || this.defaultIndex
      this.$_walk(initialIndex, data, true)
    },
    $_walk(initialIndex, data, isAsync) {
      // recursion cascade or async data with initialIndex
      const func = () => {
        if (initialIndex && initialIndex.length > 0) {
          const walk = (err, data) => {
            if (err) {
              this.isLoading = false
              this.isDataError = err
              return
            }
            if (this.walkTimes < initialIndex.length) {
              const temp = initialIndex[this.walkTimes]
              let rawData = isAsync ? data.options : data
              rawData.forEach((item, eq, array) => {
                if (eq === temp) {
                  this.currentIndex = this.walkTimes
                  this.subTitles.splice(this.currentIndex, this.subTitles.length - 1, item.label)
                  let renderContent = {
                    index: this.walkTimes,
                    clickedKey: temp,
                    data: array,
                  }
                  if (isAsync) {
                    renderContent = {
                      ...renderContent,
                      asyncFunc: data.asyncFunc,
                    }
                  }
                  this.renderData.splice(this.currentIndex, this.renderData.length - 1, renderContent)
                  this.$refs.tabs && this.$refs.tabs.selectTab(this.currentIndex)
                  this.walkTimes++
                  if (item && item.children && Array.isArray(item.children)) {
                    walk(null, item.children)
                  } else if (isAsync && data && data.asyncFunc && typeof data.asyncFunc === 'function') {
                    data.asyncFunc(
                      {
                        index: this.walkTimes,
                        item,
                        eq,
                      },
                      walk,
                    )
                  } else {
                    walk()
                  }
                }
              })
            } else {
              this.isLoading = false
              this.defaultTabIndex = this.walkTimes - 1
              this.walkTimes = 0
              return false
            }
          }
          walk(null, data)
        } else {
          this.$_initTabContent()
          this.subTitles.push(this.placeholder)
          if (isAsync) {
            this.renderData.push({
              index: 0,
              clickedKey: -1,
              data: data.options,
              asyncFunc: data.asyncFunc,
            })
          } else {
            this.renderData.push({
              index: 0,
              clickedKey: -1,
              data: data,
            })
          }
          this.isLoading = false
        }
      }
      func()
    },
    $_initTabContent() {
      this.subTitles = []
      this.renderData = []
      this.currentIndex = 0
    },
    $_renderNextTabContent(orignData) {
      return (err, asyncData) => {
        this.isLoading = false
        if (err) {
          this.isDataError = err
          return
        }
        try {
          let data,
            asyncFunc = null
          if (orignData) {
            data = orignData
          } else if (asyncData && asyncData.options) {
            data = asyncData.options
            if (asyncData.asyncFunc) {
              asyncFunc = asyncData.asyncFunc
            }
          } else {
            data = []
          }

          if (!data || data.length === 0) {
            this.subTitles.splice(this.currentIndex + 1, this.subTitles.length - 1)
            this.renderData.splice(this.currentIndex + 1, this.renderData.length - 1)
            this.currentColumnLock = false
            return
          }

          this.subTitles.splice(this.currentIndex + 1, this.subTitles.length - 1, this.placeholder)
          this.renderData.splice(this.currentIndex + 1, this.renderData.length - 1, {
            index: this.currentIndex,
            clickedKey: -1,
            data,
            asyncFunc,
          })

          if (this.renderData.length > 1) {
            this.$nextTick(() => {
              this.$refs.tabs.selectTab(++this.currentIndex)
              setTimeout(() => {
                this.currentColumnLock = false
              }, 500)
            })
          }
        } catch (error) {
          this.isDataError = true
        }
      }
    },
    $_refreshTabPicker() {
      // revoke this opration
      this.isTabPickerShow = false
      this.isLoading = true
      this.isDataError = false
      this.currentColumnLock = false
      this.refreshTabPicker = Math.random()
      this.$nextTick(() => {
        this.$_initTabPicker()
      })
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
      const isSelectPart = selectedItem.some(option => {
        return !option
      })
      if (!isSelectPart) {
        this.lastSelectIndex = selectedItem.map(option => {
          return option.item.eq
        })
      }
      this.$emit('confirm', selectedItem)
    },
    $_onCancel() {
      this.$emit('cancel')
      this.$_refreshTabPicker()
    },
    $_onMaskClose() {
      this.$_refreshTabPicker()
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
        if (value && value.children && Array.isArray(value.children)) {
          this.$_renderNextTabContent(value.children)()
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
        typeof currentColumn.asyncFunc === 'function' && currentColumn.asyncFunc(value, this.$_renderNextTabContent())
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
              eq: item.clickedKey,
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
      font-size font-body-normal
      color color-text-minor
  .md-popup-box
    background-color color-bg-base
</style>
