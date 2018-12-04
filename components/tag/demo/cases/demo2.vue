<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-2">
    <tag size="large" shape="square" font-color="#FF8843" type="ghost">可选</tag>
    <tag size="small" shape="square" font-color="#28AA91" type="ghost">可选</tag>
  </div>
</template>

<script>import {Tag} from 'mand-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '线框',
  titleEnUS: 'Square',
  codeSandBox: 'https://codesandbox.io/s/r73ovo5zmp',
  /* DELETE */
  components: {
    Tag,
  },
}
</script>
