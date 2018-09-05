<template>
  <div @click="goTo">
    Button
  </div>
</template>
<script>
  export default {
    methods: {
      goTo(name) {
        wx.navigateTo({
          url: 'button/demo/page'
        })
      }
    }
  }
</script>
<style>

</style>
