<template>
  <div class="md-example icon">
    <section class="md-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="md-example-title" v-html="demo.title || '基础'"></div>
      <div class="md-example-descibe" v-html="demo.descibe"></div>
      <div class="md-example-content">
        <component :is="demo"></component>
      </div>
    </section>
	</div>
</template>

<script>import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'

export default {...createDemoModule('icon', [Demo0, Demo1, Demo2])}
</script>

<style lang="stylus">
.md-example-child-icon
  padding-top 20px
  background #FFF
  clearfix()
  .md-example-item, .md-example-item-s
    float left
    width 25%
    height 100px
    padding 15px 0
    color #333
    text-align center
    .md-icon
      margin 0 auto
      color #111A34
    p
      text-align center
      font-size font-body-normal
      color #999
  .md-example-item-s
    width 25%
</style>
