<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-0">
    <md-button @click="showTextToast">自定义位置</md-button>
  </div>
</template>

<script>import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '自定义位置',
  titleEnUS: 'Customize location',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  methods: {
    showTextToast() {
      Toast({
        content: '自定义位置',
        position: 'bottom',
      })
    },
  },
}
</script>
