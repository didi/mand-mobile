<template>
  <md-check-base-box
    class="md-radio-box"
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
  name: 'md-radio-box',

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
      return this.value === this.name || (this.rootGroup && this.rootGroup.value === this.name)
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
