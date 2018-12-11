<template>
  <div class="md-example-child md-example-child-input-item-5">
    <md-field>
      <md-input-item
        type="phone"
        title="手机号码"
        value="1999999999999"
        error="手机号码无效"
        clearable
      ></md-input-item>
      <md-input-item
        type="bankCard"
        title="储蓄卡号"
        v-model="bankCardNo"
        :key="bankCardKey"
        clearable
      >
        <p
          v-if="isError"
          class="error"
          slot="error"
        >
          不支持当前银行<span class="error-action">查看支持银行</span>
        </p>
      </md-input-item>
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
      bankCardNo: '',
      bankCardKey: Date.now(),
      isError: false,
    }
  },
}
</script>

<style lang="stylus">
.md-example-child-input-item-5
  .error
    float left
    width 100%
    .error-action
      float right
      color #5878B4
</style>
