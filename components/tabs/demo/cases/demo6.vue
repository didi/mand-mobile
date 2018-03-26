<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tabs-6">
    <md-tabs
      :titles="titles"
      show-ink-bar
      @indexChanged="alert"
    >
      <div v-for="(title, index) of titles" :key="index">
        {{title}}的内容
      </div>
    </md-tabs>
  </div>
</template>

<script>import {Tabs, Toast} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  title: '监听点击事件',
  components: {
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      titles: ['第一', '第二', '第三', '第四'],
    }
  },
  methods: {
    alert(index, preIndex) {
      Toast.succeed(`index由${preIndex}切换为${index}`)
    },
  },
}
</script>