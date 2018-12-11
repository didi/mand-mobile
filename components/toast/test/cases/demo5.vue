<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-0">
  </div>
</template>

<script>import {Toast} from 'mand-mobile'

export default {
  name: 'toast-demo',
  mounted() {
    Toast({
      content: '自定义位置',
      position: 'bottom',
    })
  },
}
</script>
