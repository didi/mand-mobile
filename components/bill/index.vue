<template>
  <md-water-mark
    class="md-bill"
    :content="waterMark"
  >
    <div>
      <md-field
        :title="name"
        :value="no ? `NO.${no}` : ''"
        plain
      >
        <div class="bill-radius">
          <i></i><i></i>
        </div>
        <div class="bill-detail">
          <slot></slot>
        </div>
        <div class="bill-description">
          <slot name="description"></slot>
        </div>
      </md-field>
    </div>
    <div slot="watermark" slot-scope="props" v-if="!!$scopedSlots.watermark">
      <slot name="watermark" @index="1"></slot>
    </div>
  </md-water-mark>
</template>

<script>import Field from '../field'
import FieldItem from '../field/item'
import WaterMark from '../water-mark'

export default {
  name: 'md-bill',

  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [WaterMark.name]: WaterMark,
  },

  props: {
    name: {
      type: String,
      default: '',
    },
    no: {
      type: [String, Number],
      default: '',
    },
    waterMark: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="stylus">
.md-bill
  position relative
  background bill-bg
  overflow hidden
  .md-field.is-plain
    position relative
    z-index 2
    background-color transparent
    .md-field-title
      .md-field-title-inner
        .title
          color bill-name-color
          font-size bill-name-font-size
          font-weight font-weight-medium
          font-family Songti SC
        .value
          display flex
          flex-direction column
          justify-content center
          color bill-no-color
          font-size bill-no-font-size
    .md-field-content
      position relative
      .md-field-item
        padding 0

    .bill-radius
      position absolute
      top -18px
      left 0
      right 0
      z-index 3
      i
        position relative
        width 36px
        height 36px
        background color-bg-inverse
        border-radius radius-circle
        &:first-of-type
          float left
          left -18px
        &:last-of-type
          float right
          right -18px
    .bill-detail
      padding 20px 0 40px 0
      margin 0 field-padding-plain-h
      hairline(bottom, field-item-border-color)
    .bill-description
      padding 40px field-padding-plain-h
      color bill-description-color
      font-size bill-description-font-size
      line-height 1.5
</style>
