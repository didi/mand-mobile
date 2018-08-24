<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-4">
    <md-tabs v-model="current" :items="items">
      <template slot="item" slot-scope="{ item }">
        <md-icon :name="item.icon" />
        <span v-text="item.label"></span>
      </template>
    </md-tabs>
  </div>
</template>

<script>import {Tabs, Icon} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '自定义内容',
  titleEnUS: 'Custom Item',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
  },
  data() {
    return {
      current: 1,
      items: [
        {key: 1, label: '标签1', icon: 'arrow-up'},
        {key: 2, label: '标签2', icon: 'arrow-right'},
        {key: 3, label: '标签3', icon: 'arrow-down'},
        {key: 4, label: '标签4', icon: 'arrow-left'},
      ],
    }
  },
}
</script>
