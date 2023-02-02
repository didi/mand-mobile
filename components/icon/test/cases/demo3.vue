<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-3">
    <div class="md-example-item-s">
      <md-icon name="security" :svg="false" color="gray"></md-icon>
      <p>gray</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="security" :svg="false" color="orange"></md-icon>
      <p>orange</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="security" :svg="false" color="blue"></md-icon>
      <p>blue</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="security" :svg="false" color="purple"></md-icon>
      <p>purple</p>
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
