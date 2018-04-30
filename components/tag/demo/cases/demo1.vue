<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-1">
    <tag size="large" shape="fillet" type="fill" fill-color="#FC9153" font-weight="normal" font-color="#fff">字</tag>
    <tag size="large" shape="fillet" type="fill" fill-color="#50A050" font-weight="bold" font-color="#fff">字</tag>
    <tag size="large" shape="fillet" type="fill" fill-color="#91C6EF" font-weight="bolder" font-color="#fff">字</tag>
  </div>
</template>

<script>import {Tag} from 'mand-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '圆角',
  /* DELETE */
  components: {
    Tag,
  },
}
</script>