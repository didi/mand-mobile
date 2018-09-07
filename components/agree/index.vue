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
      <div class="md-agree-checked-wrap">
        <md-icon
          name="circle-right"
          :size="size">
        </md-icon>
      </div>
      <md-icon
      name="circle"
      :size="size">
      </md-icon>
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
  margin-right 10px
  flex-shrink 0
  color agree-fill-inverse
  &.checked
    color agree-fill
    .md-agree-checked-wrap
      svg
        transform scale(1)

.md-agree-checked-wrap
  position absolute
  top 0
  left 0
  width 100%
  svg
    transform scale(0)
    transition transform ease-in-out .1s

.md-agree-content
  flex 1 1 0%
</style>
