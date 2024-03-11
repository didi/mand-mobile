<template>
  <div>
    <md-license-plate :defaultValue="defaultValue"></md-license-plate>
  </div>
</template>

<script>import {LicensePlate} from 'mand-mobile'

export default {
  name: 'license-plate-demo',
  components: {
    [LicensePlate.name]: LicensePlate,
  },
  data() {
    return {
      defaultValue: '',
    }
  },
  mounted() {
    // setTimeout(()=>{
    //   this.defaultValue = '2333888 '
    // },10000)
  },
  methods: {},
}
</script>

<style lang="stylus" scoped>
</style>
