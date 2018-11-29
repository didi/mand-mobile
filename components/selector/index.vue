<template>
  <div
    class="md-selector"
    :class="{
      'is-normal': !isCheck,
      'is-check': isCheck
    }"
  >
    <md-popup
      v-model="isSelectorShow"
      position="bottom"
      :mask-closable="maskClosable"
      @show="$_onSelectorShow"
      @hide="$_onSelectorHide"
      @maskClick="$_onSelectorCancel"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        :ok-text="okText"
        :cancel-text="cancelText"
        @confirm="$_onSelectorConfirm"
        @cancel="$_onSelectorCancel"
      >
        <md-icon
          v-if="!isCheck && !isNeedConfirm && !cancelText"
          name="close"
          size="lg"
          slot="cancel"
        ></md-icon>
      </md-popup-title-bar>
      <md-scroll-view
        ref="scroll"
        class="md-selector-container"
        :scrolling-x="false"
        :style="{maxHeight: `${maxHeight}px`}"
      >
        <md-radio-list
          class="md-selector-list"
          ref="radio"
          :key="radioKey"
          :value="defaultValue"
          :options="data"
          :is-slot-scope="hasSlot"
          icon="right"
          icon-inverse=""
          icon-position="right"
          icon-size="md"
          @change="$_onSelectorChoose"
        >
          <template slot-scope="{ option }">
            <slot :option="option"></slot>
          </template>
        </md-radio-list>
      </md-scroll-view>
    </md-popup>
  </div>
</template>

<script>import Icon from '../icon'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import RadioList from '../radio-list'
import ScrollView from '../scroll-view'

export default {
  name: 'md-selector',

  components: {
    [Icon.name]: Icon,
    [RadioList.name]: RadioList,
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [ScrollView.name]: ScrollView,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    defaultValue: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    describe: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default() {
        return this.okText ? '取消' : ''
      },
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: Number,
      default: 400,
    },
  },

  data() {
    return {
      isSelectorShow: this.value,
      radioKey: Date.now(),
      activeIndex: -1,
      tmpActiveIndex: -1,
    }
  },

  computed: {
    isNeedConfirm() {
      return this.okText !== ''
    },
    hasSlot() {
      return !!this.$scopedSlots.default
    },
  },

  watch: {
    value(val) {
      this.isSelectorShow = val
    },
    isSelectorShow(val) {
      this.$emit('input', val)
    },
  },

  methods: {
    // MARK: private methods
    $_setScroller() {
      this.$refs.scroll.reflowScroller()
    },
    // MARK: events handler
    $_onSelectorConfirm() {
      if (this.tmpActiveIndex > -1) {
        this.activeIndex = this.tmpActiveIndex
        this.isSelectorShow = false
        this.$emit('confirm', this.data[this.activeIndex])
      }
    },
    $_onSelectorCancel() {
      this.isSelectorShow = false
      this.tmpActiveIndex = this.activeIndex

      if (this.tmpActiveIndex !== -1) {
        this.$refs.radio.selectByIndex(this.tmpActiveIndex)
      } else {
        // reset radio
        this.radioKey = Date.now()
      }

      this.$emit('cancel')
    },
    $_onSelectorChoose(item, index) {
      this.tmpActiveIndex = index
      if (!this.isNeedConfirm) {
        this.activeIndex = index
        this.isSelectorShow = false
      }

      this.$emit('choose', item)
    },
    $_onSelectorShow() {
      /* istanbul ignore next  */
      this.$_setScroller()
      this.$emit('show')
    },
    $_onSelectorHide() {
      /* istanbul ignore next  */
      this.$emit('hide')
    },
  },
}
</script>

<style lang="stylus">
.md-selector
  .md-popup
    z-index selector-zindex
  .md-popup-title-bar .md-popup-cancel
    .md-icon
      align-self flex-start
      margin-left h-gap-lg

.md-selector-container
  padding-left h-gap-sl
  padding-right h-gap-sl
  padding-bottom constant(safe-area-inset-bottom)
  overflow hidden

.md-selector
  &.is-normal
    .md-radio-item
      text-align center
      .md-cell-item-left,
      .md-cell-item-right
        display none
</style>
