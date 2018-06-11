<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-4">
    <md-tab-bar
      :titles="titles"
      :show-ink-bar="true"
      :ink-bar-animate="false"
    ></md-tab-bar>
  </div>
</template>

<script>import {TabBar} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '禁用下划线动画',
  titleEnUS: 'Disable underline animation',
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