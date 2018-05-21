<template>
  <div class="md-example-child md-example-child-dialog md-example-child-dialog-0">
    <md-button @click="basicDialog.open = true">基本</md-button>
    <md-button @click="iconDialog.open = true">带图标</md-button>
    <md-button @click="actDialog.open = true">多操作</md-button>

    <md-dialog
      title="窗口标题"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
    </md-dialog>

    <md-dialog
      icon="circle-right"
      title="窗口标题"
      :closable="true"
      v-model="iconDialog.open"
      :btns="iconDialog.btns"
    >
      围在城里的人想逃出来，城外的人想冲进去，对婚姻也罢，职业也罢，人生的愿望大都如此。
    </md-dialog>

    <md-dialog
      title="窗口标题"
      :closable="false"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      据说每个人需要一面镜子，可以常常自照，知道自己是个什么东西。不过，能自知的人根本不用照镜子；不自知的东西，照了镜子也没有用。
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
      actDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onActCancel,
          },
          {
            text: '确认操作',
            handler: this.onActConfirm,
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
    onIconConfirm() {
      Toast({
        content: '你点击了确认',
      })
      this.iconDialog.open = false
    },
    onActCancel() {
      Toast({
        content: '你点击了取消',
      })
      this.actDialog.open = false
    },
    onActConfirm() {
      Toast({
        content: '你点击了确认',
      })
      this.actDialog.open = false
    },
  },
}
</script>
