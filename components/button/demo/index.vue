<template>
  <div class="md-example button">
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
import Demo4 from './cases/demo4'

export default {
  ...createDemoModule('button', [Demo0, Demo1, Demo2, Demo3, Demo4]),
}

// export default {
//   name: `button-demo`,
//   data() {
//     return {
//       demos: [Demo0, Demo1, Demo2, Demo3],
//     }
//   },
// }
</script>

<style lang="stylus">
.md-example.button
  .md-example-section
    float left
    width 100%
    margin-bottom 10px
    h1
      margin-bottom 10px
      color color-gray-1
      font-size font-heading-normal
      font-weight normal
    .md-button
      // float left
      margin-bottom 10px
      &.inline, &.link
        margin-right 10px
    .md-example-box
      float left
      width 100%
      hairline(top)
      .md-example-box-content
        float left
        width 100%
        padding 60px h-gap-lg
        color color-text-base
        font-size font-minor-large
        text-align left
        background color-bg-base
        box-sizing border-box
        line-height 1.5
        text-indent 2em
      .md-button
        margin 0
</style>
