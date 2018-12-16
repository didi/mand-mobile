<template>
  <div class="md-radio" :class="{across: isAcrossBorder}">
    <md-field>
      <template v-for="(item, index) in options">
        <md-field-item
          class="md-radio-item"
          :class="{
            'selected': $_isSelectedIndex(index) || $_isSelectedValue(item.value || item.text || item.label, index),
            'icon-left': iconPosition === 'left'
          }"
          title=""
          :key="index"
          :disabled="$_isInvalidIndex(item, index)"
          @click="$_onItemClick(item, index)"
          customized
        >
          <!-- radio-option-content -->
          <template v-if="hasSlot">
            <!-- use slot -->
            <div class="md-radio-content">
              <slot :option="item"></slot>
            </div>
          </template>
          <template v-else>
            <!-- use data or optionRender -->
            <div class="md-radio-content" v-html="$_getItemText(item)"></div>
          </template>

          <!-- radio-option-check-icon -->
          <template v-if="$_isSelectedIndex(index) || $_isSelectedValue(item.value || item.text || item.label, index)">
            <md-icon
              v-if="icon"
              :name="icon"
              :size="iconSize"
            ></md-icon>
          </template>
          <template v-else>
            <md-icon
              v-if="iconInverse"
              :name="iconInverse"
              :size="iconSize"
            ></md-icon>
          </template>
        </md-field-item>
      </template>
      <md-input-item
        v-if="hasInputOption"
        ref="inputItem"
        :class="{
          'selected': $_isSelectedIndex(options.length),
        }"
        :title="inputOptionLabel"
        :placeholder="inputOptionPlaceholder"
        v-model="inputOptionValue"
        @focus="$_onItemFocus(options.length)"
      >
      </md-input-item>
    </md-field>
  </div>
</template>

<script>import Field from '../field'
import FieldItem from '../field-item'
import InputItem from '../input-item'
import Icon from '../icon'
import {inArray, compareObjects, noop, warn} from '../_util'
export default {
  name: 'md-radio',

  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
  },

  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    defaultIndex: {
      type: Number,
      default: -1,
    },
    defaultValue: {
      type: String,
      default: '',
    },
    invalidIndex: {
      type: [Number, Array],
      default() {
        return []
      },
    },
    hasInputOption: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    inputOptionLabel: {
      type: String,
      default: '',
    },
    inputOptionPlaceholder: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'right',
    },
    iconInverse: {
      type: String,
      default: '',
    },
    iconSize: {
      type: String,
      default: 'sm',
    },
    iconPosition: {
      type: String,
      default: 'right',
    },
    optionRender: {
      type: Function,
      default: noop,
    },
    isSlotScope: {
      type: Boolean,
      default: undefined,
    },
    isAcrossBorder: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectedIndex: this.defaultIndex,
      inputOptionValue: '',
    }
  },

  computed: {
    hasSlot() {
      return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default
    },
  },

  watch: {
    options: {
      handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.$_initSelected()
        }
      },
      deep: true,
    },
    inputOptionValue(val) {
      this.$emit('input', val)
    },
  },

  created() {
    this.$_initSelected()
  },

  methods: {
    // MARK: private methods
    $_initSelected() {
      const defaultIndex = this.defaultIndex
      const invalidIndex = this.invalidIndex
      const item = this.options[defaultIndex]

      this.selectedIndex = defaultIndex

      /* istanbul ignore next */
      if (defaultIndex === -1) {
        return
      } else if (this.value !== '') {
        return
      }

      /* istanbul ignore else */
      if (item && !item.disabled && !inArray(invalidIndex, defaultIndex)) {
        this.selectedIndex = this.defaultIndex
      } else {
        warn('radio option represented by the default-index is invalid')
      }
    },
    $_isInvalidIndex(item, index) {
      return inArray(this.invalidIndex, index) || item.disabled
    },
    $_isSelectedIndex(index) {
      return index === this.selectedIndex
    },
    $_isSelectedValue(value, index) {
      const invalidIndex = this.invalidIndex
      if (value === this.value) {
        if (!inArray(invalidIndex, index)) {
          this.selectedIndex = index
          return true
        } else {
          this.$emit('input', '')
          warn('radio option represented by the initial value is invalid')
          return false
        }
      } else {
        return false
      }
    },
    $_getItemText(item) {
      return this.optionRender(item) || item.text || item.label
    },

    // MARK: events handler
    $_onItemClick(item, index) {
      this.selectedIndex = index
      this.$emit('input', item.value || item.text || item.label)
      this.$emit('change', item, index)
    },
    $_onItemFocus(index) {
      this.selectedIndex = index
      this.$emit('input', this.inputOptionValue)
      this.$emit(
        'change',
        {
          text: this.inputOptionValue,
        },
        index,
      )
    },

    // MARK: public methods
    getSelectedValue() {
      let item
      if (this.hasInputOption && this.selectedIndex === this.options.length) {
        item = this.inputOptionValue
      } else {
        item = this.options[this.selectedIndex]
      }
      return item
    },
    getSelectedIndex() {
      return this.selectedIndex
    },
    selectByIndex(index) {
      if (index > this.options.length || inArray(this.invalidIndex, index)) {
        return
      }

      if (index === this.options.length && this.hasInputOption) {
        this.selectedIndex = index
        this.$refs['inputItem'].focus()
      } else {
        this.$_onItemClick(this.options[index], index)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-radio
  .md-field
    padding 0 32px
    .md-field-item.md-radio-item
      position relative
      padding 0
      .md-field-item-inner
        padding 32px 0
      .md-icon
        position absolute
        right 0
        top 50%
        transform translateY(-50%)
        fill radio-color
      &.selected
        color radio-color
      &.icon-left
        .md-icon
          left 0
          right auto !important
        .md-field-item-content
          padding-left 40px
      .md-field-item-content.left
        margin-left 0
    .md-input-item
      padding 0 !important
      &.selected
        .md-input-item-title
          color radio-color
  &.across
    .md-field
      padding 0
      .md-field-item.md-radio-item
        .md-field-item-inner
          padding 32px
          .md-icon
            right 32px
        &.icon-left
          .md-icon
            left 32px
</style>

