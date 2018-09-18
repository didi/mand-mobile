<template>
  <div class="md-action-bar">
    <div class="md-action-bar-text" v-if="hasSlots">
      <slot></slot>
    </div>
    <div class="md-action-bar-group">
      <md-button
        v-for="(item, index) in coerceActions"
        :type="!!item.disabled ? 'disabled' : 'primary'"
        :plain="index !== coerceActions.length - 1"
        :content="item.text"
        :key="index"
        @click="$_onBtnClick($event, item)"
      ></md-button>
    </div>
  </div>
</template>

<script>import Button from '../button'
import {isEmptyObject} from '../_util'

export default {
  name: 'md-action-bar',

  components: {
    [Button.name]: Button,
  },

  props: {
    actions: {
      type: Array,
      default: [],
    },
  },

  computed: {
    coerceActions() {
      return this.actions.slice(0, 2)
    },
    hasSlots() {
      return !isEmptyObject(this.$slots)
    },
  },

  methods: {
    // MARK: events handler
    $_onBtnClick(event, action) {
      if (action.disabled) {
        return
      }
      action.onClick && action.onClick(event, action)
      this.$emit('click', event, action)
    },
  },
}
</script>

<style lang="stylus">
.md-action-bar
  position fixed
  z-index action-bar-zindex
  left 0
  bottom 0
  right 0
  display flex
  padding action-bar-padding-v action-bar-padding-h
  padding-bottom constant(safe-area-inset-bottom)
  background color-bg-inverse
  clearfix()

.md-action-bar-text
  display flex
  flex 1
  height action-bar-slot-height
  margin-right action-bar-button-gap
  align-items center
  overflow hidden

.md-action-bar-group
  display flex
  flex 1
  height 100%
  .md-button
    display flex
    float right
    align-items center
    justify-content center
    flex 1
    &:nth-of-type(2)
      margin-left action-bar-button-gap
</style>
