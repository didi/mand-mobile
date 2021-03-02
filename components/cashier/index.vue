<template>
  <div class="md-cashier">
    <md-popup
      class="inner-popup"
      v-model="isCashierShow"
      position="bottom"
      :mask-closable="false"
      prevent-scroll-exclude=".choose-channel"
      prevent-scroll
      @show="$_onPopupShow"
      @hide="$_onPopupHide"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        :large-radius="largeRadius"
        only-close
        @cancel="$_onPopupCancel"
      ></md-popup-title-bar>
      <div class="md-cashier-container">
        <slot name="header" :scene="scene"></slot>

        <!-- Choose pay channel -->
        <div
          v-if="scene === 'choose'"
          class="md-cashier-block md-cashier-choose"
          :key="sceneKey">
          <md-cashier-channel
            ref="channel"
            :payment-title="paymentTitle"
            :payment-amount="paymentAmount"
            :payment-describe="paymentDescribe"
            :more-button-text="moreButtonText"
            :pay-button-text="payButtonText"
            :pay-button-disabled="payButtonDisabled"
            :channels="channels"
            :channelLimit="channelLimit"
            :default-index="defaultIndex"
            v-on="$listeners"
          >
            <slot name="channel"></slot>
            <template slot="button">
              <slot name="payButton"></slot>
            </template>
          </md-cashier-channel>
        </div>

        <!-- Captcha -->
        <div
          v-else-if="scene === 'captcha'"
          class="md-cashier-block md-cashier-captcha"
          :key="sceneKey">
          <md-captcha
            ref="captcha"
            :maxlength="sceneOption.captcha.maxlength"
            :count="sceneOption.captcha.count"
            :countNormalText="sceneOption.captcha.countNormalText"
            :countActiveText="sceneOption.captcha.countActiveText"
            :auto-countdown="sceneOption.captcha.autoCountdown"
            :brief="sceneOption.captcha.brief"
            is-view
            @send="sceneOption.captcha.onSend"
            @submit="sceneOption.captcha.onSubmit"
          >
            <div v-text="sceneOption.captcha.text"></div>
          </md-captcha>
        </div>

        <!-- Loaing, Success -->
        <div
          v-else-if="scene === 'loading' || scene === 'success'"
          class="md-cashier-block"
          :class="{
            'md-cashier-loading': scene === 'loading',
            'md-cashier-success': scene === 'success'
          }"
          :key="sceneKey">
          <div class="md-cashier-block-icon">
            <md-activity-indicator-rolling-success
              ref="rolling"
              :is-success="scene === 'success'"
            ></md-activity-indicator-rolling-success>
          </div>
          <div class="md-cashier-block-text">{{ scene === 'success' ? sceneOption.success.text : sceneOption.loading.text }}</div>
          <md-cashier-channel-button
            v-if="scene === 'success'"
            :actions="
              sceneOption.success.actions ||
              [{
                buttonText: sceneOption.success.buttonText,
                handler: sceneOption.success.handler
              }]
            "
          />
        </div>

        <!-- Fail -->
        <div
          v-else-if="scene === 'fail'"
          class="md-cashier-block md-cashier-fail"
          :key="sceneKey">
          <div class="md-cashier-block-icon">
            <md-icon name="warn-color"></md-icon>
          </div>
          <div class="md-cashier-block-text" v-text="sceneOption.fail.text"></div>
          <md-cashier-channel-button
            :actions="
              sceneOption.fail.actions ||
              [{
                buttonText: sceneOption.fail.buttonText,
                handler: sceneOption.fail.handler
              }]
            "
          />
        </div>

        <!-- Custom -->
        <div
          v-else-if="scene === 'custom'"
          class="md-cashier-block md-cashier-custom"
          :key="sceneKey">
          <slot name="scene"></slot>
        </div>

        <slot name="footer" :scene="scene"></slot>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import Captcha from '../captcha'
import Icon from '../icon'
import RollerSuccess from '../activity-indicator/roller-success'
import {noop, extend} from '../_util'
import {t} from '../_locale'
import Channel from './channel'
import ChannelButton from './channel-button'

