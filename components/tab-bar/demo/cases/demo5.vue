<template>
  <div class="md-example-child md-example-child-tab-bar md-example-child-tab-bar-5">
    <md-tab-bar
      :show-ink-bar="true">
      <div>
        <md-icon name="hollow-plus" size="sm"></md-icon>
        我
      </div>
      <div>
        <md-icon name="cross" size="sm"></md-icon>
        你
      </div>
      <div>
        <md-icon name="right" size="sm"></md-icon>
        他
      </div>
    </md-tab-bar>
  </div>
</template>

<script>import {TabBar, Icon} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  title: '自定制按钮内容',
  components: {
    [Icon.name]: Icon,
    [TabBar.name]: TabBar,
  },
}
</script>