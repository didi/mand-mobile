<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-3">
    <tag size="large" shape="square" fill-color="rgba(0,0,0,0)" type="fill" font-weight="bolder">￥3600</tag>
    <tag size="small" shape="square" fill-color="rgba(0,0,0,0)" type="fill" font-weight="bolder">￥300</tag>
  </div>
</template>

<script>
import {Tag} from 'mand-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '阳文',
  /* DELETE */
  components: {
    Tag,
  },
}

</script>