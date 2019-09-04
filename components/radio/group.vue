<template>
  <div class="md-radio-group">
    <slot></slot>
  </div>
</template>

<script>export default {
  name: 'md-radio-group',

  props: {
    value: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 0,
    },
  },

  provide() {
    return {
      rootGroup: this,
    }
  },

  methods: {
    check(name) {
      this.$emit('input', name)
    },
  },
}
</script>

