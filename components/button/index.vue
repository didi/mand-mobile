<template>
  <button
    :type="nativeType"
    class="md-button"
    :class="[
      type,
      inactive ? 'inactive' : 'active',
      inline ? 'inline' : 'block',
      round ? 'round' : '',
      plain ? 'plain' : '',
      size ? size : ''
    ]"
    :disabled="inactive || type === 'disabled'"
    v-on="$listeners"
  >
    <div class="md-button-inner">
      <template v-if="icon">
        <md-icon :name="icon" :svg="iconSvg"></md-icon>
      </template>
      <div class="md-button-content">
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script>
import Icon from '../icon'
export default {
  name: 'md-button',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    type: {
      type: String,
      default: 'default', // default, primary, warning, disabled, link
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '', // large, small
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="stylus">
@require "./../_style/mixin/util.styl"
@require "./../_style/mixin/theme.components.styl"
@require "./../_style/mixin/theme.basic.styl"
@require "./../../theme.custom.styl"
@require "./../_style/global.styl"
.md-button
  position relative
  display block
  height button-height
  line-height button-height
  font-size button-font-size
  font-weight button-font-weight
  font-family font-family-normal
  text-align center
  border none
  border-radius button-radius
  box-sizing border-box
  outline none
  transition all .3s
  -webkit-appearance none
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  overflow visible

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

.md-button-content
  display flex
  align-items center
  padding 0 6px
  .md-icon
    padding 0

.md-button
  position relative
  .md-icon
    display flex
    align-items center
    justify-content center
    padding 0 6px
  // type
  &.default
    background button-default-fill
    color button-default-color
    hairline(all, color-border-element, button-radius, 3px)
    &.active:active
      background button-default-active-fill
  &.primary
    background button-primary-fill
    color button-primary-color
    hairline(all, button-primary-fill, button-radius, 3px)
    &.active:active
      background button-primary-active-fill
  &.primary-flat
    background color-primary
    color button-primary-color
    hairline(all, button-primary-fill, button-radius, 3px)
    &.active:active
      background button-primary-active-fill
    &:disabled
      background #c9c9c9
  &.warning
    background button-warning-fill
    color button-warning-color
    hairline(all, button-warning-fill, button-radius, 3px)
    &.active:active
      background button-warning-active-fill
  &.disabled
    background button-disabled-fill
    color button-disabled-color
    hairline(all, button-disabled-fill, button-radius, 3px)

  &.plain
    background transparent

    &.default
      color button-default-plain-color
      hairline(all, color-border-element, button-radius, 3px)
      &.active:active
        background button-default-plain-active-fill
    &.primary
      color button-primary-plain-color
      hairline(all, button-primary-fill, button-radius, 3px)
      &.active:active
        background button-primary-plain-active-fill
    &.warning
      color button-warning-plain-color
      hairline(all, button-warning-fill, button-radius, 3px)
      &.active:active
        background button-warning-plain-active-fill
    &.disabled
      color button-disabled-plain-color
      hairline(all, color-border-element, button-radius, 3px)

  &.round
    border-radius button-height
    &:after
      border-radius button-height !important

  &.inline
    display inline-block
    padding 0 h-gap-md
  &.block
    width 100%

  &.small
    height button-small-height
    line-height button-small-height
    font-size button-small-font-size
    &.round
      border-radius button-small-height
      &:after
        border-radius button-small-height

  &.large
    height button-large-height
    line-height button-large-height
    font-size button-large-font-size
    &.round
      border-radius button-large-height
      &:after
        border-radius button-large-height

  &.link
    display inline
    width auto
    height auto
    line-height 1
    font-size button-small-font-size
    font-weight font-weight-normal
    color color-primary
    background transparent
    &.inactive
      color color-text-disabled
      opacity 1

  &.inactive
    opacity opacity-disabled
    &.disabled
      opacity 1
</style>
