<template>
  <div>
    <md-license-plate :stackViewBody="'#licensePlateContainer'"></md-license-plate>
  </div>
</template>

<script>import {LicensePlate} from 'mand-mobile'

export default {
  name: 'license-plate-demo',
  components: {
    [LicensePlate.name]: LicensePlate,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="stylus" scoped>
</style>
