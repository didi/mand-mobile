<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-7">
    <md-tabs
      ref="tabs"
      :titles="titles"
      show-ink-bar
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
  title: '通过公共方法切换 <a href="javascript:window.triggerTabs()">selectTab(2)</a>',
  /* DELETE */
  components: {
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      titles: ['第一', '第二', '第三', '第四'],
    }
  },
  mounted() {
    window.triggerTabs = () => {
      this.$refs.tabs.selectTab(2)
    }
  },
}

</script>