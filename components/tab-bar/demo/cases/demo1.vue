<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-1">
    <md-tab-bar
      v-model="current"
      :items="items"
      :maxLength="5"
    />
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '首屏数量',
  titleEnUS: 'Max length',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },
  data() {
    return {
      current: 1,
      items: [
        {name: 1, label: '标签1'},
        {name: 2, label: '标签2'},
        {name: 3, label: '标签3'},
        {name: 4, label: '标签4'},
        {name: 5, label: '标签5'},
      ],
    }
  },
}
</script>
