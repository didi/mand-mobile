<template>
  <md-field class="md-radio" :class="{'is-across': isAcrossBorder, 'is-center': isAlignCenter}">
    <md-field-item
      class="md-radio-item"
      v-for="(item, index) in options"
      :class="{
        'is-selected': $_isSelectedIndex(index) || $_isSelectedValue(item.value || item.text || item.label, index)
      }"
      :key="index"
      :disabled="$_isInvalidIndex(item, index)"
      @click="$_onItemClick(item, index)"
    >
      <div class="md-radio-item-content">
        <slot :option="item">
          <p class="md-field-item-title md-radio-item-title" v-text="item.text || item.label"></p>
          <p class="md-field-item-describe md-radio-item-describe" v-if="item.describe" v-text="item.describe"></p>
        </slot>
      </div>

      <!-- radio-option-check-icon -->
      <template :slot="iconPosition === 'left' ? 'start': 'after'">
        <md-icon
          v-if="icon && ($_isSelectedIndex(index) || $_isSelectedValue(item.value || item.text || item.label, index))"
          :name="icon"
          :size="iconSize"
        ></md-icon>
        <md-icon
          v-else-if="iconInverse"
          :name="iconInverse"
          :size="iconSize"
        ></md-icon>
      </template>
    </md-field-item>
    <md-input-item
      v-if="hasInputOption"
      ref="inputItem"
      class="md-radio-item"
      :class="{
        'is-selected': $_isSelectedIndex(options.length),
      }"
      :title="inputOptionLabel"
      :placeholder="inputOptionPlaceholder"
      v-model="inputOptionValue"
      @focus="$_onItemFocus(options.length)"
    />
  </md-field>
</template>

<script>import Field from '../field'
import FieldItem from '../field-item'
import InputItem from '../input-item'
import Icon from '../icon'
import {inArray, compareObjects, warn} from '../_util'
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
    value: {
      type: String,
      default: '',
    },
    hasInputOption: {
      type: Boolean,
      default: false,
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
    isAlignCenter: {
      type: Boolean,
      default: false,
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
.md-radio.md-field
  &.is-across
    padding-left 0
    padding-right 0
    .md-radio-item
      padding-left field-padding-h
      padding-right field-padding-h
  &.is-center
    .md-field-item-start,
    .md-field-item-after
      display none
    .md-radio-item-content
      text-align center

.md-radio-item
  &.is-selected
    .md-radio-item-content,
    .md-radio-item-title,
    .md-radio-item-describe,
    .md-input-item-title
      color radio-color
  .md-field-item-start,
  .md-field-item-after
    .md-icon
      fill radio-color

.md-radio-item-content
  font-weight font-weight-normal
</style>

