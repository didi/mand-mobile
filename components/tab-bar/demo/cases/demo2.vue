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
  /* DELETE */
  title: '指定默认标签',
  titleEnUS: 'Specify the default tab',
  describe: '默认标签2',
  describeEnUS: 'Default tab 2',
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