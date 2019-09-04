<template>
  <div class="md-example">
    <md-skeleton avatar title>
    </md-skeleton>
  </div>
</template>

<script>import {Skeleton} from 'mand-mobile'
export default {
  name: 'skeleton-demo',
  title: '组合骨架',
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
