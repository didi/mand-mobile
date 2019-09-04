<template>
  <label
    class="md-radio"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked,
      'is-inline': inline
    }"
    @click="$_onClick"
  >
    <div class="md-radio-icon">
      <md-icon :name="currentIcon" :size="size" :svg="iconSvg"/>
    </div>
    <div class="md-radio-label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>import Icon from '../icon'
import radioMixin from './mixins'

export default {
  name: 'md-radio',

  mixins: [radioMixin],

  components: {
    [Icon.name]: Icon,
  },

  props: {
    name: {
      required: true,
    },
    value: {
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    label: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // Mixins Props
    // icon: {
    //   type: String,
    //   default: 'checked',
    // },
    // iconInverse: {
    //   type: String,
    //   default: 'check',
    // },
    // iconDisabled: {
    //   type: String,
    //   default: 'check-disabled',
    // },
    // iconSvg: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  computed: {
    isChecked() {
      return this.value === this.name || (this.rootGroup && this.rootGroup.value === this.name)
    },
    currentIcon() {
      return this.disabled ? this.iconDisabled : this.isChecked ? this.icon : this.iconInverse
    },
  },

  inject: {
    rootGroup: {default: null},
  },

  methods: {
    $_onClick() {
      if (!this.disabled) {
        this.$emit('input', this.name)
        if (this.rootGroup) {
          this.rootGroup.check(this.name)
        }
      }
    },
  },
}
</script>

<style lang="stylus">
.md-radio
  display flex
  align-items center
  line-height 1.5
  margin-top v-gap-sm
  margin-bottom v-gap-sm
  .md-radio-icon
    color color-text-placeholder
    .md-icon
      display flex
  &.is-checked
    .md-radio-icon
      color radio-color
  &.is-disabled
    .md-radio-icon
    .md-radio-label
      color color-text-disabled
  &.is-inline
    display inline-flex
    &:not(:last-child)
      margin-right 40px

.md-radio-icon
  position relative
  flex-shrink 0

.md-radio-label
  margin-left h-gap-sm
  font-size inherit
  font-weight font-weight-normal
</style>

