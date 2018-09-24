<template>
  <div class="md-check-group">
    <slot></slot>
  </div>
</template>

<script>import Check from './index'

export default {
  name: 'md-check-group',

  components: {
    [Check.name]: Check,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
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
      const index = this.value.indexOf(name)
      if (index === -1 && (this.max < 1 || this.value.length < this.max)) {
        this.$emit('input', this.value.concat(name))
      }
    },
    uncheck(name) {
      const index = this.value.indexOf(name)
      if (index !== -1) {
        this.$emit('input', this.value.slice(0, index).concat(this.value.slice(index + 1)))
      }
    },
    toggle(name) {
      const index = this.value.indexOf(name)
      if (index === -1) {
        this.check(name)
      } else {
        this.uncheck(name)
      }
    },
  },
}
</script>

