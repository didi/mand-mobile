<template>
  <label
    class="md-check"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked
    }"
    @click="$_onClick"
  >
    <div class="md-check-icon">
      <md-icon :name="currentIcon" :size="size" />
    </div>
    <div class="md-check-label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>import Icon from '../icon'
export default {
  name: 'md-check',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    name: {
      type: [Boolean, String],
      default: true,
    },
    value: {
      type: [Boolean, String],
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    icon: {
      type: String,
      default: 'checked',
    },
    iconInverse: {
      type: String,
      default: 'check',
    },
    iconDisabled: {
      type: String,
      default: 'check-disabled',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isChecked() {
      return this.value === this.name || (this.rootGroup && this.rootGroup.value.indexOf(this.name) !== -1)
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
      if (this.disabled) {
        return
      }

      if (typeof this.name === 'boolean') {
        this.$emit('input', !this.value)
      } else if (this.isChecked) {
        this.$emit('input', '')
        if (this.rootGroup) {
          this.rootGroup.uncheck(this.name)
        }
      } else {
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
.md-check
  display flex
  align-items center
  line-height 1.5
  margin-top v-gap-sm
  margin-bottom v-gap-sm
  &.is-checked
    .md-check-icon
      color check-color
  &.is-disabled
    .md-check-icon
    .md-check-label
      color color-text-disabled

.md-check-icon
  position relative
  color color-text-placeholder

.md-check-label
  margin-left h-gap-sm
  font-size inherit
</style>
