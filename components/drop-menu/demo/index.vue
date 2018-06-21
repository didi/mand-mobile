<template>
  <div class="md-example drop-menu">
    <section class="md-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="md-example-title" v-html="demo.title || '基础'"></div>
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

export default {...createDemoModule('drop-menu', [Demo0, Demo1, Demo2, Demo3])}
</script>

<style lang="stylus">
.md-example.drop-menu
  .md-example-section
    position relative
    .md-example-child
      position relative
      height 400px
      background color-bg-base
      overflow hidden
      .md-drop-menu
        position absolute
        float left
        width 100%
        height 100%
        .md-drop-menu-bar
          height drop-menu-height
        .md-popup
          position absolute
      .content
        font-size font-body-normal
        text-align center
        line-height 400px
</style>