<template>
  <div class="md-cashier-channel-item">
    <div class="item-icon" :class="data.icon">
      <md-icon :name="data.icon" size="lg"></md-icon>
    </div>
    <div class="item-label">
      <p class="title">
        <span v-html="data.text || data"></span>
        <span
          v-if="data.action"
          class="title-active"
          v-html="data.action.text"
          @click.stop="data.action.handler"
        ></span>
      </p>
      <p class="desc" v-html="data.desc"></p>
    </div>
    <div class="item-check-icon">
      <md-icon
        v-if="data.disabled"
        name="check-disabled"
      ></md-icon>
      <md-icon
        v-else-if="active"
        name="checked"
      ></md-icon>
      <md-icon
        v-else
        name="check"
      ></md-icon>
    </div>
  </div>
</template>

<script>import Icon from '../icon'
export default {
  name: 'md-cashier-channel-item',

  components: {
    [Icon.name]: Icon,
  },

  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus" scoped>
.md-cashier-channel-item
  block()
  position relative
  padding 15px 40px 15px 0
  box-sizing border-box
  .item-icon
    float left
    width 32px
    height 32px
    margin-top 4px
  .item-label
    float left
    margin-left h-gap-sm
    .title
      font-size cashier-choose-channel-title-font-size
      color cashier-choose-channel-title-color
      .title-active
        padding-left h-gap-sm
        font-size cashier-choose-channel-title-action-font-size
        color cashier-choose-channel-title-action-color
    .desc
      margin-top 4px
      font-size cashier-choose-channel-desc-font-size
      color cashier-choose-channel-desc-color
  .item-check-icon
    position absolute
    top 50%
    right 0
    transform translateY(-50%)
    .md-icon
      color color-text-disabled
      &.md-icon-checked
        color cashier-choose-channel-icon-color
</style>
