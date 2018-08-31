<template>
  <div class="md-tab-pane" role="tabpanel">
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
}
</script>

<style lang="stylus">
.md-tab-pane
  width 100%
  box-sizing border-box
</style>
