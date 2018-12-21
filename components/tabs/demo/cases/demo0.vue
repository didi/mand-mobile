<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
    <md-tabs>
      <md-tab-pane class="content" name="p1" label="第一章">
        她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
      </md-tab-pane>
      <md-tab-pane class="content" name="p2" label="第二章">
        又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
      </md-tab-pane>
      <md-tab-pane class="content" name="p3" label="第三章" disabled>
        你的腿？她有些诧异。腿？我的腿怎么了？他更诧异。后来，她才知道他的腿，那天只是坐麻了而已。
      </md-tab-pane>
    </md-tabs>
  </div>
</template>

<script>import {Tabs, TabPane} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  height: 500,
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
}
</script>

<style lang="stylus">
.md-example-child-tabs
  .content
    padding 12px 0
    font-size 28px
    background #FFF
    padding 20px
    line-height 1.5
    box-sizing border-box
  .md-tabs-content
    min-height 200px
    background #FFF
</style>

