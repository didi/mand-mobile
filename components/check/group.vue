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
      default: () => {
        /* istanbul ignore next */
        return []
      },
    },
    max: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      children: {},
    }
  },

  provide() {
    return {
      rootGroup: this,
    }
  },

  methods: {
    register(child) {
      child.name && (this.children[child.name] = child)
    },
    unregister(child) {
      child.name && delete this.children[child.name]
    },
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
    toggleAll(checked) {
      // if (checked === false) {
      //   this.$emit('input', [])
      //   return
      // }

      let {children} = this
      const names = Object.keys(children).filter(name => {
        const child = children[name]
        const isChecked = !!~this.value.indexOf(name)

        // disabled options retain original status
        if (child.disabled) {
          return isChecked
        }
        return checked === false ? false : !checked ? !isChecked : true
      })
      this.$emit('input', names)
    },
  },
}
</script>

