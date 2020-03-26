<template>
  <md-check-base-box
    class="md-check-box"
    :label="label"
    :is-checked="isChecked"
    :disabled="disabled"
    @click.native="$_onClick"
  >
    <slot>{{label}}</slot>
  </md-check-base-box>
</template>

<script>import CheckBaseBox from '../check-base/box'

export default {
  name: 'md-check-box',

  components: {
    [CheckBaseBox.name]: CheckBaseBox,
  },

  props: {
    name: {
      default: true,
    },
    value: {
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

  mounted() {
    this.rootGroup && this.rootGroup.register(this)
  },
  destroyed() {
    this.rootGroup && this.rootGroup.unregister(this)
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
  display inline-block
  text-align center
  color checkbox-color
  font-size checkbox-font-size
  padding v-gap-sm h-gap-md
  border 1px solid checkbox-border-color
  border-radius checkbox-border-radius
  box-sizing border-box
  overflow hidden
  &.is-checked
    color checkbox-active-color
    border-color checkbox-active-border-color
    &.is-disabled
      color checkbox-active-color
      border-color checkbox-active-border-color
      opacity 0.6
  &.is-disabled
    color checkbox-disabled-color
    border-color checkbox-disabled-color

  .md-tag
    position absolute
    top 0
    right 0
    .quarter-bg
      background-color checkbox-active-color
</style>
