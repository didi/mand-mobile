<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-2">
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
  title: '滚动',
  titleEnUS: 'Scroll',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      current: 1,
      items: [
        {key: 1, label: '精选'},
        {key: 2, label: '全部'},
        {key: 3, label: '满减券'},
        {key: 4, label: '立减券'},
        {key: 5, label: '免息券'},
        {key: 6, label: '校园专享'},
        {key: 7, label: '夜间优惠'},
        {key: 8, label: '红包'},
      ],
    }
  },
}
</script>
