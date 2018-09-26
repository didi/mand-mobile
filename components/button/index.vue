<template>
  <div
    class="md-button"
    :class="[
      type,
      inactive ? 'inactive' : 'active',
      inline ? 'inline' : '',
      round ? 'round' : '',
      plain ? 'plain' : '',
      size === 'small' ? 'small' : ''
    ]"
    @click="$_onBtnClick"
  >
    <div class="md-button-inner">
      <template v-if="icon">
        <md-icon :name="icon"></md-icon>
      </template>
      <p class="md-button-content">
        <slot></slot>
      </p>
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
      default: 'default', // default, primary, warning, disabled, link
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'large', // large, small
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

  methods: {
    $_onBtnClick(event) {
      if (this.inactive || this.type === 'disabled') {
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
  position relative
  display block
  height button-height
  line-height button-height
  font-size button-font-size
  font-weight button-font-weight
  text-align center
  border-radius button-radius
  box-sizing border-box
  transition all .3s
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
    background-color button-default-fill
    color button-default-color
    hairline(all, color-border-element, button-radius)
    &.active:active
      background-color button-default-active-fill
  &.primary
    background-color button-primary-fill
    color button-primary-color
    hairline(all, button-primary-fill, button-radius)
    &.active:active
      background-color button-primary-active-fill
  &.warning
    background-color button-warning-fill
    color button-warning-color
    hairline(all, button-warning-fill, button-radius)
    &.active:active
      background-color button-warning-active-fill
  &.disabled
    background-color button-disabled-fill
    color button-disabled-color
    hairline(all, button-disabled-fill, button-radius)

  &.plain
    background transparent

    &.default
      color button-default-color
      hairline(all, color-border-element, button-radius)
      &.active:active
        background-color button-default-plain-active-fill
    &.primary
      color button-primary-fill
      hairline(all, button-primary-fill, button-radius)
      &.active:active
        background-color button-primary-plain-active-fill
    &.warning
      color button-warning-fill
      hairline(all, button-warning-fill, button-radius)
      &.active:active
        background-color button-warning-plain-active-fill
    &.disabled
      color button-disabled-fill
      hairline(all, button-disabled-fill, button-radius)

  &.round
    border-radius button-height
    &:after
      border-radius button-height

  &.inline
    display inline-block
    padding 0 h-gap-md

  &.small
    height button-small-height
    font-size button-small-font-size
    &.round
      border-radius button-small-height
      &:after
        border-radius button-small-height

  &.link
    display inline
    width auto
    height auto
    line-height 1
    font-size button-small-font-size
    font-weight font-weight-normal
    color button-primary-fill
    &.inactive
      color color-text-disabled
      opacity 1

  &.inactive
    opacity opacity-disabled
    &.disabled
      opacity 1
</style>
