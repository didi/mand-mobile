<template>
  <div class="shortcut-container">
    <div
      v-for="(item, index) in shortcuts"
      :key="index"
      class="shortcut-item"
      v-tap="{ methods: keyClick }"
    >{{ item }}</div>
  </div>
</template>

<script>export default {
  name: 'shortcut-row',

  components: {},

  props: {
    // 省份数据
    shortcuts: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  data() {
    return {}
  },

  methods: {
    keyClick(value) {
      this.$emit('keyClick', value)
    },
  },
}
</script>

<style lang="stylus" scoped>
.shortcut-container {
  padding: 32px 10px;
  display: flex;
  flex-wrap: wrap;
  .shortcut-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 104px;
    background: #FFFFFF;
    box-shadow: 0px 2px 0px 0px rgba(159,159,159,0.5);
    border-radius: 12px;
    font-family: PingFangSC-Regular;
    font-size: 40px;
    color: #01080F;
    letter-spacing: 0;
    font-weight: 400;
    margin: 0px 0px 10px 10px;
  }
}
</style>
