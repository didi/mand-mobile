<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
    <md-tabs
      v-model="current"
      :items="items"
    />
  </div>
</template>

<script>import {Tabs} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  components: {
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      current: 1,
      items: [{key: 1, label: '标签1'}, {key: 2, label: '标签2'}],
    }
  },
}
</script>
