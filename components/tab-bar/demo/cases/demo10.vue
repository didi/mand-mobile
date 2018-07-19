<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-0">
    <md-tab-bar :titles="titles"></md-tab-bar>
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '多项滚动',
  titleEnUS: 'Scrollable',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },
  data() {
    return {
      titles: ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九'],
    }
  },
}
</script>
