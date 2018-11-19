<template>
  <div class="md-cashier-channel">
    <div class="choose-text">
      <p class="choose-title" v-if="paymentTitle" v-html="paymentTitle"></p>
      <p class="choose-number" v-if="paymentAmount" v-html="paymentAmount"></p>
      <p class="choose-describe" v-if="paymentDescribe" v-html="paymentDescribe"></p>
    </div>
    <div class="choose-channel" :class="{active: isChannelActive}">
      <div class="choose-channel-list" v-if="isChannelShow || isSingle">
        <template v-for="(item, index) in channels">
          <md-cashier-channel-item
            :class="{default: index === defaultIndex}"
            :key="index"
            :data="item"
            :active="index === activeChannelIndex"
            @click.native="$_onChannelItemClick(item, index)"
          />
        </template>
      </div>
      <div class="choose-channel-list" v-else-if="channels[defaultIndex]">
        <md-cashier-channel-item
          class="default"
          :data="channels[defaultIndex]"
          active
          @click.native="$_onChannelItemClick(channels[defaultIndex], defaultIndex)"
        />
      </div>
      <div
        v-if="!isSingle"
        class="choose-channel-more"
        :class="{disabled: isChannelActive}"
        v-html="moreButtonText"
        @click="$_onChannelMoreClick"
      ></div>
    </div>
    <div class="md-cashier-block-btn">
      <md-button
        class="md-cashier-pay-button"
        :type="payButtonDisabled ? 'disabled': 'primary'"
        v-html="payButtonText"
        @click="$_onChannelBtnClick"
      ></md-button>
    </div>
  </div>
</template>

<script>import Button from '../button'
import Icon from '../icon'
import ChannelItem from './channel-item'

export default {
  name: 'md-cashier-channel',

  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ChannelItem.name]: ChannelItem,
  },

  props: [
    'paymentTitle',
    'paymentAmount',
    'paymentDescribe',
    'moreButtonText',
    'payButtonText',
    'payButtonDisabled',
    'channels',
    'defaultIndex',
  ],

  data() {
    return {
      isChannelShow: false,
      isChannelActive: false,
      activeChannelIndex: -1,
    }
  },

  created() {
    // console.log(this.$listeners.select)
    this.activeChannelIndex = this.defaultIndex
  },

  computed: {
    isSingle() {
      return !(this.channels.length > 2)
    },
  },

  watch: {
    defaultIndex(val) {
      this.activeChannelIndex = val
    },
  },

  methods: {
    $_onChannelItemClick(item, index) {
      if (item.disabled) {
        return
      }
      this.activeChannelIndex = index
      this.$emit('select', item)
    },
    $_onChannelMoreClick() {
      if (this.isChannelActive) {
        return
      }
      this.isChannelShow = true
      this.$nextTick(() => {
        this.isChannelActive = true
      })
    },
    $_onChannelBtnClick() {
      const item = this.channels[this.activeChannelIndex]
      this.$emit('pay', item)
    },
  },
}
</script>

<style lang="stylus">
.md-cashier-channel
  .choose-text
    clearfix()
    position relative
    padding 65px 0
    hairline(bottom, color-border-minor)
    p
      block()
      text-align center
      &.choose-title
        font-size cashier-choose-title-font-size
        color cashier-choose-title-color
      &.choose-number
        margin-top 25px
        font-size cashier-choose-amount-font-size
        font-family DINPro-Medium
        color cashier-choose-amount-color
      &.choose-describe
        margin-top 15px
        font-size cashier-choose-describe-font-size
        color cashier-choose-describe-color
  .choose-channel
    clearfix()
    max-height 500px
    padding 40px 60px
    box-sizing border-box
    overflow auto
    .choose-channel-list
      clearfix()
      // max-height 64px
      transition all .5s ease-in
      overflow hidden
      
    .choose-channel-more
      margin-top 10px
      font-size cashier-choose-more-font-size
      color cashier-choose-more-color
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
</style>
