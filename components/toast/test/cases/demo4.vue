<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-3">
  </div>
</template>

<script>import {Toast} from 'mand-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.loading('载入中')
    setTimeout(() => {
      Toast.hide()
      setTimeout(() => {
        Toast.failed('载入失败')
      }, 10)
    }, 500)
  },
}
</script>
