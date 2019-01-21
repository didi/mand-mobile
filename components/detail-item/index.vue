<template>
  <div class="md-detail-item" :class="{ 'is-bold': bold }">
    <div class="md-detail-title" v-text="title"></div>
    <div class="md-detail-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script>export default {
  name: 'md-detail-item',

  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: [String, Number],
      default: '',
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.md-detail-item
  display flex
  align-items center
  justify-content space-between
  line-height 1.35
  font-size detail-item-font-size
  padding-top detail-item-gap
  padding-bottom detail-item-gap

.md-detail-title
  flex-shrink 0
  color detail-item-title-color

.md-detail-content
  flex 1 1 0%
  color detail-item-content-color
  display flex
  align-items center
  justify-content flex-end
  margin-left h-gap-sm

.md-detail-item
  &.is-bold
    .md-detail-title,
    .md-detail-content
      font-weight bold
      color detail-item-content-color
</style>
