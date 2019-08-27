<template>
  <div class="md-example">
    <md-skeleton title :loading="loading">
    </md-skeleton>
  </div>
</template>

<script>import {Skeleton} from 'mand-mobile'
export default {
  name: 'skeleton-demo',
  data() {
    return {
      loading: true,
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
  },
}
</script>
