<template>
  <div class="md-field-item" :class="{ 'is-disabled': currentDisabled }" @click="$_onClick">
    <div class="md-field-item-content">
      <label class="md-field-item-title" v-if="title" v-text="title"></label>
      <div class="md-field-item-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="md-field-item-control">
        <slot>
          <template v-if="content">{{ content }}</template>
          <div class="md-field-item-placeholder" v-else-if="placeholder" v-text="placeholder"></div>
        </slot>
      </div>
      <div class="md-field-item-right" v-if="arrow || addon || $slots.right">
        <slot name="right">{{ addon }}</slot>
        <md-icon v-if="arrow" name="arrow-right" size="lg" />
      </div>
    </div>
    <div class="md-field-item-children" v-if="$slots.children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'md-field-item',

  components: {
    [Icon.name]: Icon,
  },

  inject: {
    rootField: {
      from: 'rootField',
      default: () => ({}),
    },
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    content: {
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
  },

  computed: {
    currentDisabled() {
      return this.rootField.disabled || this.disabled
    },
  },

  methods: {
    $_onClick(e) {
      if (!this.currentDisabled) {
        this.$emit('click', e)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-field-item
  position relative

.md-field-item-content
  display flex
  align-items center
  justify-content space-between
  min-height field-item-min-height
  padding-top field-item-padding-v
  padding-bottom field-item-padding-v
  box-sizing border-box
  hairline(bottom, field-item-border-color)

.md-field-item-title
  flex-shrink 0
  width field-item-title-width
  margin-right field-item-title-gap
  font-size field-item-font-size
  line-height 1.2

.md-field-item-left
  flex-shrink 0
  margin-right h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-start
  color field-item-addon-color
  font-size field-item-addon-font-size

.md-field-item-control
  position relative
  flex 1 1 0%
  color field-item-color
  font-size field-item-font-size
  line-height 1.2

.md-field-item-placeholder
  color field-item-placeholder-color

.md-field-item-right
  flex-shrink 0
  margin-left h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color field-item-addon-color
  font-size field-item-addon-font-size
  .md-icon-arrow-right
    margin-right -12px

.md-field-item-children
  font-size field-item-children-font-size
  margin-top v-gap-sm
  margin-bottom v-gap-sm

.md-field-item
  &.is-disabled
    .md-field-item-control,
    .md-field-item-left,
    .md-field-item-right
      color color-text-disabled
</style>
