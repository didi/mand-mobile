<template>
  <div class="md-example-child">
    <md-check-box
      v-model="selected"
      :options="options"
      :cols="2"
    >
      <div slot="content" slot-scope="{ option }" class="payment-gateway">
        <p v-text="option.label"></p>
        <p class="muted" v-text="option.desc"></p>
      </div>
    </md-check-box>
	</div>
</template>

<script>import {CheckBox} from 'mand-mobile'

export default {
  name: 'check-box-demo',
  title: '支付方式',
  describe: '',
  components: {
    [CheckBox.name]: CheckBox,
  },
  data() {
    return {
      selected: '',
      options: [{value: '1', label: '微信', desc: '减免1.2元'}, {value: '2', label: '支付宝', desc: '9.8折'}],
    }
  },
}
</script>

<style lang="stylus" scoped>
.payment-gateway
  text-align center
  font-size 0.32rem
.muted
  color #888
  font-size 0.24rem
</style>
