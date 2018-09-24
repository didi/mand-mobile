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
      <md-icon :name="currentIcon" :size="size" />
    </div>
    <div class="md-radio-label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>import Icon from '../icon'
export default {
  name: 'md-radio',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    icon: {
      type: String,
      default: 'circle-right',
    },
    iconInverse: {
      type: String,
      default: 'circle',
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
  },

  computed: {
    isChecked() {
      return this.value === this.name
    },
    currentIcon() {
      return this.value === this.name ? this.icon : this.iconInverse
    },
  },

  methods: {
    $_onClick() {
      if (!this.disabled) {
        this.$emit('input', this.name)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-radio
  display flex
  align-items flex-start
  line-height 1.5
  margin-top v-gap-sm
  margin-bottom v-gap-sm
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
  top 0.75em
  line-height 0
  transform translateY(-50%)

.md-radio-label
  margin-left h-gap-sm
  font-size inherit
</style>

