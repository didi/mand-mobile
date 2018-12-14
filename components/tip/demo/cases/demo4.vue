<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-4">
    <md-tip
      name="md-tip-4"
      icon="security"
      content="完善信息，领取5元免息券"
      :offset="{top: -10}"
      fill
      @show="onShow"
      @hide="onHide"
    >
      <md-button type="default">点击我</md-button>
    </md-tip>
  </div>
</template>

<script>import {Tip, Button, Toast} from 'mand-mobile'
export default {
  name: 'tips-demo',
  /* DELETE */
  title: '其他配置',
  titleEnUS: 'Other configurations',
  /* DELETE */
  components: {
    [Tip.name]: Tip,
    [Button.name]: Button,
  },
  methods: {
    onShow(name) {
      Toast({
        content: `显示了${name}`,
      })
    },
    onHide(name) {
      Toast({
        content: `隐藏了${name}`,
      })
    },
  },
}
</script>

<style lang="stylus">
.md-tip-4
  .md-tip-bg
    background-color #FFEBDF
    &:after
      border-width 10px 11px 0 11px
      border-color #FFEBDF transparent transparent transparent
  .md-tip-content
    padding-left 80px
    color #C37447
    .md-icon-security
      position absolute
      left 32px
      width 64px !important
      height 64px !important
  .md-tip-bg
    box-shadow none
    opacity 1
</style>

