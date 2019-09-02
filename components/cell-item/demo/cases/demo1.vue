<template>
  <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-1">
    <md-field>
      <md-cell-item title="余额" addon="可用8000.34" arrow />
      <md-cell-item title="余额" addon="可用8000.34" />
      <md-cell-item title="使用余额">
        <md-switch slot="right" v-model="open" />
      </md-cell-item>
      <md-cell-item title="使用余额" disabled>
        <md-switch slot="right" :value="true" disabled/>
      </md-cell-item>
      <md-cell-item title="余额" addon="可用8000.34" arrow no-border>
        <div class="holder" slot="left"></div>
      </md-cell-item>
    </md-field>
  </div>
</template>

<script>import {Field, CellItem, Switch} from 'mand-mobile'

export default {
  name: 'cell-item-demo',
  /* DELETE */
  title: '单行列表',
  titleEnUS: 'Simple List',
  align: 'left',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
  },
  data() {
    return {
      open: false,
    }
  },
}
</script>

<style lang="stylus" scoped>
.holder
  display block
  width 48px
  height 48px
  background-color #E6E6E6
</style>
