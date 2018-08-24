<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-5">
    <md-tabs
      v-model="current"
      :items="items"
      @change="onChange"
    />
  </div>
</template>

<script>import {Tabs, Toast} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '监听事件',
  titleEnUS: 'Events',
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
  methods: {
    onChange(item, index) {
      Toast.info(`index: ${index}, label: ${item.label}`)
    },
  },
}
</script>
