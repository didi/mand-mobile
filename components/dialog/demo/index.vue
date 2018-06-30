<template>
  <div class="md-example dialog">
    <section class="md-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="md-example-title" v-html="demo.title || '基础'"></div>
      <div class="md-example-describe" v-html="demo.describe"></div>
      <div class="md-example-content">
        <component :is="demo"></component>
      </div>
    </section>
	</div>
</template>

<script>import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'

export default {...createDemoModule('dialog', [Demo0, Demo1])}
</script>

<style lang="stylus">
.md-example-child-dialog .md-button
  margin-bottom 20px
</style>
