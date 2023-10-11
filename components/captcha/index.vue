<template>
  <div class="md-captcha" v-show="isInline || value || visible">
    <template v-if="isInline">
      <div class="md-captcha-content">
        <h2 class="md-captcha-title" v-if="title" v-text="title"></h2>
        <div class="md-captcha-message">
          <slot></slot>
        </div>
      </div>
      <md-codebox
        ref="codebox"
        v-model="code"
        :maxlength="maxlength"
        :system="system"
        :mask="mask"
        @submit="$_onSubmit"
        :closable="false"
        :isView="true"
        :justify="true"
        :autofocus="false"
        :input-type="inputType"
      >
        <footer class="md-captcha-footer">
          <div class="md-captcha-error" v-if="errorMsg" v-text="errorMsg"></div>
          <div class="md-captcha-brief" v-else v-text="brief"></div>
          <button
            class="md-captcha-btn"
            v-if="count"
            v-text="countBtnText"
            :disabled="this.isCounting"
            @click="$_onResend"
          ></button>
        </footer>
      </md-codebox>
    </template>
    <template v-if="type === 'halfScreen'">
      <md-popup
        :value="value"
        :hasMask="true"
        position="bottom"
        :maskClosable="false"
        @input="$_onInput"
        @show="$_onShow"
        @hide="$_onHide"
      >
        <div class="md-captcha-half-container">
          <md-popup-title-bar
            only-close
            large-radius
            :title="title"
            :describe="subtitle"
            title-align="left"
            @cancel="close"
          ></md-popup-title-bar>
          <div class="md-captcha-half-content">
            <slot></slot>
          </div>
          <md-codebox
            ref="codebox"
            v-model="code"
            :maxlength="maxlength"
            :system="system"
            :mask="mask"
            @submit="$_onSubmit"
            :disabled="disableSend"
            :closable="false"
            :isView="true"
            :justify="true"
            :autofocus="false"
            :input-type="inputType"
            :isErrorStyle="isShowErrorStyle"
          >
            <footer
              class="md-captcha-footer"
              :class="{ halfStyle: isKeyboard }"
            >
              <div
                class="md-captcha-error"
                v-if="errorMsg"
                v-text="errorMsg"
              ></div>
              <div class="md-captcha-brief" v-else v-text="brief"></div>
              <button
                class="md-captcha-btn"
                :class="[disableSend && 'is-disabled-send']"
                v-if="count"
                v-text="countBtnText"
                :disabled="this.isCounting"
                @click="$_onResend"
              ></button>
            </footer>
          </md-codebox>
        </div>
      </md-popup>
    </template>
    <template v-if="type === 'dialog'">
      <md-dialog
        :value="value"
        :closable="true"
        :appendTo="false"
        position="center"
        @input="$_onInput"
        @show="$_onShow"
        @hide="$_onHide"
      >
        <div class="md-captcha-content">
          <h2 class="md-captcha-title" v-if="title" v-text="title"></h2>
          <div class="md-captcha-message">
            <slot></slot>
          </div>
        </div>
        <md-codebox
          ref="codebox"
          v-model="code"
          :maxlength="maxlength"
          :system="system"
          :closable="false"
          :mask="mask"
          :justify="true"
          :autofocus="false"
          :input-type="inputType"
          @submit="$_onSubmit"
        >
          <footer class="md-captcha-footer">
            <div class="md-captcha-error" v-if="errorMsg" v-text="errorMsg"></div>
            <div class="md-captcha-brief" v-else v-text="brief"></div>
            <button
              class="md-captcha-btn"
              v-if="count"
              v-text="countBtnText"
              :disabled="this.isCounting"
              @click="$_onResend"
            ></button>
          </footer>
        </md-codebox>
      </md-dialog>
    </template>
  </div>
</template>

<script>import Dialog from '../dialog'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import Codebox from '../codebox'
import Button from '../button'
import {mdDocument} from '../_util'
import {t} from '../_locale'

