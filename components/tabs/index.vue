<template>
  <div class="md-tabs">
    <md-tab-bar
      :items="menus"
      :value="currentName"
      @change="$_handleTabClick"
      :has-ink="hasInk"
      :ink-length="inkLength"
    />
    <div class="md-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>import TabBar from '../tab-bar'

export default {
  name: 'md-tabs',

  components: {
    [TabBar.name]: TabBar,
  },

  props: {
    value: String,
    hasInk: {
      type: Boolean,
      default: true,
    },
    inkLength: {
      type: Number,
      default: 80,
    },
  },

  data() {
    return {
      currentName: this.value,
      panes: [],
    }
  },

  watch: {
    value(val) {
      if (val !== this.currentName) {
        this.currentName = val
      }
    },
  },

  computed: {
    menus() {
      return this.panes.map(pane => {
        return {
          name: pane.name,
          label: pane.label,
          disabled: pane.disabled,
        }
      })
    },
  },

  mounted() {
    if (!this.currentName && this.menus.length) {
      this.currentName = this.menus[0].name
    }
  },

  methods: {
    // MARK: private events
    $_handleTabClick(tab) {
      this.currentName = tab.name
      this.$emit('input', tab.name)
      this.$emit('change', tab)
    },
    // MARK: private methods
    $_addPane(pane) {
      if (this.panes.indexOf(pane) === -1) {
        this.panes.push(pane)
      }
    },
    $_removePane(pane) {
      const index = this.panes.indexOf(pane)
      if (index >= 0) {
        this.panes.splice(index, 1)
      }
    },
  },
}
</script>

<style lang="stylus">
.md-tabs
  position relative
  overflow hidden

.md-tab-slide-enter-active,
.md-tab-slide-leave-active
  transition: all 500ms

.md-tab-slide-enter
  opacity: 0.01
  transform: translate3d(-50px, 0, 0)

.md-tab-slide-leave-active
  position: absolute
.md-tab-slide-leave-to
  opacity: 0.01
  transform: translate3d(50px, 0, 0)
</style>
