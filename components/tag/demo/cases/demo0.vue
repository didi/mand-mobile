<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-0">
    <tag size="tiny" shape="circle" type="fill" fill-color="#FC7353" font-color="#000"></tag>
    <tag size="small" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff">特惠</tag>
    <tag size="large" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff">返5000</tag>
    <tag size="small" shape="circle" type="ghost" font-color="#FC7353">特惠</tag>
  </div>
</template>

<script>import {Tag} from 'mand-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '半圆',
  /* DELETE */
  components: {
    Tag,
  },
}
</script>