export default {
  name: 'md-cashier',

  mixins: [popupMixin, popupTitleBarMixin],

  components: {
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Captcha.name]: Captcha,
    [Icon.name]: Icon,
    [RollerSuccess.name]: RollerSuccess,
    [Channel.name]: Channel,
    [ChannelButton.name]: ChannelButton,
  },

  props: {
    channels: {
      type: Array,
      default() {
        return []
      },
    },
    channelLimit: {
      type: Number,
      default: 2,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    paymentTitle: {
      type: String,
      default: t('md.cashier.payCash'), // 支付金额
    },
    paymentAmount: {
      type: String,
      default: '0.00',
    },
    paymentDescribe: {
      type: String,
      default: '',
    },
    payButtonText: {
      type: String,
      default: t('md.cashier.confirmPay'), // 确定支付
    },
    payButtonDisabled: {
      type: Boolean,
      default: false,
    },
    moreButtonText: {
      type: String,
      default: t('md.cashier.morePayWays'), // 更多支付方式
    },
    title: {
      default: t('md.cashier.pay'), // 支付
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
  },

  data() {
    return {
      isCashierShow: false,
      scene: 'choose', // choose, captcha, loading, success, fail
      sceneKey: Date.now(),
      sceneOption: {
        loading: {
          text: t('md.cashier.payResultSearch'), // 支付结果查询中...
        },
        success: {
          text: t('md.cashier.paySuccess'), // 支付成功
          buttonText: t('md.cashier.confirm'), // 我知道了
          handler: null,
        },
        fail: {
          text: t('md.cashier.payFail'), // 支付失败，请稍后重试
          buttonText: t('md.cashier.confirm'), // 我知道了
          handler: null,
        },
        captcha: {
          text: '',
          brief: '',
          maxlength: 4,
          count: 60,
          autoCountdown: true,
          onSend: noop,
          onSubmit: noop,
        },
      },
    }
  },

  watch: {
    value(val) {
      this.isCashierShow = val
    },
    isCashierShow(val) {
      this.$emit('input', val)
    },
  },

  created() {
    this.$_initialCashier()

    if (this.channels.length < 3) {
      this.isChannelShow = true
      this.isChannelActive = true
    }
  },

  methods: {
    // MARK: private methods
    $_initialCashier() {
      this.isCashierShow = this.value
    },
    $_resetCashier() {
      this.scene = 'choose'
      this.isChannelShow = false
      this.isChannelActive = false
    },
    // MARK: events handler, 如 $_onButtonClick
    $_onPopupShow() {
      this.$emit('show')
    },
    $_onPopupHide() {
      this.$_resetCashier()
      this.$emit('hide')
    },
    $_onPopupCancel() {
      this.isCashierShow = false
      this.$emit('cancel')
    },

    // MARK: public methods
    next(scene, option = {}) {
      if (this.sceneOption[scene]) {
        extend(this.sceneOption[scene], option)
      }
      this.scene = scene
      this.sceneKey = Date.now()
    },
  },
}
</script>

<style lang="stylus">
.md-cashier
  .md-popup-title-bar .md-popup-cancel
    .md-icon
      align-self flex-start
      margin-left h-gap-lg
  .md-popup-box
    background-color color-bg-inverse
    border-radius popup-title-bar-radius popup-title-bar-radius 0 0
  .md-cashier-container
    block()
    position relative
    background cashier-bg
    -webkit-touch-callout none
    -webkit-user-select none
    transition all .3s
    overflow hidden
    .md-cashier-block
      clearfix()
      .md-cashier-block-icon
        position relative
        left 50%
        float left
        width 100px
        height 100px
        margin-top 75px
        transform translateX(-50%)
        .md-activity-indicator-svg
          width 100px !important
          height 100px !important
      .md-cashier-block-text
        block()
        margin-top 20px
        margin-bottom 180px
        font-size font-minor-large
        color color-text-minor
        text-align center
      .md-cashier-block-btn
        block()
        padding 0 40px 40px
        box-sizing border-box
      // &.md-cashier-choose

      &.md-cashier-captcha
        .md-captcha
          block()
        .md-captcha-content
          margin-top 44px
          margin-bottom 20px
          color color-text-caption
        .md-codebox
          margin-bottom 26px
        .md-captcha-content,
        .md-captcha-message,
        .md-codebox,
        .md-captcha-footer
          margin-left 40px
          margin-right 40px
        .md-captcha-footer
          margin-bottom 44px

      &.md-cashier-fail
        .md-cashier-block-icon
          position relative
          text-align center
          line-height 100px
          .md-icon-warn-color
            position relative
            z-index 2
            color #FFF6F1
            width 100px
            height 100px
</style>
