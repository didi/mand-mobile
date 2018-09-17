<template>
  <div class="md-field-item" :class="{ 'is-disabled': currentDisabled }" @click="$_onClick">
    <div class="md-field-item-content">
      <div class="md-field-item-start" v-if="$slots.start">
        <slot name="start"></slot>
      </div>
      <div class="md-field-item-inner">
        <p class="md-field-item-title" v-if="title" v-text="title"></p>
        <p class="md-field-item-describe" v-if="describe" v-text="describe"></p>
        <slot></slot>
      </div>
      <div class="md-field-item-after" v-if="arrow || $slots.after">
        <slot name="after"></slot>
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
    describe: {
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
  &:not(:last-child)
    hairline(bottom, field-item-border-color)

.md-field-item-content
  display flex
  align-items center
  justify-content space-between
  min-height field-item-min-height
  padding-top field-item-padding-v
  padding-bottom field-item-padding-v
  box-sizing border-box

.md-field-item-start
  flex-shrink 0
  margin-right h-gap-lg

.md-field-item-inner
  flex 1 1 0%
  color field-item-color
  font-size field-item-font-size
  line-height 1.2

.md-field-item-after
  flex-shrink 0
  margin-left h-gap-sm
  display inline-flex
  align-items center
  justify-content flex-end
  color field-item-after-color
  font-size field-item-after-font-size
  .md-icon-arrow-right
    margin-right -12px

.md-field-item-title
  line-height 1.2

.md-field-item-describe
  color #858B9C
  font-size 24px
  line-height 1.4
  margin-top v-gap-sm

.md-field-item-children
  padding-bottom field-item-padding-v

.md-field-item
  &.is-disabled
    .md-field-item-inner,
    .md-field-item-describe,
    .md-field-item-after
      color color-text-disabled
</style>
