<template>
  <div class="md-example-child md-example-child-captcha-2">
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
      :disableSend="disableSend"
      @submit="submit"
      @show="onShow"
      @hide="onHide"
      @send="onSend"
    >
      <div class="soltDiv">{{ content }}</div>
    </md-captcha>
  </div>
</template>

<script>
import { Captcha } from "mand-mobile";
export default {
  name: "captcha-demo",
  components: {
    [Captcha.name]: Captcha
  },
  data() {
    return {
      show: true,
      appendTo:
        document.querySelector(".doc-demo-box-priview") || document.body,
      title: "输入短信验证码，完成验证",
      subtitle: "用于核验信息有效性",
      content: "验证码已发送至 186****5407",
      limit: true,
      maxlength: "4",
      mask: false,
      system: false,
      useSendTimes: 3,
      sendTimes: 0,
      disableSend: false,
    };
  },
  methods: {
    submit(val) {
      const max = parseFloat(this.maxlength);
      setTimeout(() => {
        if (!this.limit || max < 0 || val.length === max) {
          if (val !== "1234") {
            this.$refs.captcha.setError("验证码错误，请重新输入");
          } else {
            this.show = false;
          }
        }
      }, 300);
    },
    onSend(cb) {
      this.sendTimes +=1
      if (this.sendTimes > this.useSendTimes) {
        this.disableSend = true
        this.$refs.captcha.setError("发送次数已用完，请一小时后再试");
        return
      }
      cb()
      console.log("click resend button.");
    },
    onShow() {},
    onHide() {
      // this.show = false;
    }
  }
};
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
</style>
