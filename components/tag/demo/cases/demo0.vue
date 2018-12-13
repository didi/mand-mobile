<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-0">
    <md-tag size="tiny" shape="circle" type="fill" fill-color="#FC7353" font-color="#000"></md-tag>
    <md-tag size="small" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff">特惠</md-tag>
    <md-tag size="large" shape="circle" type="fill" fill-color="#FC7353" font-color="#fff">返5000</md-tag>
    <md-tag size="small" shape="circle" type="ghost" font-color="#FC7353">特惠</md-tag>
    <md-tag
      size="small"
      shape="circle"
      sharp="bottom-left"
      type="fill"
      fill-color="linear-gradient(90deg, #FC7353 0%, #FC9153 100%)"
      font-color="#fff"
    >续保3折起</md-tag>
  </div>
</template>

<script>import {Tag} from 'mand-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '半圆',
  titleEnUS: 'Semicircle',
  /* DELETE */
  components: {
    [Tag.name]: Tag,
  },
}
</script>