export default {
  name: 'md-captcha',

  components: {
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    [PopupTitlebar.name]: PopupTitlebar,
    [Codebox.name]: Codebox,
    [Button.name]: Button,
  },

  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    brief: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [Number, String],
      default: 4,
    },
    mask: {
      type: Boolean,
      default: false,
    },
    system: {
      type: Boolean,
      default: false,
    },
    autoSend: {
      type: Boolean,
      default: true,
    },
    autoCountdown: {
      type: Boolean,
      default: true,
    },
    appendTo: {
      default: () => mdDocument.body,
    },
    count: {
      type: Number,
      default: 60,
    },
    countNormalText: {
      type: String,
      default: t('md.captcha.sendCaptcha'),
    },
    countActiveText: {
      type: String,
      default: t('md.captcha.countdown'),
    },
    isView: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'dialog',
    },
    inputType: {
      type: String,
      default: 'tel',
    },
    disableSend: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      code: '',
      visible: false,
      errorMsg: '',
      isCounting: false,
      firstShown: false,
      countBtnText: this.countNormalText,
      isKeyboard: false,
      originHeight: 0,
    }
  },

  watch: {
    value(val) {
      if (val) {
        this.code = ''
        if (!this.firstShown) {
          this.firstShown = true
          this.$_emitSend()
        }
      }
    },
    code(val) {
      if (val && this.errorMsg) {
        this.errorMsg = ''
      }
    },
  },
  computed: {
    isInline() {
      return this.isView || this.type === 'inline'
    },
    isShowErrorStyle() {
      return this.errorMsg !== '' && !this.disableSend
    },
  },
  mounted() {
    // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
    if (this.judgeDeviceType().isAndroid && this.type === 'halfScreen') {
      // 记录初始高度
      this.originHeight = document.documentElement.clientHeight || document.body.clientHeight
      window.addEventListener('resize', this.listenResize, false)
    }
    if (this.appendTo && !this.isInline) {
      this.appendTo.appendChild(this.$el)
    }
    if (this.value || this.isInline) {
      this.firstShown = true
      this.$_emitSend()
    }
  },

  beforeDestroy() {
    if (this.judgeDeviceType().isAndroid && this.type === 'halfScreen') {
      window.removeEventListener('resize', this.listenResize)
    }
    if (this.appendTo && !this.isInline) {
      this.appendTo.removeChild(this.$el)
    }
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onInput(val) {
      this.$emit('input', val)
    },
    $_onShow() {
      this.visible = true
      this.$refs.codebox.focus()
      this.$emit('show')
    },
    $_onHide() {
      this.visible = false
      this.$refs.codebox.blur()
      this.$emit('hide')
    },
    $_onSubmit(code) {
      this.$emit('submit', code)
    },
    $_onResend() {
      if (this.autoCountdown) {
        this.countdown()
      }
      this.$emit('send', this.countdown)
    },
    $_emitSend() {
      this.autoSend && this.$_onResend()
    },
    // MARK: public methods
    listenResize() {
      let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (this.originHeight < resizeHeight) {
        this.isKeyboard = false
      } else {
        this.isKeyboard = true
      }
      this.originHeight = resizeHeight
    },
    // 判断设备类型
    judgeDeviceType() {
      let ua = window.navigator.userAgent.toLocaleLowerCase()
      let isIOS = /iphone|ipad|ipod/.test(ua)
      let isAndroid = /android/.test(ua)
      return {
        isIOS: isIOS,
        isAndroid: isAndroid,
      }
    },
    countdown() {
      if (!this.count) {
        return
      }
      clearInterval(this.__counter__)
      const timestamp = Date.now()
      let i = this.count
      this.isCounting = true
      this.countBtnText = this.countActiveText.replace('{$1}', i)
      /* istanbul ignore next */
      this.__counter__ = setInterval(() => {
        if (i <= 1) {
          this.resetcount()
        } else {
          i = this.count - Math.floor((Date.now() - timestamp) / 1000)
          this.countBtnText = this.countActiveText.replace('{$1}', i)
        }
      }, 1000)
    },
    resetcount() {
      this.isCounting = false
      this.countBtnText = this.countNormalText
      clearInterval(this.__counter__)
    },
    setError(msg) {
      this.$nextTick(() => {
        this.errorMsg = msg
        // this.code = ''
      })
    },
    close() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="stylus">
.md-captcha
  .md-dialog
    .md-popup
      z-index captcha-zindex
    .md-dialog-body
      padding 60px 60px 30px 60px
    .md-dialog-content
      margin-bottom number-keyboard-height
  .md-codebox
    margin-bottom 28px

.md-captcha-content
  font-size captcha-font-size
  color captcha-color
  text-align center
  line-height 1.2
  margin-bottom 50px

.md-captcha-title
  color captcha-title-color
  font-size captcha-title-font-size
  font-weight normal
  line-height 1.15
  margin 0 0 16px 0

.md-captcha-footer
  margin 28px 0
  display flex
  font-size captcha-footer-font-size
  justify-content space-between
  align-items center
  overflow hidden

.md-captcha-error, .md-captcha-brief
  flex 1 1 0%
.md-captcha-error
  color captcha-error-color
.md-captcha-brief
  color captcha-brief-color

.md-captcha-btn
  display inline-block
  color captcha-btn-color
  font-size captcha-footer-font-size
  padding 0
  margin 0 0 0 12px
  border 0
  border-radius 0
  background none
  &:disabled
    color color-text-disabled
// 半屏样式
.md-captcha-half-container
  background-color #fff
  border-radius 40px 40px 0 0
  .md-popup-title-bar
    height auto !important
    margin-bottom 24px
    .title-bar-title
      .title
        font-weight bold
        line-height 56px
      p.describe
        font-size 24px !important
        color #91989F !important
        line-height 33px !important
        margin-top: 4px !important
  .md-captcha-half-content
    padding 0px 40px
  .md-codebox-wrapper
    .md-codebox
      padding 75px 40px 0px
      margin 0px
    .md-captcha-footer
      padding 32px 40px 745px
      margin 0px
      &.halfStyle
        padding-bottom 40px
      .md-captcha-btn
        padding 5px 16px
        background-color color-primary
        border-radius radius-medium
        color color-text-base-inverse
        &:disabled
          color #61686F
          background none
          border-radius inherit
          padding 10px 0px
        &.is-disabled-send
          background rgba(145,152,159,0.1)
          color #61686F
</style>
