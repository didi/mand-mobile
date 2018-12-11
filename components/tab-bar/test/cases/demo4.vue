<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-4">
    <md-tab-bar v-model="current" :items="items">
      <template slot="item" slot-scope="{ item }">
        <md-icon :name="item.icon" />
        <span v-text="item.label"></span>
      </template>
    </md-tab-bar>
  </div>
</template>

<script>import {TabBar, Icon} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon,
  },
  data() {
    return {
      current: 1,
      items: [
        {name: 1, label: '标签1', icon: 'arrow-up'},
        {name: 2, label: '标签2', icon: 'arrow-right'},
        {name: 3, label: '标签3', icon: 'arrow-down'},
        {name: 4, label: '标签4', icon: 'arrow-left'},
      ],
    }
  },
}
</script>
