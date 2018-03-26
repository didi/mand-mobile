<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-2">
    <md-tab-bar
      :titles="titles"
      :show-ink-bar="true"
      :default-index="2"
    ></md-tab-bar>
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  title: '指定默认标签',
  describe: '默认标签2',
  components: {
    [TabBar.name]: TabBar,
  },
  data() {
    return {
      titles: ['第一', '第二', '第三', '第四'],
    }
  },
}
</script>