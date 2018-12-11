<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-0">
  </div>
</template>

<script>import {Toast} from 'mand-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.info('一段文字')
  },
}
</script>
