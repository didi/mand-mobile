<template>
  <md-water-mark
    class="md-bill"
    :content="waterMark"
  >
    <header class="md-bill-header">
      <h4 class="md-bill-title" v-if="title" v-text="title"></h4>
      <div class="md-bill-no" v-if="no">NO.{{no}}</div>
    </header>
    <div class="md-bill-neck">
      <span></span>
    </div>
    <div class="md-bill-content">
      <div class="md-bill-detail">
        <slot></slot>
      </div>
      <footer v-if="$slots.description" class="md-bill-description">
        <slot name="description"></slot>
      </footer>
    </div>
    <div slot="watermark" slot-scope="props" v-if="!!$scopedSlots.watermark">
      <slot name="watermark" @index="1"></slot>
    </div>
  </md-water-mark>
</template>

<script>import FieldItem from '../field-item'
import WaterMark from '../water-mark'

export default {
  name: 'md-bill',

  components: {
    [FieldItem.name]: FieldItem,
    [WaterMark.name]: WaterMark,
  },

  props: {
    title: {
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
  background none
  overflow hidden

.md-bill-header
  display flex
  align-items center
  justify-content space-between
  padding 20px 32px 0
  background-color bill-bg

.md-bill-title
  color bill-name-color
  font-size bill-name-font-size
  font-weight font-weight-medium
  font-family Songti SC

.md-bill-no
   color bill-no-color
  font-size bill-no-font-size

.md-bill-neck
  position relative
  height 36px
  padding 10px
  margin 0 18px
  background-color bill-bg
  box-sizing border-box
  span
    position absolute
    display block
    top 50%
    left 10px
    right 10px
    height 1px
    hairline(bottom, field-item-border-color)
  &::before,
  &::after
    content ''
    display block
    position absolute
    top 0
    width 36px
    height 36px
    border-radius 18px
  &::before
    left -36px
    box-shadow 10px 0 0 bill-bg
  &::after
    right -36px
    box-shadow -10px 0 0 bill-bg

.md-bill-content
  padding 0 32px 20px 32px
  background-color bill-bg

.md-bill-detail
  padding-bottom 40px

.md-bill-description
  position relative
  padding-top 40px
  line-height 1.5
  color bill-description-color
  font-size bill-description-font-size
  hairline(top, field-item-border-color)
</style>
