<template>
  <li
    v-if="noTouch"
    v-text="value"
    :class="[active ? 'active' : '']"
    @click="$_onFocus"
  ></li>
  <li
    v-else
    v-text="value"
    :class="[active ? 'active' : '']"
    @touchstart="$_onFocus"
    @touchmove="$_onBlur"
    @touchend="$_onBlur"
    @touchcancel="$_onBlur"
    @click="$_onFocus"
  ></li>
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
    }
  },

  methods: {
    $_onFocus(event) {
      if (!this.noPrevent) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
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
