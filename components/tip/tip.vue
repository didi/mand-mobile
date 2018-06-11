<template>
  <div class="md-tip" :class="wrapperCls">
    <template>{{content}}</template>
    <md-icon name="cross" size="md" @click.native="$_onClose" />
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
    content: {
      type: [String, Number],
    },
  },

  computed: {
    wrapperCls() {
      const cls = {}

      if (['left', 'bottom', 'right'].indexOf(this.placement) !== -1) {
        cls[`is-${this.placement}`] = true
      }

      return cls
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
    display inline-block
    max-width 400px
    color tip-color
    font-size tip-font-size
    padding tip-padding
    border-radius tip-radius
    background-color tip-fill
    z-index tip-zindex
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
    &.is-bottom::after
      bottom auto
      top -10px
      border-width 0 11px 10px 11px
      border-color transparent transparent tip-fill transparent
    &.is-left::after
      bottom auto
      right -10px
      left auto
      top 50%
      margin-left 0
      margin-top -11px
      border-width 11px 0 11px 10px
      border-color transparent transparent transparent tip-fill
    &.is-right::after
      bottom auto
      left -10px
      right auto
      top 50%
      margin-left 0
      margin-top -11px
      border-width 11px 10px 11px 0
      border-color transparent tip-fill transparent transparent
    .md-icon
      position absolute
      right 16px
      top 50%
      width tip-close-size
      height tip-close-size
      transform translateY(-50%)
</style>
