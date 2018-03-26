<<template>
  <div class="md-example captcha">
    <section class="md-example-section" v-for="(demo, index) in demos" :key="index">
      <div class="md-example-title" v-html="demo.title"></div>
      <div class="md-example-content">
        <component :is="demo"></component>
      </div>
    </section>
	</div>
</template>

<script>import createDemoModule from '../../../examples/create-demo-module'
import Demo0 from './cases/demo0'
// import Demo1 from './cases/demo1'
export default {...createDemoModule('captcha', [Demo0])}
</script>

<style lang="stylus">
.md-example.captcha
  .md-example-child
    padding 0
  .md-example-section
    float left
    width 100%
    margin-bottom 10px
    h1
      margin-bottom 10px
      color color-gray-1
      font-size font-heading-normal
      font-weight normal
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
