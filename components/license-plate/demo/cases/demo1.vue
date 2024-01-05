<template>
  <div>
    <!-- 投保人车牌号 -->
    <md-field title="车辆信息">
      <div @click="changeNumber">
        <md-detail-item title="车牌号码">
          {{ licensePlate }}
        </md-detail-item>
      </div>
    </md-field>
    <md-license-plate
      :modeShow="'popUp'"
      :showPopUp="showPopUp"
      @hide="hide"
      @confirm="confirm"
    ></md-license-plate>
  </div>
</template>

<script>import {LicensePlate, DetailItem, Field} from 'mand-mobile'

export default {
  name: 'license-plate-demo',
  title: '半弹层版',
  components: {
    [LicensePlate.name]: LicensePlate,
    [DetailItem.name]: DetailItem,
    [Field.name]: Field,
  },
  data() {
    return {
      showPopUp: false,
      licensePlate: '',
    }
  },
  methods: {
    hide() {
      this.showPopUp = false
    },
    changeNumber() {
      this.showPopUp = true
    },
    confirm(value) {
      this.hide()
      this.licensePlate = value
    },
  },
}
</script>

<style lang="stylus">
</style>
