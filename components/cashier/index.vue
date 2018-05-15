<template>
  <div class="md-cashier">
    <md-popup
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
        @cancel="$_onPopupCancel"
      >
        <md-icon name="cross" size="lg" slot="cancel"></md-icon>
      </md-popup-title-bar>
      <div
        class="md-cashier-container"
        :style="{maxHeight: `${sceneHeight}px`}"
      >
        <!-- Choose pay channel -->
        <div
          v-if="scene === 'choose'"
          class="md-cashier-block md-cashier-choose"
          :key="sceneKey">
          <div class="choose-text">
            <p class="choose-title" v-if="paymentTitle" v-html="paymentTitle"></p>
            <p class="choose-number" v-if="paymentAmount" v-html="paymentAmount"></p>
            <p class="choose-describe" v-if="paymentDescribe" v-html="paymentDescribe"></p>
          </div>
          <div class="choose-channel" :class="{active: isChannelActive}">
            <ul class="choose-channel-list" v-if="isChannelShow">
              <li class="choose-channel-item"
                v-for="(item, index) in channels"
                :class="{default: index === defaultIndex}"
                :key="index"
                @click="$_onChannelItemClick(item, index)">
                <i class="item-icon" :class="item.icon">
                  <md-icon :name="item.icon"></md-icon>
                </i>
                <span class="item-label" v-html="item.text || item.label"></span>
                <md-icon name="circle-right" class="item-check" v-if="index === activeChannelIndex"></md-icon>
                <md-icon name="circle" class="item-check" v-else></md-icon>
              </li>
            </ul>
            <ul class="choose-channel-list" v-else-if="channels[defaultIndex]">
              <li class="choose-channel-item default" @click="$_onChannelItemClick(channels[defaultIndex], index)">
                <i class="item-icon" :class="channels[defaultIndex].icon">
                  <md-icon :name="channels[defaultIndex].icon"></md-icon>
                </i>
                <span class="item-label" v-html="channels[defaultIndex].text || channels[defaultIndex].label"></span>
                <md-icon name="circle-right" class="item-check"></md-icon>
              </li>
            </ul>
            <div
              v-if="channels.length"
              class="choose-channel-more"
              :class="{disabled: isChannelActive}"
              @click="$_onChannelMore"
            >更多支付方式</div>
          </div>
          <div class="md-cashier-block-btn">
            <md-button class="md-cashier-pay-button" @click="$_onChannelBtnClick">确定支付</md-button>
          </div>
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
            <md-cashier-rolling ref="rolling" :is-success="scene === 'success'"></md-cashier-rolling>
          </div>
          <div class="md-cashier-block-text">{{ scene === 'success' ? sceneOption.success.text : sceneOption.loading.text }}</div>
          <div class="md-cashier-block-btn" v-if="scene === 'success'">
            <md-button @click="isCashierShow = false">我知道了</md-button>
          </div>
        </div>

        <!-- Fail -->
        <div
          v-else-if="scene === 'fail'"
          class="md-cashier-block md-cashier-fail"
          :key="sceneKey">
          <div class="md-cashier-block-icon">
            <md-icon name="circle-alert"></md-icon>
          </div>
          <div class="md-cashier-block-text" v-text="sceneOption.fail.text"></div>
          <div class="md-cashier-block-btn">
            <md-button @click="isCashierShow = false">我知道了</md-button>
          </div>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import Captcha from '../captcha'
import Button from '../button'
import Icon from '../icon'
import Rolling from './rolling'
import {noop, extend} from '../_util'

const BLOCK_MAX_HEIGHT = 1000

