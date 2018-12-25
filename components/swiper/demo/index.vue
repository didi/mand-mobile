<template>
  <div class="md-example swiper">
    <section class="md-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="md-example-title" v-html="demo.title || '基础'"></div>
      <div class="md-example-describe" v-html="demo.describe"></div>
      <div class="md-example-describe" v-html="demo.message"></div>
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
import Demo3 from './cases/demo3'

export default {...createDemoModule('swiper', [Demo0, Demo1, Demo2, Demo3])}
</script>

<style lang="stylus">
.md-example.swiper
  .md-example-content
    width 100%
    margin-bottom 20px
  .md-example-title
    a
      background #3ca0e6
      color #fff
      padding 5px 10px
      border-radius 4px
      font-size 24px
      line-height 28px
</style>