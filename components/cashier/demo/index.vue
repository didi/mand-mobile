<<template>
  <div class="md-example cashier">
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

export default {...createDemoModule('cashier', [Demo0])}
</script>

<style lang="stylus">
.md-example.cashier
  .md-example-child
    padding 0
</style>
