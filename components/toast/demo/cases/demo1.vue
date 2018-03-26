<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-1">
    <md-button @click.native="showSucceedToast">成功</md-button>
  </div>
</template>

<script>import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  title: '成功',
  components: {
    [Button.name]: Button,
  },
  methods: {
    showSucceedToast() {
      Toast.succeed('操作成功')
    },
  },
}
</script>
