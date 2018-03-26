<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-4">
    <md-tabs
      :titles="titles"
      :ink-bar-animate="false"
      show-ink-bar
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
  title: '禁用下划线动画',
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