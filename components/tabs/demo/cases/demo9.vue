<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-9">
    <md-tabs
      :titles="titles"
      upside-down
    >
      <div v-for="(title, index) of titles" :key="index">
        {{title}}的内容
      </div>
    </md-tabs>
  </div>
</template>

<script>import {Tabs} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '标题栏处于下方',
  titleEnUS: 'Title bar is below',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      titles: ['第一', '第二', '第三', '第四'],
    }
  },
}
</script>