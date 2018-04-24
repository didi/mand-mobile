<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-2">
    <md-button @click="showSucceedToast">失败</md-button>
  </div>
</template>

<script>import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  title: '失败',
  components: {
    [Button.name]: Button,
  },
  methods: {
    showSucceedToast() {
      Toast.failed('操作失败')
    },
  },
}
</script>
