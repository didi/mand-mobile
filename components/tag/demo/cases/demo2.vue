<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-2">
    <tag size="large" shape="square" font-color="#3CA0E6" type="ghost">运营车</tag>
    <tag size="small" shape="square" font-color="#3CA0E6" type="ghost">运营车</tag>
  </div>
</template>

<script>
import {Tag} from 'mand-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '线框',
  /* DELETE */
  components: {
    Tag,
  },
}

</script>