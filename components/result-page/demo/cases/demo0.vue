<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-0">
    <md-result-page
      type="lost">
    </md-result-page>
  </div>
</template>

<script>
import {ResultPage} from 'mand-mobile'

export default {
  name: 'result-page-demo',
  /* DELETE */
  title: '404',
  /* DELETE */
  components: {
    [ResultPage.name]: ResultPage,
  },
}

</script>

<style lang="stylus">
.md-result-page.customized
  img
    height 131px
</style>