<template>
  <div
    class="md-field-item"
    :class="[
      arrow ? 'has-arrow' : '' ,
      disabled ? 'disabled' : '',
    ]"
    :name="name"
    @click="$_onItemClick($event, name)">
    <div class="md-field-item-inner">
      <!-- Left Control -->
      <div class="md-field-item-extra" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div
        class="md-field-item-label"
        :class="[
          solid ? 'solid' : ''
        ]">
        <div class="md-field-item-title" v-html="title"></div>
        <div class="md-field-item-brief"
          v-if="brief"
          v-html="brief"
        ></div>
      </div>
      <!-- Content -->
      <div
        v-if="customized"
        class="md-field-item-content"
        :class="[align]">
        <slot></slot>
      </div>
      <div
        v-else
        class="md-field-item-content"
        :class="[align]">
        {{value}}
      </div>
      <!-- Right Control -->
      <div
        class="md-field-right"
        v-if="$slots.right"
      >
        <slot name="right"></slot>
      </div>
      <md-icon
        v-else-if="arrow"
        class="md-field-arrow"
        :name="arrow"
        size="lg">
      </md-icon>
    </div>
  </div>
</template>

<script>import Icon from '../icon'
import {isEmptyObject, randomId} from '../_util'

export default {
  name: 'md-field-item',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    name: {
      type: Number | String,
      default() {
        return randomId('field-item')
      },
    },
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: String,
      default: '',
    },
    customized: {
      type: Boolean,
      default() {
        return !isEmptyObject(this.$slots)
      },
    },
    align: {
      // left, right, center
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right', 'center'].indexOf(value) > -1
      },
    },
    solid: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    // MARK: events handler
    $_onItemClick(event, name) {
      if (this.disabled) {
        return
      }
      this.$emit('click', name)
    },
  },
}
</script>

<style lang="stylus">
.md-field-item
  -webkit-tap-highlight-color transparent
  position relative
  box-sizing border-box
  width 100%
  background-color field-item-bg-color
  color field-item-color
  &.disabled
    .md-field-item-inner
      opacity field-item-color-disabled
  &.has-arrow
    .md-field-item-content
      padding-right 28px
    &::after
      absolute-pos()
      display none
      content ''
      position absolute
      box-sizing border-box
      background-color field-item-bg-tap-color
    &:active::after
      display block
  .md-field-item-inner
      display flex
      align-items center
      padding field-item-padding-v 0
  .md-field-item-extra
    display flex
    margin-right field-item-padding-v
  .md-field-item-label
    &.solid
      width input-item-title-width
    .md-field-item-title
      font-size field-title-font-size
      line-height 54px
    .md-field-item-brief
      font-size field-item-brief-font-size
      color field-item-brief-color
  .md-field-item-content
    display flex
    flex-grow 1
    font-size field-item-font-size
    &.left
      margin-left 22px
    &.right
      flex-direction row-reverse
    &.center
      justify-content center
  .md-field-arrow
    position absolute
    right field-padding-h
    top 50%
    transform translate(42px, -50%)
    color field-item-icon-color
  .md-field-right
    display flex
    align-items center
    justify-content center
</style>
