<template>
  <div class="md-example-child md-example-child-dialog md-example-child-dialog-0">
    <md-button @click="basicDialog.open = true">基本</md-button>
    <md-button @click="iconDialog.open = true">带图标</md-button>
    <md-button @click="warnDialog.open = true">警示操作</md-button>
    <md-button @click="asyncDialog.open = true">异步操作</md-button>
    <md-button @click="actDialog.open = true">多操作</md-button>
    <md-button @click="slotDialog.open = true">插槽</md-button>

    <md-dialog
      title="窗口标题"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
    </md-dialog>

    <md-dialog
      icon="location"
      :closable="true"
      v-model="iconDialog.open"
      :btns="iconDialog.btns"
    >
      围在城里的人想逃出来，城外的人想冲进去，对婚姻也罢，职业也罢，人生的愿望大都如此。
    </md-dialog>

    <md-dialog
      title="警示操作"
      :closable="false"
      v-model="warnDialog.open"
      :btns="warnDialog.btns"
    >
      或是因为习惯了孤独，我们渴望被爱；又或是害怕爱而不得，我们最后仍然选择孤独。
    </md-dialog>

    <md-dialog
      :closable="false"
      v-model="asyncDialog.open"
      :btns="asyncDialog.btns"
    >
      每个人都有属于自己的一片森林，也许我们 从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。
    </md-dialog>

    <md-dialog
      title="窗口标题"
      :closable="false"
      layout="column"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      据说每个人需要一面镜子，可以常常自照，知道自己是个什么东西。不过，能自知的人根本不用照镜子；不自知的东西，照了镜子也没有用。
    </md-dialog>

    <md-dialog
      title="家"
      :closable="false"
      v-model="slotDialog.open"
      :btns="slotDialog.btns"
    >
      <div class="dialog-banner" slot="header">
        <img src="http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a" alt="">
      </div>
      虽然其中有一些争吵、不愉快、曲折，但重要的是一家人整整齐齐。
    </md-dialog>
  </div>
</template>

<script>import {Dialog, Button, Toast} from 'mand-mobile'

export default {
  name: 'dialog-demo',
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
  },
  data() {
    return {
      basicDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onBasicCancel,
          },
          {
            text: '确认操作',
            handler: this.onBasicConfirm,
          },
        ],
      },
      iconDialog: {
        open: false,
        btns: [
          {
            text: '确认操作',
            handler: this.onIconConfirm,
          },
        ],
      },
      warnDialog: {
        open: false,
        btns: [
          {
            text: '取消',
          },
          {
            text: '警示操作',
            warning: true,
            handler: this.onWarnConfirm,
          },
        ],
      },
      asyncDialog: {
        open: false,
        btns: [
          {
            text: '开始搜索',
            icon: 'search',
            handler: this.onAsyncConfirm,
          },
        ],
      },
      actDialog: {
        open: false,
        btns: [
          {
            text: '操作一',
            type: 'danger',
            handler: this.onActConfirm,
          },
          {
            text: '操作二',
            handler: this.onActConfirm,
            disabled: true,
          },
          {
            text: '操作三',
            handler: this.onActConfirm,
          },
        ],
      },
      slotDialog: {
        open: false,
        btns: [
          {
            text: '好的',
          },
        ],
      },
    }
  },
  methods: {
    onBasicConfirm() {
      Toast({
        content: '你点击了确认',
      })
      this.basicDialog.open = false
    },
    onBasicCancel() {
      Toast({
        content: '你点击了取消',
      })
      this.basicDialog.open = false
    },
    onIconConfirm() {
      Toast({
        content: '你点击了确认',
      })
      this.iconDialog.open = false
    },
    onActConfirm() {
      this.actDialog.open = false
    },
    onAsyncConfirm(btn) {
      this.$set(btn, 'loading', true)
      this.$set(btn, 'text', '搜索中')
      setTimeout(() => {
        this.asyncDialog.open = false
        this.$set(btn, 'loading', false)
        this.$set(btn, 'text', '开始搜索')
        Toast({
          content: '搜索成功',
        })
      }, 1500)
    },
  },
}
</script>

<style lang="stylus" scoped>
.dialog-banner
  img
    display block
    width 100%
</style>
