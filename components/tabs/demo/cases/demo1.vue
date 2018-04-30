<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-1">
    <md-tabs
      :titles="titles"
      :show-ink-bar="false"
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
  title: '不带下划线',
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