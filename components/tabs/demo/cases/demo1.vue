<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-1">
    <md-tabs
      v-model="current"
      :items="items"
      :maxLength="5"
    />
  </div>
</template>

<script>import {Tabs} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '首屏数量',
  titleEnUS: 'Max length',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      current: 1,
      items: [
        {key: 1, label: '标签1'},
        {key: 2, label: '标签2'},
        {key: 3, label: '标签3'},
        {key: 4, label: '标签4'},
        {key: 5, label: '标签5'},
      ],
    }
  },
}
</script>
