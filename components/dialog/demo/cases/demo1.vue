<template>
  <div class="md-example-child md-example-child-dialog md-example-child-dialog-1">
    <md-button @click="alert">警告弹窗</md-button>
    <md-button @click="confirm">确认弹窗</md-button>
    <md-button @click="succeedConfirm">成功弹窗</md-button>
    <md-button @click="failedConfirm">失败弹窗</md-button>
  </div>
</template>

<script>import {Dialog, Button} from 'mand-mobile'

export default {
  name: 'dialog-demo',
  /* DELETE */
  title: '静态方法',
  /* DELETE */
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
  },
  methods: {
    alert() {
      Dialog.alert({
        title: '警告',
        content: '您正在进行非法操作',
        cancelText: '取消',
        confirmText: '确定',
        onConfirm: () => console.log('[Dialog.alert] confirm clicked'),
      })
    },
    confirm() {
      Dialog.confirm({
        title: '确认',
        content: '请确认是否进行操作',
        confirmText: '确定',
        onConfirm: () => console.log('[Dialog.confirm] confirm clicked'),
      })
    },
    succeedConfirm() {
      Dialog.succeed({
        title: '成功',
        content: '恭喜您成功完成操作',
        confirmText: '确定',
        onConfirm: () => console.log('[Dialog.succeed] confirm clicked'),
      })
    },
    failedConfirm() {
      Dialog.failed({
        title: '失败',
        content: '操作失败，请稍后重试',
        confirmText: '确定',
        onConfirm: () => console.log('[Dialog.failed] confirm clicked'),
      })
    },
  },
}
</script>
