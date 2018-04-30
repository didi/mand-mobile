<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-0">
    <div class="md-example-item">
      <md-icon name="hollow-plus" size="lg"></md-icon>
      <p>hollow-plus</p>
    </div>
    <div class="md-example-item">
      <md-icon name="circle-right" size="lg"></md-icon>
      <p>circle-right</p>
    </div>
    <div class="md-example-item">
      <md-icon name="circle-cross" size="lg"></md-icon>
      <p>circle-cross</p>
    </div>
    <div class="md-example-item">
      <md-icon name="circle-alert" size="lg"></md-icon>
      <p>circle-alert</p>
    </div>
    <div class="md-example-item">
      <md-icon name="arrow-up" size="lg"></md-icon>
      <p>arrow-up</p>
    </div>
    <div class="md-example-item">
      <md-icon name="arrow-right" size="lg"></md-icon>
      <p>arrow-right</p>
    </div>
    <div class="md-example-item">
      <md-icon name="arrow-down" size="lg"></md-icon>
      <p>arrow-down</p>
    </div>
    <div class="md-example-item">
      <md-icon name="arrow-left" size="lg"></md-icon>
      <p>arrow-left</p>
    </div>
    <div class="md-example-item">
      <md-icon name="cross" size="lg"></md-icon>
      <p>cross</p>
    </div>
    <div class="md-example-item">
      <md-icon name="right" size="lg"></md-icon>
      <p>right</p>
    </div>
    <div class="md-example-item">
      <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <p>spinner</p>
    </div>
  </div>
</template>

<script>import {Icon} from 'mand-mobile'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '图标',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
}
</script>
