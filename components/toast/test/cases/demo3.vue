<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-3">
  </div>
</template>

<script>import {Toast} from 'mand-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast.loading('加载中...')
  },
}
</script>
