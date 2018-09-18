<template>
  <div class="md-example switch">
    <section class="md-example-section">
      <div class="md-example-title"></div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <demo0></demo0>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title"></div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <demo1></demo1>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title"></div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <demo2></demo2>
      </div>
    </section>
    <section class="md-example-section">
      <div class="md-example-title"></div>
      <div class="md-example-describe"></div>
      <div class="md-example-content">
        <demo3></demo3>
      </div>
    </section>
	</div>
</template>

<script>import Demo0 from './cases/demo0'
import Demo1 from './cases/demo1'
import Demo2 from './cases/demo2'
import Demo3 from './cases/demo3'

export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
  },
}
</script>

<style lang="stylus" scoped>

</style>