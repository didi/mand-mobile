<template>
  <div class="md-example-child md-example-child-field md-example-child-field-1">
    <md-field>
      <md-field-item title="滴水贷" arrow />
      <md-field-item title="信用付">
        <md-switch slot="after" v-model="open" />
      </md-field-item>
      <md-field-item title="滴水贷" arrow>
        <span slot="after">可用8000.34</span>
      </md-field-item>
      <md-field-item title="信用付">
        <span slot="after">可用8000.35</span>
      </md-field-item>
      <md-field-item title="滴水贷" arrow>
        <div class="holder" slot="start"></div>
        <span slot="after">可用8000.34</span>
      </md-field-item>
      <md-field-item title="信用付" arrow>
        <div class="holder" slot="start"></div>
        <span slot="after">可用8000.34</span>
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Field, FieldItem, Switch} from 'mand-mobile'

export default {
  name: 'field-demo',
  /* DELETE */
  title: '单行列表',
  titleEnUS: 'Simple List',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
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
