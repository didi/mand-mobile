<template>
  <div
    class="md-agree"
    :class="[
      disabled ? 'disabled' : ''
    ]">
    <div
      class="agree-icon"
      :class="[
        value ? 'checked' : ''
      ]"
      @click="$_onChange($event)">
      <md-icon
      :name="iconName"
      :size="size"></md-icon>
    </div>
    <slot></slot>
  </div>
</template>

<script>import Icon from '../icon'
export default {
  name: 'md-agree',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
  },

  data() {
    return {}
  },

  computed: {
    iconName() {
      return this.value ? 'circle-right' : 'circle'
    },
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onChange(event) {
      if (this.disabled) {
        return
      }
      this.$emit('input', !this.value)
      this.$emit('change', event)
    },
  },
}
</script>

<style lang="stylus">
.md-agree
  display flex
  &.disabled
    opacity opacity-disabled
  .agree-icon
    margin-right 10px
    color agree-fill-inverse
    &.checked
      color agree-fill
</style>
