<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-3">
    <md-tab-bar
      v-model="current"
      :items="items"
      :hasInk="false"
    />
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '无下划线',
  titleEnUS: 'No ink',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },
  data() {
    return {
      current: 1,
      items: [{name: 1, label: '标签1'}, {name: 2, label: '标签2'}, {name: 3, label: '标签3'}],
    }
  },
}
</script>
