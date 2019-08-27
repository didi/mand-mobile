<template>
  <div class="md-example">
    <md-switch v-model="loading" class="skeleton-switch"></md-switch>
    <md-field>
      <md-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <md-cell-item title="交通银行" brief="展示摘要描述" addon="附加文案" arrow>
          <span class="holder" slot="left"></span>
        </md-cell-item>
      </md-skeleton>
      <md-skeleton avatar title :loading="loading" :row="2" class="skeleton-item">
        <md-cell-item title="招商银行" brief="展示摘要描述" addon="附加文案" arrow>
          <span class="holder" slot="left"></span>
        </md-cell-item>
      </md-skeleton>
    </md-field>
  </div>
</template>

<script>import {Skeleton, Field, CellItem, Switch} from 'mand-mobile'
export default {
  name: 'skeleton-demo',
  title: '切换显示子组件',
  data() {
    return {
      loading: true,
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
  },
}
</script>

<style lang="stylus" scoped>
.skeleton-switch
  margin-bottom 32px
.skeleton-item
  &:last-child
    margin-bottom 0
  margin-bottom 24px
.md-cell-item
  &.skeleton-item
    margin-bottom 0
.holder
  display block
  width 80px
  height 80px
  border-radius 50%
  background-color #e6e6e6
</style>
