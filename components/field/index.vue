<template>
  <div class="md-field" :class="{'is-plain': plain}">
    <div
      class="md-field-title"
      v-if="title !== '' || value !== '' "
    >
      <div class="md-field-title-inner">
        <p class="title" v-if="title !== ''">
          {{title}}
        </p>
        <p class="value" v-if="$slots.titleValue">
          <slot name="titleValue"></slot>
        </p>
        <p class="value" v-else-if="value !== ''">
          {{value}}
        </p>
      </div>
    </div>
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
    value: {
      type: String,
      default: '',
    },
    arrow: {
      type: String,
      default: '',
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus">
.md-field
  background-color field-bg-color
  .md-field-title
    padding field-padding-v field-padding-h field-title-margin field-padding-h
    .md-field-title-inner
      display flex
      font-size field-title-font-size
      font-weight field-title-font-weight
      color field-title-color
      &>p
        flex 1
        &.title
          text-align left
        &.value
          font-size field-title-operator-font-size
          color field-title-operator-color
          text-align right
  .md-field-content
    display flex
    flex-direction column
    .md-field-item,
    .md-input-item,
    .md-input-item.is-title-latent .md-input-item-msg,
    .md-radio
      padding-left field-padding-h
      padding-right field-padding-h
      box-sizing border-box
    .md-field-item .md-field-item-inner, .md-input-item-container
      hairline(bottom, field-item-border-color)
    .md-field-item:last-of-type
      .md-field-item-inner::before
        display none
    // .md-input-item:last-of-type .md-input-item-container::before
    //   display none
    .md-input-item.error .md-input-item-container
      hairline(bottom, input-item-color-error)
  .md-radio .md-radio-item
    padding-left 0 !important
    padding-right 0 !important

  &.is-plain
    background-color field-bg-plain-color
    .md-field-title
      padding field-item-padding-plain-v field-padding-plain-h 0
      .md-field-title-inner
        padding-bottom field-item-padding-plain-v
        font-size field-title-plain-font-size
        color field-title-plain-color
        hairline(bottom, field-item-border-color)
    .md-field-item
      padding-left field-padding-plain-h
      padding-right field-padding-plain-h
      .md-field-item-inner
        margin-bottom field-item-padding-plain-v
        padding 0
        &:before
          display none
        .md-field-item-label
          .md-field-item-title
            font-size field-item-label-plain-font-size
            color field-item-label-plain-color
          .md-field-item-brief
            display none
        .md-field-item-content
          font-size field-item-cotent-plain-font-size
          font-weight font-weight-normal
          color field-item-content-plain-color
      &:first-of-type
        margin-top field-item-padding-plain-v
</style>
