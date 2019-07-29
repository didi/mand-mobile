<template>
  <div
    class="md-popup-title-bar"
    :class="[
      `title-align-${titleAlign}`,
      ...{large: !!describe, 'large-radius': largeRadius}
    ]"
    @touchmove="$_preventScroll"
  >
    <!-- Cancel -->
    <template v-if="!onlyClose">
      <div
        class="title-bar-left md-popup-cancel"
        v-if="cancelText"
        v-html="cancelText"
        @click="$emit('cancel')"
      ></div>
      <div
        class="title-bar-left md-popup-cancel"
        v-else-if="$slots.cancel"
        @click="$emit('cancel')"
      >
        <slot name="cancel"></slot>
      </div>
    </template>

    <!-- Title -->
    <div
      v-if="title"
      class="title-bar-title"
    >
      <p
        v-if="title"
        class="title"
        v-html="title"
      ></p>
      <p
        v-if="describe"
        class="describe"
        v-html="describe"
      ></p>
    </div>
    <div
      class="title-bar-title"
      v-else
    >
      <slot name="title"></slot>
    </div>

    <!-- Ok -->
    <template v-if="!onlyClose">
      <div
        class="title-bar-right md-popup-confirm"
        v-if="okText"
        v-html="okText"
        @click="$emit('confirm')"
      ></div>
      <div
        class="title-bar-right md-popup-confirm"
        v-else-if="$slots.confirm"
        @click="$emit('confirm')"
      >
        <slot name="confirm"></slot>
      </div>
    </template>
    <template v-if="onlyClose">
      <div
        class="title-bar-right md-popup-close"
        @click="$emit('cancel')"
      >
        <md-icon name="close" size="lg"></md-icon>
      </div>
    </template>
  </div>
</template>

<script>import titleBarMixin from './mixins/title-bar'
import Icon from '../icon'

export default {
  name: 'md-popup-title-bar',

  mixins: [titleBarMixin],

  components: {
    [Icon.name]: Icon,
  },

  props: {
    // Mixin Props
    // title: {
    //   type: String,
    //   default: '',
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
    // okText: {
    //   type: String,
    //   default: '',
    // },
    // cancelText: {
    //   type: String,
    //   default: '',
    // },
    // largeRadius: {
    //   type: Boolean,
    //   default: false,
    // },
    // onlyClose: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  watch: {
    largeRadius: {
      handler(val) {
        this.$parent.largeRadius = val
      },
      immediate: true,
    },
  },

  methods: {
    $_preventScroll(e) {
      /* istanbul ignore next */
      e.preventDefault()
    },
  },
}
</script>

<style lang="stylus" scoped>
.md-popup-title-bar
  position relative
  width 100%
  height popup-title-bar-height
  background-color popup-title-bar-bg
  border-radius popup-title-bar-radius popup-title-bar-radius 0 0
  clearfix()
  overflow hidden
  &.large
    height popup-title-bar-height-large
  &.large-radius
    border-radius popup-title-bar-radius-large popup-title-bar-radius-large 0 0
  &.title-align-left
    .title-bar-title
      padding-left h-gap-sl
      align-items flex-start
    .title-bar-left
      display none
  &.title-align-right
    .title-bar-title
      padding-right h-gap-sl
      align-items flex-end
    .title-bar-right
      display none
  &>div
    display flex
    float left
    height 100%
    padding-top 60px
    flex-direction column
    align-items center
    justify-content flex-start
    overflow hidden
    text-overflow ellipsis
    word-break break-word
    white-space nowrap
  .title-bar-left, .title-bar-right
    position absolute
    width 20%
    max-height popup-title-bar-height
    font-size popup-title-bar-font-size-button
    font-weight popup-title-bar-font-weight-button
    box-sizing border-box
    line-height 1
  .title-bar-title
    width 100%
    padding-left 20%
    padding-right 20%
    box-sizing border-box
    line-height 1
    p.title
      font-size popup-title-bar-font-size-title
      color popup-title-bar-color-title
    p.describe
      margin-top 15px
      font-size popup-title-bar-font-size-describe
      color popup-title-bar-color-describe
  .title-bar-left
    left 0
    padding-left h-gap-sl
    align-items flex-start
  .title-bar-right
    right 0
    padding-right h-gap-sl
    align-items flex-end
  .md-popup-cancel
    color popup-title-bar-color-button-left
  .md-popup-confirm
    color popup-title-bar-color-button-right
  .md-popup-close
    padding-top h-gap-sl
    color popup-title-bar-color-button-left
    justify-content flex-start
</style>
