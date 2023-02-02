<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-2">
    <div class="md-example-item-s">
      <md-icon name="location" :svg="false" size="xs"></md-icon>
      <p>xs</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" :svg="false" size="sm"></md-icon>
      <p>sm</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" :svg="false" size="md"></md-icon>
      <p>md</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="location" :svg="false" size="lg"></md-icon>
      <p>lg</p>
    </div>
  </div>
</template>

<script>import {Icon} from 'mand-mobile'

export default {
  name: 'icon-demo',
  components: {
    [Icon.name]: Icon,
  },
}
</script>
