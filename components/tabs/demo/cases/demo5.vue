<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-5">
    <md-tabs
      show-ink-bar
    >
      <div slot="title">
        <div>
          <md-icon name="hollow-plus" size="sm"></md-icon>
          我
        </div>
      </div>
      <div>
        爱你
      </div>
      <div slot="title">
        <div>
          <md-icon name="cross" size="sm"></md-icon>
          你
        </div>
      </div>
      <div>
        爱他
      </div>
      <div slot="title">
        <div>
          <md-icon name="right" size="sm"></md-icon>
          他
        </div>
      </div>
      <div>
        爱她
      </div>
    </md-tabs>
  </div>
</template>

<script>import {Icon, Tabs} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '自定制按钮内容',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
  },
}
</script>