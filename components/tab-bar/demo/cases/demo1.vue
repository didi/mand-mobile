<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-1">
    <md-tab-bar
      :titles="titles"
      :show-ink-bar="false"
    ></md-tab-bar>
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  title: '不带下划线',
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