<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-3">
    <md-tabs
      v-model="current"
      :items="items"
      :hasInk="false"
    />
  </div>
</template>

<script>import {Tabs} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '无下划线',
  titleEnUS: 'No ink',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      current: 1,
      items: [{key: 1, label: '标签1'}, {key: 2, label: '标签2'}, {key: 3, label: '标签3'}],
    }
  },
}
</script>
