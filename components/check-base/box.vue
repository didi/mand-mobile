<template>
  <div
    class="md-check-base-box"
    :class="[
      iconPosition,
      {
      'is-disabled': disabled,
      'is-checked': isChecked,
      }
    ]"
  >
    <slot></slot>
    <md-tag
      v-if="isChecked"
      size="tiny"
      shape="quarter"
      type="fill"
    >
      <md-icon name="right" size="xs"></md-icon>
    </md-tag>
  </div>
</template>

<script>import Tag from '../tag'
import Icon from '../icon'
export default {
  name: 'md-check-base-box',

  components: {
    [Tag.name]: Tag,
    [Icon.name]: Icon,
  },

  props: {
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      type: String,
      default: 'rt',
    },
  },
}
</script>

<style lang="stylus">
.md-check-base-box
  position relative
  display inline-block
  text-align center
  color checkbox-color
  font-size checkbox-font-size
  padding v-gap-sm h-gap-md
  border 1px solid checkbox-border-color
  border-radius checkbox-border-radius
  box-sizing border-box
  background-color checkbox-background-color
  overflow hidden
  &.is-checked
    color checkbox-active-color
    border-color checkbox-active-border-color
    background-color checkbox-active-background-color
    font-weight bold
    &.is-disabled
      color checkbox-active-color
      border-color checkbox-active-border-color
      opacity 0.6
  &.is-disabled
    color checkbox-disabled-color
    border-color checkbox-disabled-color
    background-color checkbox-disabled-background-color

  .md-tag
    position absolute
    top 0
    right 0
    .quarter-bg
      background-color checkbox-active-color

  &.lt
    .md-tag
      left 0
      .quarter-content
        left -10%
      .quarter-bg
        left -100%
</style>
