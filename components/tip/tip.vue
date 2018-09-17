<template>
  <div class="md-tip" :class="wrapperCls">
    <div class="md-tip-content">
      <template>{{content}}</template>
      <md-icon
        v-if="closable"
        name="cross"
        size="md"
        @click.native="$_onClose"
      />
    </div>
    <div class="md-tip-bg"></div>
  </div>
</template>

<script>import Icon from '../icon'

export default {
  name: 'md-tip-content',
  components: {
    [Icon.name]: Icon,
  },

  props: {
    placement: {
      type: String,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    content: {
      type: [String, Number],
    },
  },

  computed: {
    wrapperCls() {
      return {
        'has-close': this.closable,
        [`is-${this.placement}`]: ['left', 'bottom', 'right'].indexOf(this.placement) !== -1,
      }
    },
  },

  methods: {
    $_onClose() {
      this.$emit('close')
    },
  },
}
</script>


<style lang="stylus">
.md-tip
  position relative
  display inline-block
  max-width 400px
  z-index tip-zindex

.md-tip-content
  position relative
  padding tip-padding
  color tip-color
  font-size tip-font-size
  line-height 1.2
  z-index 2

.md-tip-bg
  position absolute
  absolute-pos()
  border-radius tip-radius
  background-color tip-fill
  box-shadow tip-shadow
  opacity tip-fill-opacity
  &::after
    content ''
    position absolute
    bottom -10px
    left 50%
    margin-left -11px
    width 0
    height 0
    border-style solid
    border-width 10px 11px 0 11px
    border-color tip-fill transparent transparent transparent

.md-tip
  &.has-close
    .md-tip-content
      padding-right 60px
  &.is-bottom
    .md-tip-bg::after
      bottom auto
      top -10px
      border-width 0 11px 10px 11px
      border-color transparent transparent tip-fill transparent
  &.is-left
    .md-tip-bg::after
      top 50%
      right -6px
      left auto
      margin-top -11px
      border-width 11px 0 11px 10px
      border-color transparent transparent transparent tip-fill
  &.is-right
    .md-tip-bg::after
      top 50%
      left 4px
      margin-top -11px
      border-width 11px 10px 11px 0
      border-color transparent tip-fill transparent transparent

  .md-icon.md-icon-cross
    position absolute
    right 16px
    top 50%
    width tip-close-size
    height tip-close-size
    transform translateY(-50%)
</style>
