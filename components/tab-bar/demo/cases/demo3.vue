<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-3">
    <md-tab-bar
      :titles="titles"
      :show-ink-bar="true"
      :ink-bar-length="40"
    ></md-tab-bar>
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '指定下划线长度',
  /* DELETE */
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