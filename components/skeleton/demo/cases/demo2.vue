<template>
  <div class="md-example-child md-example-child-skeleton md-example-child-skeleton-2">
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

<script>import {Skeleton, Field, CellItem} from 'mand-mobile'
export default {
  name: 'skeleton-demo',
  /* DELETE */
  title: '加载正文 <a href="javascript:window.startLoading()">开始加载</a>',
  titleEnUS: 'Loading body <a href="javascript:window.startLoading()">Start loading</a>',
  describe: '3s后加载完成',
  describeEnUS: 'Load completed after 3s',
  /* DELETE */
  data() {
    return {
      loading: true,
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
  },
  mounted() {
    window.startLoading = this.startLoading
    this.startLoading()
  },
  methods: {
    startLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child-skeleton-2
  margin 30px 0
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
