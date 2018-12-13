<template>
  <div class="md-cell-item"
    :class="{
      'is-disabled': disabled,
      'no-border': noBorder,
    }"
    @click="$_onClick"
  >
    <div
      class="md-cell-item-body"
      :class="{multilines: !!brief}"
    >
      <div class="md-cell-item-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div v-if="title || brief || $slots.default" class="md-cell-item-content">
        <p class="md-cell-item-title" v-if="title" v-text="title"></p>
        <p class="md-cell-item-brief" v-if="brief" v-text="brief"></p>
        <slot></slot>
      </div>
      <div class="md-cell-item-right" v-if="arrow || addon || $slots.right">
        <slot name="right">
          {{ addon }}
        </slot>
        <md-icon v-if="arrow" name="arrow-right" size="md" />
      </div>
    </div>
    <div class="md-cell-item-children" v-if="$slots.children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'md-cell-item',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    brief: {
      type: String,
      default: '',
    },
    addon: {
      type: String,
      default: '',
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    $_onClick(e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-cell-item
  position relative
  &.no-border .md-cell-item-body
    remove-hairline(bottom)


.md-cell-item-body
  position relative
  display flex
  align-items center
  justify-content space-between
  min-height cell-item-min-height
  padding-top cell-item-padding-v
  padding-bottom cell-item-padding-v
  box-sizing border-box
  hairline(bottom, cell-item-border-color)
  &.multilines
    padding-top cell-item-multilines-padding-v
    padding-bottom cell-item-multilines-padding-v

.md-cell-item-left
  flex-shrink 0
  margin-right h-gap-lg

.md-cell-item-content
  flex 1 1 0%
  color cell-item-title-color
  font-size cell-item-title-font-size
  line-height 1.2

.md-cell-item-right
  flex-shrink 0
  margin-left h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color cell-item-right-color
  font-size cell-item-right-font-size
  .md-icon-arrow-right
    margin-left 6px
    margin-right -6px
    color color-text-placeholder

.md-cell-item-title
  line-height 1.2

.md-cell-item-brief
  color cell-item-brief-color
  font-size cell-item-brief-font-size
  line-height 1.4
  margin-top v-gap-xs

.md-cell-item-children
  padding cell-item-padding-v 0

.md-cell-item
  &.is-disabled
    &,
    .md-cell-item-content,
    .md-cell-item-title,
    .md-cell-item-brief,
    .md-cell-item-left,
    .md-cell-item-right,
    .md-cell-item-children
      color color-text-disabled
</style>
