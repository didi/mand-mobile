<template>
  <div class="md-example tabs">
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

export default {
  ...createDemoModule('tabs', [Demo0]),
}
</script>

<style lang="stylus">
.md-example-child-tabs .md-tab-content
  background #f
  height 100px
  line-height 100px
  text-align center
</style>
