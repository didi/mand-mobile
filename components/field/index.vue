<template>
  <div class="md-field">
    <div
      class="md-field-title"
      v-if="title !== ''">{{title}}</div>
    <div class="md-field-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>export default {
  name: 'md-field',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="stylus">
.md-field
  background-color field-item-bg-color
  padding-left field-padding-h
  padding-right field-padding-h
  .md-field-title
    display flex
    font-size field-title-font-size
    font-weight field-title-weight
    color field-title-color
    line-height 45px
    padding field-padding-v 0 field-title-margin
  .md-field-content
    display flex
    flex-direction column
    .md-field-item, .md-input-item-container
      box-sizing border-box
      hairline(bottom, field-item-border-color)
    .md-field-item:last-of-type::before
      display none
    .md-input-item.error .md-input-item-container
      hairline(bottom, input-item-color-error )
  .md-radio .md-radio-item
    padding-left 0 !important
    padding-right 0 !important

</style>
