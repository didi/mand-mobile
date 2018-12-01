<template>
  <md-water-mark
    class="md-bill"
    :content="waterMark"
  >
    <header class="md-bill-header">
      <template v-if="!$slots.header">
        <h4 class="md-bill-title" v-if="title" v-text="title"></h4>
        <div class="md-bill-no" v-if="no">NO.{{no}}</div>
      </template>
      <template v-else>
        <slot name="header"></slot>
      </template>
    </header>
    <div class="md-bill-neck">
      <span></span>
    </div>
    <div class="md-bill-content">
      <div class="md-bill-detail">
        <slot></slot>
      </div>
      <footer v-if="$slots.footer" class="md-bill-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
    <template slot="watermark" slot-scope="props" v-if="!!$scopedSlots.watermark">
      <slot name="watermark" :coord="props.coord"></slot>
    </template>
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
  background bill-bg

.md-bill-header
  display flex
  align-items center
  justify-content space-between
  padding 28px 32px 8px

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
  margin 0 28px
  box-sizing border-box
  span
    position absolute
    display block
    top 50%
    left 10px
    right 10px
    height 1px
    border-top dashed 1px field-item-border-color
    transform scaleY(0.5)

.md-bill-content
  padding 0 32px 20px 32px

.md-bill-detail
  padding-bottom 40px
</style>
