<template>
  <div class="md-example agree">
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

export default {...createDemoModule('action-sheet', [Demo0, Demo1, Demo2, Demo3])}
</script>

<style lang="stylus">
.md-example.agree
  .md-example-child
    padding v-gap-md h-gap-lg
    font-size font-minor-large
    background color-bg-base
</style>
