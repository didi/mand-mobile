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
      <div class="md-agree-icon-container">
        <slot name="icon" :checked="value">
          <md-icon name="checked" :size="size"></md-icon>
          <md-icon name="check" :size="size"></md-icon>
        </slot>
      </div>
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
  display flex
  justify-content center
  align-items center
  align-self flex-start
  flex-shrink 0
  position relative
  margin-right h-gap-sm
  color agree-fill
  width 50px
  height 50px
  .md-agree-icon-container
    position relative
    .md-icon
      display flex
      width auto
      height auto
      line-height 1
      will-change auto
      &.md-icon-checked
        position absolute
        top 0
        left 0
        transform scale(0.6)
        color transparent
        transition all .3s ease-in-out-quint
      &.md-icon-check
        color agree-fill
  &.checked .md-agree-icon-container
    .md-icon-checked
      transform scale(1)
      color agree-fill
    .md-icon-check
      opacity 0.8

.md-agree-content
  flex 1 1 0%
  line-height 1.5
</style>
