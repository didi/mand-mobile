<template>
  <label
    class="md-check-box"
    :class="{
      'is-disabled': disabled,
      'is-checked': isChecked
    }"
    @click="$_onClick"
  >
    <slot>{{label}}</slot>
  </label>
</template>

<script>export default {
  name: 'md-check-box',

  props: {
    name: {
      type: [Boolean, String],
      default: true,
    },
    value: {
      type: [Boolean, String],
      default: false,
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
.md-check-box
  position relative
  text-align center
  color checkbox-color
  font-size checkbox-font-size
  padding v-gap-sm h-gap-md
  border 1px solid checkbox-border-color
  border-radius checkbox-border-radius
  box-sizing border-box
  &.is-checked
    color checkbox-active-color
    border-color checkbox-active-border-color
    &:before
      background-color checkbox-active-bg
    &.is-disabled
      color checkbox-active-color
      border-color checkbox-active-border-color
      opacity 0.6
  &.is-disabled
    color checkbox-disabled-color
    border-color checkbox-disabled-color
</style>
