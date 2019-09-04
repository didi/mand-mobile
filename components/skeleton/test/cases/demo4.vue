<template>
  <div class="md-example">
    <md-skeleton title :title-width="36" :row="4" :row-width="rows">
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
      rows: [40, 56, 72, 64],
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
  },
}
</script>
