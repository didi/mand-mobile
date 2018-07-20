<template>
  <div :class="{'is-disabled': disabled}">
    <slot
      v-for="option in _options"
      :option="option"
      :selected="selected"
      :select="select"
    ></slot>
  </div>
</template>

<script>const normalizeValue = value => {
  if ((typeof value === 'string' && value !== '') || typeof value === 'number') {
    return [value]
  } else if (Array.isArray(value)) {
    return [...value]
  } else {
    return []
  }
}

export default {
  name: 'md-check-group',

  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    max: {
      type: [String, Number],
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selected: [],
    }
  },

  computed: {
    _options() {
      return this.options.map(option => {
        return {
          ...option,
          isSelected: this.selected.indexOf(option.value) !== -1,
        }
      })
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        const items = normalizeValue(val)
        const changed = items.length !== this.selected.length || this.selected.some(val => items.indexOf(val) === -1)

        if (changed) {
          this.selected = items
        }
      },
    },
  },

  methods: {
    // MARK: public methods
    select(value) {
      if (this.disabled) {
        return
      }

      const items = normalizeValue(value)
      const values = this.options.map(option => option.value)
      const maxSelects = parseInt(this.max)
      let selected = [...this.selected]

      for (let i = 0, len = items.length; i < len; i++) {
        const oIndex = values.indexOf(items[i])
        const sIndex = selected.indexOf(items[i])

        /* istanbul ignore else */
        if (oIndex !== -1) {
          const option = this.options[oIndex]
          /* istanbul ignore else */
          if (!option.disabled) {
            if (sIndex !== -1) {
              selected.splice(sIndex, 1)
            } else {
              /* istanbul ignore else */
              if (maxSelects === 1) {
                selected = [option.value]
              } else if (maxSelects <= 0 || selected.length < maxSelects) {
                selected.push(option.value)
              }
            }
          }
        }
      }

      this.selected = [...selected]

      if (maxSelects === 1) {
        this.$emit('input', this.selected[0])
      } else {
        this.$emit('input', this.selected)
      }
    },
  },
}
</script>
