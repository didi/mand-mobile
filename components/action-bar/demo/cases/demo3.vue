<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-3">
    <md-action-bar :actions="data" @click="onBtnClick">
      <span class="price">
        &yen;128.00<small>起</small>
      </span>
    </md-action-bar>
  </div>
</template>

<script>import {ActionBar, Dialog} from 'mand-mobile'

export default {
  name: 'action-bar-demo',
  /* DELETE */
  title: '使用插槽',
  titleEnUS: 'With slot',
  height: 150,
  /* DELETE */
  components: {
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '主要按钮',
          round: true,
        },
      ],
    }
  },
  methods: {
    onBtnClick(event, action) {
      this.$set(action, 'loading', true)
      this.$set(action, 'inactive', true)
      Dialog.alert({
        content: `${action.text}点击`,
        onConfirm: () => {
          this.$set(action, 'loading', false)
          this.$set(action, 'inactive', false)
        },
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.price
  font-weight 500
  font-size 48px
  color #FF823A
  small
    margin-left 10px
    font-size 32px
    color #858B9C
</style>

