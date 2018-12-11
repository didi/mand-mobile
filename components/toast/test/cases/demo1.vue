<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-1">
  </div>
</template>

<script>import {Toast} from 'mand-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.succeed('操作成功')
  },
}
</script>
