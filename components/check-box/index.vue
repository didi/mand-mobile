<template>
  <md-check-group
    ref="checkGroup"
    class="md-check-box"
    :class="{
      [`is-${cols}col`]: cols >= 1
    }"
    :options="options"
    :value="value"
    :disabled="disabled"
    :max="max"
    @input="$_onInput"
  >
    <div
      class="md-check-box-col"
      slot-scope="{ option }"
      :key="option.value"
    >
      <div
        class="md-check-box-item"
        :class="{
          'is-selected': option.isSelected,
          'is-disabled': option.disabled || disabled
        }"
        @click="select(option.value)"
      >
        <slot name="content" :option="option" :select="select">
          {{option.label}}
        </slot>
      </div>
    </div>
  </md-check-group>
</template>

<script>import CheckGroup from '../check-group'

export default {
  name: 'md-check-box',

  components: {
    [CheckGroup.name]: CheckGroup,
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
    cols: {
      type: Number,
      default: 0,
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
.md-check-box
  display flex
  flex-wrap wrap
  margin-left (0 - checkbox-space / 2)
  margin-right (0 - checkbox-space / 2)
  &.is-2col .md-check-box-col
    flex 0 0 50%
    width 50%
  &.is-3col .md-check-box-col
    flex 0 0 33.33333333%
    width 33.33333333%
  &.is-4col .md-check-box-col
    flex 0 0 25%
    width 25%
  &.is-5col .md-check-box-col
    flex 0 0 20%
    width 20%

.md-check-box-col
  flex 0 0 auto
  padding (checkbox-space / 2)
  box-sizing border-box

.md-check-box-item
  padding v-gap-sm
  text-align center
  min-width checkbox-min-width
  color checkbox-color
  font-size checkbox-font-size
  border 1px solid checkbox-border-color
  border-radius checkbox-border-radius
  box-sizing border-box
  &.is-selected
    color checkbox-active-color
    border-color checkbox-active-border-color
    background-color checkbox-active-bg
  &.is-disabled
    color checkbox-disabled-color
    border-color checkbox-disabled-color
    background-color none
</style>
