<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-1">
    <div class="md-example-item-s">
      <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <p>spinner</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="success-color" size="lg"></md-icon>
      <p>success-color</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="warn-color" size="lg"></md-icon>
      <p>warn-color</p>
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
