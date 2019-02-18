<template>
  <transition :name="transitionName">
    <div
      class="md-tab-pane"
      v-show="active"
      role="tabpanel"
      :tab="name"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>export default {
  name: 'md-tab-pane',

  inject: {
    rootTabs: {
      from: 'rootTabs',
      default() {
        /* istanbul ignore next */
        return this.$parent
      },
    },
  },

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
      return this.rootTabs.currentName === this.name
    },
    transitionName() {
      return this.rootTabs.prevIndex > this.rootTabs.currentIndex ? 'md-tab-slide-right' : 'md-tab-slide-left'
    },
  },

  watch: {
    label() {
      this.rootTabs.$forceUpdate()
    },
    disabled() {
      this.rootTabs.$forceUpdate()
    },
  },

  created() {
    this.rootTabs.$_addPane(this)
  },
  destroyed() {
    this.rootTabs.$_removePane(this)
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
