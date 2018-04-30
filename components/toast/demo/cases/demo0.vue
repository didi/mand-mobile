<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-0">
    <md-button @click="showTextToast">纯文字</md-button>
  </div>
</template>

<script>
import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '纯文字',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  methods: {
    showTextToast() {
      Toast.info('一段文字')
    },
  },
}

</script>
