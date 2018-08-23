<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
    <md-tabs
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
      items: [
        {key: 1, label: '标签1'},
        {key: 2, label: '标签2'},
        {key: 3, label: '标签3'},
        {key: 4, label: '标签4'},
        {key: 5, label: '标签5'},
        {key: 6, label: '标签6'},
      ],
    }
  },
}
</script>
