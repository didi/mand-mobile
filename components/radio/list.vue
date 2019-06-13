<template>
  <div
    class="md-radio-list"
    :class="{ 'is-align-center': alignCenter }"
  >
    <md-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="md-radio-item"
      :class="{
        'is-selected': selectedValue === item.value && !inputSelected,
      }"
      :title="hasSlot ? '' : (item.text || item.label)"
      :brief="hasSlot ? '' : item.brief"
      :disabled="item.disabled"
      :noBorder="index === options.length - 1"
      @click="$_select(item, index)"
    >
      <template v-if="hasSlot">
        <slot :option="item" :index="index" :selected="currentValue === item.value"></slot>
      </template>
      <md-radio
        v-if="!alignCenter && !inputSelected && !withoutIcon"
        :name="item.value"
        v-model="selectedValue"
        :disabled="item.disabled"
        :size="iconSize"
        :icon="icon"
        :icon-inverse="iconInverse"
        :icon-disabled="iconDisabled"
        :icon-svg="iconSvg"
        :slot="iconPosition === 'right' ? 'right' : 'left'"
      />
    </md-cell-item>
    <md-input-item
      v-if="hasInput"
      ref="inputItem"
      class="md-radio-item"
      :class="{
        'is-selected': inputSelected,
      }"
      :title="inputLabel"
      :placeholder="inputPlaceholder"
      v-model="inputValue"
      @focus="inputSelected = true"
    />
  </div>
</template>

<script>import Radio from './index'
import Field from '../field'
import CellItem from '../cell-item'
import InputItem from '../input-item'
import radioMixin from './mixins'

export default {
  name: 'md-radio-list',

  mixins: [radioMixin],

  components: {
    [Radio.name]: Radio,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [InputItem.name]: InputItem,
  },

  props: {
    options: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    value: {
      default: '',
    },
    hasInput: {
      type: Boolean,
      default: false,
    },
    inputLabel: {
      type: String,
      default: '',
    },
    inputPlaceholder: {
      type: String,
      default: '',
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    isSlotScope: {
      type: Boolean,
      default: undefined,
    },
    // Mixin Props
    // icon: {
    //   type: String,
    //   default: 'checked',
    // },
    // iconInverse: {
    //   type: String,
    //   default: 'check',
    // },
    // iconDisabled: {
    //   type: String,
    //   default: 'check-disabled',
    // },
    // iconSvg: {
    //   type: Boolean,
    //   default: false,
    // },
    // iconSize: {
    //   type: String,
    //   default: 'md',
    // },
    // iconPosition: {
    //   type: String,
    //   default: 'left',
    // },
  },

  data() {
    return {
      selectedValue: this.value,
      inputSelected: false,
      inputValue: '',
    }
  },

  computed: {
    currentValue() {
      if (this.inputSelected) {
        return this.inputValue
      } else {
        return this.selectedValue
      }
    },
    hasSlot() {
      return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default
    },
    withoutIcon() {
      return this.isSlotScope && !this.icon
    },
  },

  watch: {
    value(val) {
      if (val !== this.selectedValue) {
        this.selectedValue = val
      }
    },
    currentValue(val) {
      this.$emit('input', val)
    },
  },

  methods: {
    // MARK: private methods
    $_select(option, index) {
      this.selectedValue = option.value
      this.inputSelected = false
      this.inputValue && (this.inputValue = '')
      this.$emit('change', option, index)
    },
    // MARK: public methods
    select(value) {
      this.selectedValue = value
      this.inputSelected = false
    },
    selectByIndex(index) {
      const item = this.options[index]
      if (item) {
        this.select(item.value)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-radio-item
  .md-radio
    margin-top 0
    margin-bottom 0

.md-radio-list
  .md-cell-item-body.multilines .md-cell-item-title
    font-weight font-weight-medium
  &.is-align-center
    .md-cell-item-content
      text-align center
    .md-cell-left,
    .md-cell-right
      display none
</style>

