<template>
  <div class="md-example-child md-example-child-tag md-example-child-tag-3">
    <md-tag
      size="large"
      shape="coupon"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right:20px;"
    >免息券70.1</md-tag>
    <md-tag
      size="large"
      shape="quarter"
      fill-color="#FC9153"
      type="fill"
      font-color="#fff"
      style="margin-right:20px;"
    >
      <md-icon name="right"></md-icon>
    </md-tag>
    <md-tag
      size="large"
      shape="bubble"
      fill-color="linear-gradient(90deg, #FF5B60 0%, #F98472 100%)"
      type="fill"
    >99</md-tag>
  </div>
</template>

<script>import {Tag, Icon} from 'mand-mobile'

export default {
  name: 'tag-demo',
  components: {
    [Tag.name]: Tag,
    [Icon.name]: Icon,
  },
}
</script>
