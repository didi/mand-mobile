<template>
  <div class="md-example-child md-example-child-cashier">
    <md-button @click="isCashierhow = !isCashierhow">{{ isCashierhow ? '收起收银台' : '唤起收银台' }}</md-button>
    <md-cashier
      ref="cashier"
      v-model="isCashierhow"
      :channels="cashierChannels"
      :payment-amount="cashierAmount"
      payment-describe="关于支付金额的特殊说明"
      @show="onCashierShow"
      @select="onCashierSelect"
      @pay="onCashierPay"
      @cancel="onCashierCancel"
    >
      <div slot-scope="{ scene }" slot="header">
        <md-notice-bar
          v-if="scene === 'choose'"
          mode="closable"
          icon="warn"
          type="warning"
        >
          该银行3:00-12:00系统维护，请更换其他银行卡
        </md-notice-bar>
      </div>
      <div slot-scope="{ scene }" slot="footer">
        <div v-if="scene === 'choose' && !isCashierInitialed" class="cashier-loading">
          <md-activity-indicator :size="30" vertical>加载中...</md-activity-indicator>
        </div>
      </div>
      <div slot="payButton" style="display:flex;">
        <md-icon name="checked"></md-icon>发起支付
      </div>
      <div slot="scene" class="custom-scene">
        Custom Scene
      </div>
    </md-cashier>
	</div>
</template>

<script>import {Button, Icon, Cashier, Toast, NoticeBar, ActivityIndicator} from 'mand-mobile'

export default {
  name: 'cashier-demo',
  /* DELETE */
  height: 700,
  title: '使用插槽及其他配置',
  titleEnUS: 'Using slots and other configurations',
  /* DELETE */
  components: {
    [Button.name]: Button,
    [Cashier.name]: Cashier,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [ActivityIndicator.name]: ActivityIndicator,
  },
  data() {
    return {
      isCashierhow: false,
      isCashierInitialed: false,
      isCashierCaptcha: false,
      cashierAmount: '100.00',
      cashierResult: 'success',
      cashierResults: [
        {
          text: '支付成功',
          value: 'success',
        },
        {
          text: '支付失败',
          value: 'fail',
        },
      ],
      cashierChannels: [
        {
          img: 'https://pt-starimg.didistatic.com/static/starimg/img/rZBbFoIJEJ1546934427562.png',
          text: 'XX银行(1234)',
          desc: '当前银行维护中',
          value: '001',
          disabled: true,
          action: {
            text: '更换',
            handler: () => {
              Toast.info('点击更换银行卡')
            },
          },
        },
      ],
    }
  },
  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
  methods: {
    doPay() {
      if (this.isCashierCaptcha) {
        this.cashier.next('captcha', {
          text: 'Verification code sent to 156 **** 8965',
          autoCountdown: false,
          countNormalText: 'Send Verification code',
          countActiveText: 'Retransmission after {$1}s',
          onSend: countdown => {
            console.log('[Mand Mobile] Send Captcha')
            this.sendCaptcha().then(() => {
              countdown()
            })
          },
          onSubmit: code => {
            console.log(`[Mand Mobile] Send Submit ${code}`)
            this.checkCaptcha(code).then(res => {
              if (res) {
                this.createPay().then(() => {
                  this.cashier.next(this.cashierResult)
                })
              }
            })
          },
        })
      } else {
        this.createPay().then(() => {
          this.cashier.next(this.cashierResult, {
            actions: [
              {
                buttonText: '返回',
                handler: () => {
                  this.cashier.next('choose')
                },
              },
              {
                buttonText: '重试',
                handler: () => {
                  this.cashier.next('custom')
                },
              },
            ],
          })
        })
      }
    },
    // Create a pay request & check pay result
    createPay() {
      this.cashier.next('loading')
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    // Create a captcha sending request
    sendCaptcha() {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 200)
      })
    },
    // Create a captcha checking request
    checkCaptcha(code) {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve(!!code)
        }, 200)
      })
    },
    onCashierShow() {
      setTimeout(() => {
        this.isCashierInitialed = true
      }, 2000)
    },
    onCashierSelect(item) {
      console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
    },
    onCashierPay(item) {
      console.log(`[Mand Mobile] Pay ${JSON.stringify(item)}`)
      this.doPay()
    },
    onCashierCancel() {
      // Abort pay request or checking request
      this.timer && clearTimeout(this.timer)
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-cashier
  .md-field
    margin-bottom 30px
  .custom-scene
    min-height 300px
    display flex
    justify-content center
    align-items center
    font-size 32px
  .cashier-loading
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background rgba(255, 255, 255, 0.95)
    z-index 1400
    display flex
    align-items center
    justify-content center
</style>
