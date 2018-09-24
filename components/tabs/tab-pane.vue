<template>
  <div class="md-tab-pane" v-show="active" role="tabpanel">
    <slot></slot>
  </div>
</template>

<script>export default {
  name: 'md-tab-pane',

  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
  },

  computed: {
    active() {
      return this.$parent.currentName === this.name
    },
  },

  watch: {
    label() {
      this.$parent.$forceUpdate()
    },
    disabled() {
      this.$parent.$forceUpdate()
    },
  },

  created() {
    this.$parent.$_addPane(this)
  },
  destroyed() {
    this.$parent.$_removePane(this)
  },
}
</script>
