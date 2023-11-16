<template>
  <div class="input-widget">
    <div
      v-for="(item, index) in keyArray"
      :key="index"
      class="input-item"
      :class="{
        'active': selectedIndex === index,
        'animation': selectedIndex === index && !item
      }"
      @click="keyMapping(index)"
    >
      <!-- 非新能源键位 -->
      <div
        v-if="index !== keyArray.length-1"
        class="input-item_content"
      >
        {{ item }}
      </div>
      <!-- 新能源键位 -->
      <div
        v-else
        class="input-item_content"
      >
        <div v-if="item">{{ item }}</div>
        <div v-else class="emptyValue">
          <div>+</div>
          <div class="emptyValue_text">新能源</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>export default {
  name: 'license-plate-input',

  components: {},

  props: {
    keyArray: {
      type: Array,
      default: () => {
        return []
      },
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {}
  },

  methods: {
    keyMapping(index) {
      this.$emit('keyMapping', index)
    },
  },
}
</script>

<style lang="stylus" scoped>
.input-widget{
  display: flex;
  .input-item{
    width: 64px;
    height: 94px;
    background: #F4F8FF;
    border: 1px solid rgba(222,237,255,1);
    border-radius: 8px;
    margin-right: 11px;
    &_content {
      width: 100%;
      height: 100%;
      font-family: PingFangSC-Medium;
      font-size: 40px;
      color: #111A34;
      letter-spacing: 0;
      text-align: center;
      line-height: 94px;
      font-weight: 500;
      .emptyValue{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #12BB42;
        font-size: 36px;
        line-height: 36px;
        &_text{
          color: #61686F;
          font-size: 16px;
          line-height: 16px;
          margin-top: 10px;
        }
      }
    }
  }
  >.input-item:nth-child(2){
    margin-right: 28px;
    position: relative;
    &::after{
      top: 0.47rem;
      right: -0.22rem;
      content: "";
      position: absolute;
      width: .06rem;
      height: .06rem;
      background: #000;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
  >.input-item:last-child{
    margin-right: 0px;
    background: #E8FBE7;
    border: 1px solid rgba(203,242,201,1);
    border-radius: 8px;
    font-size: 16px;
    color: #61686F;
  }
  .input-item.active{
    border-color: rgba(25,140,255,1);
  }
  .input-item.active.animation{
    animation keyboard-cursor 1s step-start 2s
  }

}

@keyframes keyboard-cursor{
  0%{
    border-color: rgba(25,140,255,1);
  }
  25%{
    border-color: rgba(222,237,255,1);
  }
  50%{
    border-color: rgba(25,140,255,1);
  }
  75%{
    border-color: rgba(222,237,255,1);
  }
  100%{
    border-color: rgba(25,140,255,1);
  }
}
</style>
