<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-3">
    <md-tabs
      :titles="titles"
      :ink-bar-length="40"
      show-ink-bar
    >
      <div v-for="(title, index) of titles" :key="index">
        {{title}}的内容
      </div>
    </md-tabs>
  </div>
</template>

mand-mobile
import {Tabs} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  title: '指定下划线长度',
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