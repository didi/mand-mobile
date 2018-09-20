<template>
  <div
    class="md-radio-list"
    :class="{ 'is-center': alignCenter }"
  >
    <md-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="md-radio-item"
      :class="{
        'is-selected': selectedValue === item.value && !inputSelected,
      }"
      :title="$scopedSlots.option ? '' : (item.text || item.label)"
      :brief="$scopedSlots.option ? '' : item.brief"
      :disabled="item.disabled"
      @click="select(item.value)"
    >
      <slot name="option" :option="item"></slot>
      <md-radio
        v-if="!alignCenter"
        :name="item.value"
        v-model="selectedValue"
        :disabled="item.disabled"
        :size="iconSize"
        :icon="icon"
        :icon-inverse="iconInverse"
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

export default {
  name: 'md-radio-list',

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
        return []
      },
    },
    value: {
      type: String,
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
    icon: {
      type: String,
      default: 'circle-right',
    },
    iconInverse: {
      type: String,
      default: 'circle',
    },
    iconSize: {
      type: String,
      default: 'lg',
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
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
    // MARK: public methods
    select(value) {
      this.selectedValue = value
      this.inputSelected = false
    },
  },
}
</script>

<style lang="stylus">
.md-radio-item
  .md-radio
    margin-top 0
    margin-bottom 0
</style>

