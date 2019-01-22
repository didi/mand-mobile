<template>
  <div class="md-example-child md-example-child-input-item-2">
    <md-field>
      <md-input-item
        title="银行卡"
        type="bankCard"
        placeholder="bankCard xxxx xxxx xxxx xxxx"
      ></md-input-item>
      <md-input-item
        title="手机号"
        type="phone"
        v-model="phone"
        placeholder="phone xxx xxxx xxxx"
      ></md-input-item>
      <md-input-item
        title="金额"
        type="money"
        v-model="money"
        placeholder="money xx, xxx.xxxx"
      ></md-input-item>
      <md-input-item
        title="数字"
        type="digit"
        v-model="digit"
        placeholder="digit 0123456789"
      ></md-input-item>
      <md-input-item
        title="密码"
        type="password"
        placeholder="password *********"
      ></md-input-item>
      <md-input-item
        title="邮箱"
        type="email"
        placeholder="其他标准 html input 类型"
      ></md-input-item>
    </md-field>
  </div>
</template>

<script>import {InputItem, Field} from 'mand-mobile'

export default {
  name: 'input-item-demo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  data() {
    return {
      phone: '13321234431',
      money: '',
      digit: '123',
    }
  },
}
</script>