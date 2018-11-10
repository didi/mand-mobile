<template>
  <transition :name="transitionName">
    <div class="md-tab-pane" v-show="active" role="tabpanel">
      <slot></slot>
    </div>
  </transition>
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
    transitionName() {
      return this.$parent.prevIndex > this.$parent.currentIndex ? 'md-tab-slide-right' : 'md-tab-slide-left'
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

<style lang="stylus">
.md-tab-pane
  position relative
  width 100%

.md-tab-slide-left,
.md-tab-slide-right
  &-enter
    opacity 0.01
  &-enter-active
    transition all 300ms
  &-leave-active
    position absolute
    top 0
    transition all 300ms
  &-leave-to
    opacity 0.01

.md-tab-slide-left
  &-enter
    transform translateX(100%)
  &-leave-to
    transform translateX(-100%)
.md-tab-slide-right
  &-enter
    transform translateX(-100%)
  &-leave-to
    transform translateX(100%)
</style>
