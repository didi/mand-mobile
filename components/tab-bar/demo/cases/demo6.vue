<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-6">
    <md-tab-bar
      :titles="titles"
      @indexChanged="alert"
    ></md-tab-bar>
  </div>
</template>

<script>import {TabBar, Toast} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '监听点击事件',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
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