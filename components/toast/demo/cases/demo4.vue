<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-3">
    <md-button @click="start">连续调用</md-button>
  </div>
</template>

<script>import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '连续调用',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  methods: {
    start() {
      Toast.loading('载入中')
      setTimeout(() => {
        Toast.hide()
        setTimeout(() => {
          Toast.failed('载入失败')
        }, 10)
      }, 500)
    },
  },
}
</script>
