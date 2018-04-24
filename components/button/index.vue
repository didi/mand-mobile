<template>
  <div
    class="md-button"
    :class="[type, size, disabled ? 'disabled' : '', icon ? 'with-icon' : '']"
    @click="$_onBtnClick"
  >
    <div class="md-button-inner">
      <template v-if="icon">
        <md-icon :name="icon"></md-icon>
      </template>
      <slot></slot>
    </div>
  </div>
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

  methods: {
    $_onBtnClick(event) {
      if (this.disabled) {
        event.stopImmediatePropagation()
      } else {
        this.$emit('click', event)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-button
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  position relative
  text-align center
  border-radius radius-normal
  box-sizing border-box
  overflow visible
  &.disabled
    &:active::before
      display none
  &::before
    absolute-pos()
    display none
    content ''
    position absolute
    box-sizing border-box
  &:active::before
    display block
  .md-button-inner
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
    &.disabled
      background-color button-primary-fill-disabled
    &.large, &.small
      width button-primary-width
      height button-primary-height
      line-height button-primary-height
      font-size button-primary-font-size
      font-weight font-weight-medium

  &.ghost
    color button-ghost-color
    hairline(all, button-ghost-color, true)
    &:active::before
      background-color button-ghost-fill-tap
  &.ghost-primary
    color button-ghost-primary-color
    hairline(all, button-ghost-primary-color, true)
    &:active::before
      background-color button-ghost-primary-fill-tap
  &.ghost, &.ghost-primary
    &.disabled
      opacity opacity-disabled
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
      hairline(top, color-border-base)
      hairline(bottom, color-border-base)
      display flex
      align-items center
      justify-content center
    &:active::before
      background-color button-link-fill-tap
    &.disabled
      opacity opacity-disabled
    &.large, &.small
      width button-link-width
      height button-link-height
      font-size font-heading-normal
    &.with-icon
      .md-icon
        display flex
        align-items center
        justify-content center
        margin-right h-gap-sm

</style>
