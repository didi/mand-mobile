<template>
  <div class="md-captcha" v-show="isView || value || visible">
    <template v-if="isView">
      <div class="md-captcha-content">
        <h2 class="md-captcha-title" v-if="title" v-text="title"></h2>
        <div class="md-captcha-error" v-text="errorMsg"></div>
        <div class="md-captcha-message">
          <slot></slot>
        </div>
        <md-button
          v-if="count"
          class="md-captcha-countbtn"
          type="ghost"
          size="small"
          v-text="countBtnText"
          :disabled="this.isCounting"
          @click="$_onResend"
        ></md-button>
      </div>
      <md-codebox
        ref="codebox"
        v-model="code"
        :maxlength="maxlength"
        :system="system"
        :closable="false"
        :isView="isView"
        :mask="mask"
        :autofocus="false"
        @submit="$_onSubmit"
      />
    </template>
    <template v-else>
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
          <div class="md-captcha-error" v-text="errorMsg"></div>
          <div class="md-captcha-message">
            <slot></slot>
          </div>
          <md-button
            v-if="count"
            class="md-captcha-countbtn"
            type="ghost"
            size="small"
            v-text="countBtnText"
            :disabled="this.isCounting"
            @click="$_onResend"
          ></md-button>
        </div>
        <md-codebox
          ref="codebox"
          v-model="code"
          :maxlength="maxlength"
          :system="system"
          :closable="false"
          :mask="mask"
          :autofocus="false"
          @submit="$_onSubmit"
        />
      </md-dialog>
    </template>
  </div>
</template>

<script>import Dialog from '../dialog'
import Codebox from '../codebox'
import Button from '../button'

export default {
  name: 'md-captcha',

  components: {
    [Dialog.name]: Dialog,
    [Codebox.name]: Codebox,
    [Button.name]: Button,
  },

  props: {
    title: {
      type: String,
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
    autoCountdown: {
      type: Boolean,
      default: true,
    },
    appendTo: {
      default: () => document.body,
    },
    count: {
      type: Number,
      default: 60,
    },
    countNormalText: {
      type: String,
      default: '发送验证码',
    },
    countActiveText: {
      type: String,
      default: '{$1}秒后重发',
    },
    isView: {
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
    }
  },

  watch: {
    value(val) {
      if (val) {
        this.code = ''
        if (!this.firstShown) {
          this.firstShown = true
          this.$_onResend()
        }
      }
    },
    code(val) {
      if (val && this.errorMsg) {
        this.errorMsg = ''
      }
    },
  },

  mounted() {
    if (this.appendTo && !this.isView) {
      this.appendTo.appendChild(this.$el)
    }
    if (this.value || this.isView) {
      this.firstShown = true
      this.$_onResend()
    }
  },

  beforeDestroy() {
    if (this.appendTo && !this.isView) {
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
    // MARK: public methods
    countdown() {
      if (!this.count) {
        return
      }
      clearInterval(this.__counter__)
      let i = this.count - 1
      this.isCounting = true
      this.countBtnText = this.countActiveText.replace('{$1}', i)
      /* istanbul ignore next */
      this.__counter__ = setInterval(() => {
        if (i === 1) {
          this.resetcount()
        } else {
          i--
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
        this.code = ''
      })
    },
  },
}
</script>

<style lang="stylus">
  .md-captcha
    .md-dialog .md-dialog-content
      margin-bottom number-keyboard-height
    .md-captcha-content
      text-align center
      margin-bottom 20px
      font-size 24px
      .md-captcha-title
        color color-text-base
        font-size 32px
        margin 0
      .md-captcha-error
        color #FF525D
        font-size 24px
        line-height 32px
        height 32px
        margin-bottom 12px
      .md-captcha-countbtn
        display inline-block
        padding-left 16px
        padding-right 16px
        margin 32px auto
        width auto
        min-width 130px
</style>
