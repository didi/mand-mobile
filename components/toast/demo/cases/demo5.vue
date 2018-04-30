<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-1">
    <md-button @click="showToast">长文字</md-button>
  </div>
</template>

<script>import {Toast, Button} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '长文字',
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  methods: {
    showToast() {
      Toast.succeed('文字部分最多展示十二个字最多展示两行')
    },
  },
}
</script>
