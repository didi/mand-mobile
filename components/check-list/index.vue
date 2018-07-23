<template>
  <md-field :title="title" class="md-check-list">
    <md-check-group
      ref="checkGroup"
      :options="options"
      :value="value"
      :disabled="disabled"
      :max="max"
      @input="$_onInput"
    >
      <md-field-item
        class="md-check-list-item"
        slot-scope="{ option }"
        :key="option.value"
        :class="{
          'is-selected': option.isSelected
        }"
        :disabled="option.disabled || disabled"
        @click="select(option.value)"
        customized
      >
        <slot name="content" :option="option" :select="select">
          {{option.label}}
        </slot>
        <md-icon
          v-show="option.isSelected || iconInverse"
          :name="!option.isSelected && iconInverse ? iconInverse : icon"
          :slot="iconPosition"
          :size="iconSize"
        />
      </md-field-item>
    </md-check-group>
  </md-field>
</template>

<script>import CheckGroup from '../check-group'
import Field from '../field'
import FieldItem from '../field-item'
import Icon from '../icon'

export default {
  name: 'md-check-list',

  components: {
    [CheckGroup.name]: CheckGroup,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
  },

  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    max: {
      type: [String, Number],
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'right',
    },
    iconPosition: {
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
  },

  methods: {
    // MARK: events handler
    $_onInput(values) {
      this.$emit('input', values)
    },
    // MARK: public methods
    select(value) {
      this.$refs.checkGroup.select(value)
    },
  },
}
</script>

<style lang="stylus">
.md-check-list
  .md-check-list-item
    &.is-selected
      color checklist-tap-color
      .md-icon
        fill checklist-tap-color
    .md-field-item-label
      display none
    .md-field-item-content.left
      margin-left 0
</style>
