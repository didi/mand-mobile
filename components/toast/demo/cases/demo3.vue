<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-3">
    <md-button @click="showLoadingToast">载入</md-button>
  </div>
</template>

<script>import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '载入',
  titleEnUS: 'Loading',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  methods: {
    showLoadingToast() {
      Toast.loading()
      setTimeout(() => {
        Toast.hide()
      }, 3000)
    },
  },
}
</script>
