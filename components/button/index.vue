<template>
  <button
    type="button"
    class="md-button"
    :class="[type, size, icon ? 'with-icon' : '']"
    :disabled="disabled"
    v-on="$listeners"
  >
    <div class="md-button-inner">
      <md-icon v-if="icon" :name="icon"></md-icon>
      <slot></slot>
    </div>
  </button>
</template>

<script>import Icon from '../icon'
export default {
  name: 'md-button',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'large',
    },
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.md-button
  display block
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  position relative
  text-align center
  border-radius button-primary-radius
  background none
  border none
  box-shadow none
  outline none
  appearance none
  box-sizing border-box
  overflow visible
  &:disabled
    &:active::before
      display none
  &::before
    absolute-pos()
    display none
    content ''
    position absolute
    box-sizing border-box
    pointer-events none
  &:active::before
    display block
  .md-button-inner
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%
    overflow hidden
    text-overflow ellipsis
    word-break break-word
    white-space nowrap

  // type
  &.primary
    background-color button-primary-fill
    color color-text-base-inverse
    &:active::before
      background-color button-primary-fill-tap
    &:disabled
      background-color button-primary-fill-disabled
    &.large, &.small
      width button-primary-width
      height button-primary-height
      line-height button-primary-height
      font-size button-primary-font-size
      font-weight button-primary-font-weight

  &.ghost
    color button-ghost-color
    hairline(all, button-ghost-color, button-ghost-radius)
    &:active::before
      background-color button-ghost-fill-tap
  &.ghost-primary
    color button-ghost-primary-color
    hairline(all, button-ghost-primary-color, button-ghost-radius)
    &:active::before
      background-color button-ghost-primary-fill-tap
  &.ghost, &.ghost-primary
    &:disabled
      opacity button-disabled-opacity
    &.large
      width button-ghost-width
      height button-ghost-height
      line-height button-ghost-height
      font-size button-ghost-font-size
    &.small
      width button-ghost-width-sm
      height button-ghost-height-sm
      line-height button-ghost-height-sm
      font-size button-ghost-font-size

  &.link
    background-color button-link-fill
    color button-link-color
    .md-button-inner
      hairline(top, button-link-border)
      hairline(bottom, button-link-border)
    &:active::before
      background-color button-link-fill-tap
    &:disabled
      opacity button-disabled-opacity
    &.large, &.small
      width button-link-width
      height button-link-height
      font-size font-heading-normal
  &.with-icon
    .md-icon
      display flex
      align-items center
      justify-content center
      margin-right button-icon-gap

</style>
