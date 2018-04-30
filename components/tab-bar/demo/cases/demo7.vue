<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-7">
    <md-tab-bar
      :titles="titles"
      :show-ink-bar="true"
      ref="tabBar"
    ></md-tab-bar>
  </div>
</template>

<script>import {TabBar, Toast} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '通过公共方法切换 <a href="javascript:window.triggerTabBar()">selectTab(2)</a>',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
  },
  data() {
    return {
      titles: ['第一', '第二', '第三', '第四'],
    }
  },
  mounted() {
    window.triggerTabBar = () => {
      this.$refs.tabBar.selectTab(2)
    }
  },
  methods: {
    alert(index, preIndex) {
      Toast.succeed(`index由${preIndex}切换为${index}`)
    },
  },
}
</script>