<template>
  <div
    class="md-popup-title-bar"
    :class="{large: !!describe}"
    @touchmove="$_preventScroll"
  >
    <!-- Cancel -->
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
  </div>
</template>

<script>export default {
  name: 'md-popup-title-bar',

  props: {
    title: {
      type: String,
      default: '',
    },
    describe: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
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
  &>div
    display flex
    float left
    height 100%
    flex-direction column
    align-items center
    justify-content center
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
  .title-bar-title
    width 100%
    padding 0 20%
    box-sizing border-box
    p.title
      font-size popup-title-bar-font-size-title
      color popup-title-bar-color-title
    p.describe
      margin-top v-gap-sm
      font-size popup-title-bar-font-size-describe
      color popup-title-bar-color-describe
  .title-bar-left
    left 0
    color popup-title-bar-color-button-left
  .title-bar-right
    right 0
    color popup-title-bar-color-button-right
</style>
