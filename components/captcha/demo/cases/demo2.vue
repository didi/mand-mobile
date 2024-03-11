<template>
  <div class="md-example-child md-example-child-captcha">
    <md-field title="文案">
      <md-input-item title="标题" v-model="title"></md-input-item>
      <md-input-item title="插槽内容" v-model="content"></md-input-item>
      <md-input-item title="短信验证码" value="1234" readonly></md-input-item>
    </md-field>

    <md-field title="配置">
      <md-field-item title="发送N次后禁用发送按钮" customized align="right">
        <md-input-item v-model="useSendTimes"></md-input-item>
      </md-field-item>

      <md-field-item title="限制验证码长度" customized align="right">
        <md-switch v-model="limit"></md-switch>
      </md-field-item>

      <md-input-item
        title="验证码长度"
        type="tel"
        v-model="maxlength"
      ></md-input-item>

      <md-field-item title="采用掩码" customized align="right">
        <md-switch v-model="mask"></md-switch>
      </md-field-item>

      <md-field-item title="使用系统键盘" customized align="right">
        <md-switch v-model="system"></md-switch>
      </md-field-item>
    </md-field>
    <md-button @click="next">确定</md-button>

    <md-captcha
      ref="captcha"
      v-model="show"
      :title="title"
      :subtitle="subtitle"
      :maxlength="limit ? parseFloat(maxlength) : -1"
      :system="system"
      :mask="mask"
      :appendTo="appendTo"
      :type="'halfScreen'"
      :countNormalText="countNormalText"
      :disableSend="disableSend"
      @submit="submit"
      @show="onShow"
      @hide="onHide"
      @send="onSend"
    >
      <div class="soltDiv">
        验证码已发送至 <span class="phone">186****5407</span><span class="hint" @click="hintHandle">收不到验证码？</span>
      </div>
    </md-captcha>
    <md-dialog
      title="收不到短信验证码？"
      :closable="true"
      v-model="dialogConfig.open"
      :btns="dialogConfig.btns"
    >
      人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
    </md-dialog>
  </div>
</template>

<script>import {Button, Toast, Captcha, InputItem, Field, FieldItem, Switch, Dialog} from 'mand-mobile'
export default {
  name: 'captcha-demo',
  /* DELETE */
  title: '半屏自定义',
  titleEnUS: 'Customize',
  height: 650,
  /* DELETE */
  components: {
    [Button.name]: Button,
    [Captcha.name]: Captcha,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Switch.name]: Switch,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      show: false,
      appendTo: document.querySelector('.doc-demo-box-priview') || document.body,
      title: '输入短信验证码 完成验证',
      subtitle: '用于核验信息有效性及确定本人操作',
      content: '验证码已发送至 186****5407',
      countNormalText: '发送验证码',
      limit: true,
      maxlength: '4',
      mask: false,
      system: true,
      useSendTimes: 3,
      sendTimes: 0,
      disableSend: false,
      dialogConfig: {
        open: false,
        btns: [
          {
            text: '我知道了',
            handler: this.onConfirm,
          },
        ],
      },
    }
  },
  methods: {
    next() {
      this.show = true
    },
    submit(val) {
      const max = parseFloat(this.maxlength)
      setTimeout(() => {
        if (!this.limit || max < 0 || val.length === max) {
          if (val !== '1234') {
            this.$refs.captcha.setError('验证码错误，请重新输入')
          } else {
            this.show = false
            Toast({
              content: `你输入了${val}`,
            })
          }
        }
      }, 300)
    },
    onSend(cb) {
      // -------- 发送验证码成功 -------
      // 修改按钮文字
      if (this.sendTimes === 0) {
        this.countNormalText = '重新发送'
      }
      this.sendTimes += 1
      if (this.sendTimes > this.useSendTimes) {
        this.disableSend = true
        this.$refs.captcha.setError('发送次数已用完，请一小时后再试')
        return
      }
      const difference = this.useSendTimes - this.sendTimes
      if (this.sendTimes > 1 && difference !== 0) {
        Toast({
          content: `您还可以重发${difference}次`,
        })
      }
      // 倒计时开始
      cb()
      console.log('click resend button.')
    },
    onShow() {},
    onHide() {
      // this.show = false;
    },
    hintHandle() {
      this.dialogConfig.open = true
    },
    onConfirm() {
      this.dialogConfig.open = false
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-captcha
  padding 20px
  .md-field
    margin-bottom 40px
.soltDiv
  font-size captcha-font-size
  color captcha-color
  text-align left
  line-height 44px
  span.phone
    color #31383F
    font-weight bold
    margin-right 1em
  span.hint
    color: #198CFF
</style>
