<template>
  <fieldset class="md-field" :class="{'is-plain': plain, 'is-disabled': disabled}">
    <header class="md-field-header" v-if="title || brief || $slots.header || $slots.action">
      <div class="md-field-heading">
        <legend v-if="title" class="md-field-title" v-text="title"></legend>
        <p v-if="brief" class="md-field-brief" v-text="brief"></p>
        <slot name="header"></slot>
      </div>
      <div class="md-field-action">
        <slot name="action"></slot>
      </div>
    </header>
    <div class="md-field-content">
      <slot></slot>
    </div>
    <footer class="md-field-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </fieldset>
</template>

<script>export default {
  name: 'md-field',

  props: {
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },

  provide() {
    return {
      rootField: this,
    }
  },
}
</script>

<style lang="stylus">
.md-field
  padding field-padding-v field-padding-h
  border none
  background-color field-bg-color
  &.is-plain
    padding 0
    background-color transparent

.md-field-header
  position relative
  display flex
  align-items center
  justify-content space-between
  margin-bottom field-header-gap

.md-field-heading
  flex 1 1 0%

.md-field-action
  flex-shrink 0
  display inline-flex
  align-items center
  align-self flex-start
  justify-content flex-end
  margin-left h-gap-sm
  color field-action-color
  font-size field-action-font-size

.md-field-title
  color field-title-color
  font-size field-title-font-size
  font-weight field-title-font-weight
  line-height 1

.md-field-brief
  margin-top v-gap-xs
  color field-brief-color
  font-size field-brief-font-size
  line-height 1.4

.md-field-footer
  margin-top field-footer-gap

.md-field
  &:disabled,
  &.is-disabled
    .md-field-title,
    .md-field-brief,
    .md-field-action,
    .md-field-content,
    .md-field-footer
      color color-text-disabled
</style>
