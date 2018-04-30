<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-10">
    <md-tabs
      :titles="titles"
      upside-down
    >
      <div slot="title"
        slot-scope="props">
        <md-icon name="hollow-plus" size="sm"></md-icon>
        {{props.prefix}}{{props.title}}
      </div>
      <div v-for="(title, index) of titles" :key="index">
        {{title.title}}的内容
      </div>
    </md-tabs>
  </div>
</template>

<script>
import {Tabs, Icon} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: 'scope-slot',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
  },
  data() {
    return {
      titles: [
        {
          title: '第1',
          prefix: '我',
        },
        {
          title: '第2',
          prefix: '你',
        },
        {
          title: '第3',
          prefix: '他',
        },
      ],
    }
  },
}

</script>