<template>
  <div class="md-example-child md-example-child-dialog md-example-child-dialog-1"></div>
</template>

<script>import {Dialog} from 'mand-mobile'

export default {
  name: 'dialog-demo',
  components: {
    [Dialog.name]: Dialog,
  },
  methods: {
    alert() {
      Dialog.alert({
        title: '警告',
        content: '您正在进行非法操作',
        cancelText: '取消',
        confirmText: '确定',
        onConfirm: () => {},
      })
    },
    confirm() {
      Dialog.confirm({
        title: '确认',
        content: '请确认是否进行操作',
        confirmText: '确定',
        onConfirm: () => {},
      })
    },
    succeedConfirm() {
      Dialog.succeed({
        title: '成功',
        content: '恭喜您成功完成操作',
        confirmText: '确定',
        onConfirm: () => {},
      })
    },
    failedConfirm() {
      Dialog.failed({
        title: '失败',
        content: '操作失败，请稍后重试',
        confirmText: '确定',
        onConfirm: () => {},
      })
    },
  },
}
</script>
