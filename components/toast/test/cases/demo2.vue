<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-2">
  </div>
</template>

<script>import {Toast} from 'mand-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.failed('操作失败')
  },
}
</script>
