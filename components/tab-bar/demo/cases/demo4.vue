<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-4">
    <md-tab-bar
      v-model="current"
      :items="items"
      :has-ink="false"
    >
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon" />
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>

<script>import {TabBar, Icon} from 'mand-mobile'

export default {
  name: 'tab-bar-demo',
  /* DELETE */
  title: '自定义内容',
  titleEnUS: 'Custom Item',
  /* DELETE */
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon,
  },
  data() {
    return {
      current: 1,
      items: [{name: 1, label: '首页', icon: 'home'}, {name: 2, label: '我的', icon: 'user'}],
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-tab-bar-4
  .custom-item
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 100%
    flex 1
    .text
      font-size 20px
</style>

