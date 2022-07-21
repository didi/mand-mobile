<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-1">
    <md-tag
      size="large"
      shape="fillet"
      type="fill"
      fill-color="rgba(255, 91, 96, .1)"
      font-weight="normal"
      font-color="#FF5B60"
    >逾期23天</md-tag>
    <md-tag
      size="large"
      shape="fillet"
      type="ghost"
      fill-color="rgba(255, 91, 96, .1)"
      font-weight="normal"
      font-color="#FF5B60"
    >逾期23天</md-tag>
  </div>
</template>

<script>import {Tag} from 'mand-mobile'

export default {
  name: 'tag-demo',
  /* DELETE */
  title: '圆角',
  titleEnUS: 'Fillet',
  /* DELETE */
  components: {
    [Tag.name]: Tag,
  },
}
</script>
