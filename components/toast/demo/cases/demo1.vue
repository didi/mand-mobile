<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-1">
    <md-button @click="showSucceedToast">成功</md-button>
  </div>
</template>

<script>
import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '成功',
  titleEnUS: 'Success',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  methods: {
    showSucceedToast() {
      Toast.succeed('还没有绑卡，请前往绑卡')
    },
  },
}

</script>
