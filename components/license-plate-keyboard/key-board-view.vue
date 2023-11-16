<template>
  <div class="mixed-key-container">
    <div
      v-for="(item, index) in mixedKeyboard"
      :key="index"
      class="mixed-key-item"
      :class="{disabled: item.disabled}"
    >
      <template v-if="item.type">
        <div
          :class="item.type"
          v-tap="{
            methods:
              item.type === 'delete' ? deleteClick : confirmClick,
            disabled: item.disabled
          }"
        >
          <img v-if="item.imgUrl" :src="item.imgUrl"/>
          <div v-if="item.text">{{ item.text }}</div>
        </div>
      </template>
      <template v-else>
        <div
          v-tap="{
            methods: keyClick,
            disabled: item.disabled
          }"
        >{{ item.value }}</div>
      </template>
    </div>
  </div>
</template>

<script>export default {
  name: 'mixed-key-board',

  components: {},

  props: {
    // 混合键盘数据
    mixedKeyboard: {
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
    deleteClick() {
      this.$emit('deleteClick')
    },
    confirmClick() {
      this.$emit('confirmClick')
    },
  },
}
</script>

<style lang="stylus" scoped>
.mixed-key-container {
  padding: 32px 0px;
  display: flex;
  flex-wrap: wrap;
  .mixed-key-item {
    >div{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 104px;
      background: #FFFFFF;
      box-shadow: 0px 2px 0px 0px rgba(159,159,159,0.5);
      border-radius: 10px;
      font-family: PingFangSC-Regular;
      font-size: 40px;
      color: #111A34;
      font-weight: 400;
      margin: 0px 0px 10px 10px;
      &.delete{
        img{
          width: 40px;
          height: 40px;
        }
      }
      &.confirm{
        width: 212px;
        background: #198CFF;
        box-shadow: none;
        font-size: 36px;
        color: #FFFFFF;
      }
    }
    &.disabled{
      >div{
        background: #F5F5F5;
        color: #C1C8CF;
      }
    }
  }
}
</style>
