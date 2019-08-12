<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-2">
    <div class="md-example-item-s">
      <md-icon name="location" size="xs"></md-icon>
      <p>xs</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" size="sm"></md-icon>
      <p>sm</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" size="md"></md-icon>
      <p>md</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" size="lg"></md-icon>
      <p>lg</p>
    </div>
  </div>
</template>

<script>import {Icon} from 'mand-mobile'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '大小',
  titleEnUS: 'Icon size',
  background: '#fff',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
}
</script>
