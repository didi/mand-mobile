<template>
  <div
    class="md-agree"
    :class="[
      disabled ? 'disabled' : ''
    ]">
    <div
      class="md-agree-icon"
      :class="[
        value ? 'checked' : ''
      ]"
      @click="$_onChange($event)">
      <div class="md-agree-checked">
        <md-icon name="checked" :size="size"></md-icon>
      </div>
      <md-icon name="check" :size="size"></md-icon>
    </div>
    <div class="md-agree-content">
      <slot></slot>
    </div>
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
  align-items center
  &.disabled
    opacity agree-disabled-opacity

.md-agree-icon
  position relative
  padding-right h-gap-sm
  align-self flex-start
  flex-shrink 0
  color agree-fill
  &.checked
    .md-agree-checked
      transform scale(1)
      color agree-fill
        

.md-agree-checked
  position absolute
  top 0
  left 0
  transform scale(0.4)
  color transparent
  transition all 200ms ease
    

.md-agree-content
  flex 1 1 0%
  line-height 1.5
</style>