export default {
  name: 'md-cashier',

  components: {
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Captcha.name]: Captcha,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Rolling.name]: Rolling,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    channels: {
      type: Array,
      default() {
        return []
      },
      validator(val) {
        return !!val.length
      },
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '\u652f\u4ed8', // 支付
    },
    paymentTitle: {
      type: String,
      default: '\u652f\u4ed8\u91d1\u989d', // 支付金额
    },
    paymentAmount: {
      type: String,
      default: '0.00',
    },
    paymentDescribe: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isCashierShow: false,
      isChannelShow: false,
      isChannelActive: false,
      activeChannelIndex: -1,
      scene: 'choose', // choose, captcha, loading, success, fail
      sceneKey: Date.now(),
      sceneHeight: BLOCK_MAX_HEIGHT,
      sceneOption: {
        loading: {
          text: '\u652f\u4ed8\u7ed3\u679c\u67e5\u8be2\u4e2d\u002e\u002e\u002e', // 支付结果查询中...
        },
        success: {
          text: '\u652f\u4ed8\u6210\u529f', // 支付成功
        },
        fail: {
          text: '\u652f\u4ed8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5', // 支付失败，请稍后重试
        },
        captcha: {
          text: '',
          maxlength: 4,
          count: 60,
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
    defaultIndex(val) {
      this.activeChannelIndex = val
    },
    isCashierShow(val) {
      this.$emit('input', val)
    },
  },

  created() {
    this.$_initialCashier()
  },

  methods: {
    // MARK: private methods
    $_initialCashier() {
      this.activeChannelIndex = this.defaultIndex
      this.isCashierShow = this.value
    },
    $_resetCashier() {
      this.scene = 'choose'
      this.sceneHeight = BLOCK_MAX_HEIGHT
      this.isChannelShow = false
      this.isChannelActive = false
    },
    $_doAnimate() {
      this.$nextTick(() => {
        const block = this.$el.querySelector('.md-cashier-block')
        this.sceneHeight = block ? block.clientHeight : BLOCK_MAX_HEIGHT
      })
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onChannelItemClick(item, index) {
      this.activeChannelIndex = index
      this.$emit('select', item)
    },
    $_onChannelBtnClick() {
      const item = this.channels[this.activeChannelIndex]
      this.$emit('pay', item)
    },
    $_onChannelMore() {
      if (this.isChannelActive) {
        return
      }
      this.isChannelShow = true
      this.$nextTick(() => {
        this.isChannelActive = true
      })
    },
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
      this.$_doAnimate()
    },
  },
}
</script>

<style lang="stylus">
block()
  float left
  width 100%
.md-cashier
  .md-popup-title-bar
    .md-icon-cross
      color color-text-base
  .md-popup-box
    background-color color-bg-base
  .md-cashier-container
    block()
    background color-bg-base
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
      .md-cashier-block-text
        block()
        margin-top 20px
        margin-bottom 180px
        font-size font-minor-large
        color color-text-minor
        text-align center
      .md-cashier-block-btn
        block()
        padding 0 20px 20px
        box-sizing border-box
      &.md-cashier-choose
        .choose-text
          clearfix()
          padding 65px 0
          hairline(bottom, color-border-minor)
          p
            block()
            text-align center
            &.choose-title
              font-size font-body-normal
              color color-text-minor
            &.choose-number
              margin-top 35px
              font-size 72px
              color color-text-base
            &.choose-describe
              margin-top 15px
              font-size font-minor-normal
              color color-text-minor
        .choose-channel
          clearfix()
          max-height 500px
          padding 40px 120px
          box-sizing border-box
          overflow auto
          .choose-channel-list
            clearfix()
            max-height 64px
            transition all .5s ease-in
            overflow hidden
            .choose-channel-item
              block()
              position relative
              padding 15px 40px 15px 0
              font-size font-minor-large
              color color-text-minor
              box-sizing border-box
              .item-icon
                float left
                width 32px
                height 32px
              .item-label
                float left
                margin-left h-gap-sm
              .item-check
                position absolute
                top 50%
                right 0
                transform translateY(-50%)
                &.md-icon-circle-right
                  color color-primary
          .choose-channel-more
            margin-top 10px
            font-size font-minor-large
            color color-text-minor
            text-align center
            &:after
              content ""
              position relative
              top 20px
              width 0
              height 0
              margin-left 10px
              border-left solid 8px transparent
              border-right solid 8px transparent
              border-top solid 8px color-text-caption
            &.disabled
              visibility hidden
          &.active
            .choose-channel-list .choose-channel-item
              display block
            .choose-channel-list
              max-height 1000px !important
      &.md-cashier-captcha
        .md-captcha
          block()
        .md-captcha-content
          margin-top 44px
          color color-text-caption
        .md-codebox
          margin-bottom 26px
      &.md-cashier-fail
        .md-cashier-block-icon
          position relative
          .md-icon-circle-alert
            position relative
            z-index 2
            width 100% !important
            height 100% !important
            color #FFF6F1
          &:after
            content ""
            position absolute
            left 20%
            top 20%
            width 60%
            height 60%
            background #494C5B
</style>
