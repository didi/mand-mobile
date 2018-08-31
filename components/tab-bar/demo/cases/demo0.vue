<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-0">
    <md-tab-bar
      v-model="current"
      :items="items"
    />
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  components: {
    [TabBar.name]: TabBar,
  },
  data() {
    return {
      current: 1,
      items: [{name: 1, label: '标签1'}, {name: 2, label: '标签2'}],
    }
  },
}
</script>
