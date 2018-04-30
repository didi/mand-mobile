<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-11">
    <md-tabs
      :titles="titles"
    >
      <div v-for="(title, index) of titles" :key="index">
        {{title}}的内容
      </div>
    </md-tabs>
  </div>
</template>

<script>
import {Tabs} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '设置标题栏边距',
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

<style lang="stylus">
.md-example-child-tabs-11
  .md-tab-bar
    padding 0 100px
</style>