<template>
  <li
    v-if="noTouch"
    :class="[active ? 'active' : '']"
    @click="$_onFocus($event, 'click')"
  >
    <span v-text="value"></span>
  </li>
  <li
    v-else
    :class="[active ? 'active' : '']"
    @touchstart="$_onFocus($event, 'touch')"
    @touchmove="$_onBlur"
    @touchend="$_onBlur"
    @touchcancel="$_onBlur"
    @click="$_onFocus($event, 'click')"
  >
    <span v-text="value"></span>
  </li>
</template>

<script>export default {
  name: 'md-number-key',

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    noTouch: {
      type: Boolean,
      default: false,
    },
    noPrevent: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      active: false,
      activeType: '',
    }
  },

  methods: {
    $_onFocus(event, type) {
      if (!this.noPrevent) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }

      if (this.activeType && this.activeType !== type) {
        return
      }

      this.activeType = type

      if (!this.noTouch) {
        this.active = true
      }

      this.$emit('press', this.value)
    },
    $_onBlur() {
      this.active = false
    },
  },
}
</script>
