<template>
  <div class="md-example stepper">
    <section class="md-example-section" v-for="(demo, index) in demos" :key="index">
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
import Demo4 from './cases/demo4'
import Demo5 from './cases/demo5'

export default {...createDemoModule('stepper', [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5])}
</script>

<style lang="stylus" scoped>
.md-example-section
  position relative
  margin 0 !important
  hairline(bottom, color-border-base)
.md-example-content
  margin 0 !important
</style>
