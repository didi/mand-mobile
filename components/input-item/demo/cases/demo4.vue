<template>
  <div class="md-example-child md-example-child-input-item-4">
    <md-field>
      <md-input-item
        ref="input11"
        title="手机号码"
        value="1999999999999"
        error="手机号码位数有误"
        clearable
      ></md-input-item>
      <md-input-item
        ref="input11"
        title="手机号码"
        value="1999999999999"
        error="手机号码位数有误"
        clearable
        is-title-latent
      ></md-input-item>
    </md-field>
  </div>
</template>

<script>import {InputItem, Field} from 'mand-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '错误提示',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
}
</script>