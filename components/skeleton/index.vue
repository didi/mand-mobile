<template>
  <div class="md-skeleton" v-if="loading">
    <div
      v-if="avatar"
      :class="{
        'md-skeleton-avatar': true,
        'md-skeleton-avatar-large': avatarSize === 'lg',
        'md-skeleton-avatar-small': avatarSize === 'sm',
      }"
    ></div>
    <div class="md-skeleton-content">
      <h4 v-if="title" class="md-skeleton-title" :style="{ width: getTitleWidth() }" />
      <div
        v-for="index in row"
        class="md-skeleton-row"
        :style="{width: index === row ? '60%' : getRowWidth(index - 1)}"
        :key="index"
      >
      </div>
    </div>
  </div>
  <div  v-else>
    <slot></slot>
  </div>
</template>
<script>
const DEFUALT_TITLE_WIDTH = '40%'
const DEFUALT_WIDTH = '100%'

export default {
  name: 'md-skeleton',

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Number,
      default: 3,
    },
    title: {
      type: Boolean,
      default: false,
    },
    titleWidth: {
      type: [Number, String],
      default: DEFUALT_TITLE_WIDTH,
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFUALT_WIDTH,
    },
    avatarSize: {
      type: String,
      default: 'md',
    },
  },

  methods: {
    isNumber(n) {
      return typeof n === 'number'
    },
    getRowWidth(index) {
      const {rowWidth, isNumber} = this
      if (rowWidth && Array.isArray(rowWidth)) {
        return isNumber(rowWidth[index]) ? `${rowWidth[index]}%` : rowWidth[index]
      } else if (rowWidth) {
        return isNumber(rowWidth) ? `${rowWidth}%` : rowWidth
      }
      return DEFUALT_WIDTH
    },
    getTitleWidth() {
      const {titleWidth, isNumber} = this
      if (titleWidth) {
        return isNumber(titleWidth) ? `${titleWidth}%` : titleWidth
      }
      return DEFUALT_TITLE_WIDTH
    },
  },
}

</script>

<style lang="stylus">
placeHolder()
  animation-duration 2s
  animation-fill-mode forwards
  animation-iteration-count infinite
  animation-name placeHolderShimmer
  animation-timing-function linear
  background linear-gradient(to right, #F3F3F6 8%, #F8FAFF 18%, #F3F3F6 33%)
  background-size 1000px 104px

.md-skeleton
  box-sizing border-box
  display flex
  .md-skeleton-avatar
    width 80px
    height 80px
    margin-right 32px
    border-radius 50%
    placeHolder()
    &.md-skeleton-avatar-large
      width 96px
      height 96px
    &.md-skeleton-avatar-small
      width 64px
      height 64px
  .md-skeleton-content
    flex 1
  .md-skeleton-title, .md-skeleton-row
    box-sizing border-box
    height 32px
    margin-bottom 24px
    border 0
    border-radius 0
    placeHolder()
    &:last-child
      margin-bottom 0

@keyframes placeHolderShimmer
  0%
    background-position -468px 0
  100%
    background-position 468px 0
</style>
