<template>
  <div class="md-example-child md-example-child-textarea md-example-child-textarea-2">
    <md-field>
      <md-textarea-item
        ref="demo2"
        class="demo2"
        :autosize="true"
        v-model="value"
        :max-length="100"
        :max-height="150"
        placeholder="描述信息在100字以内"
      >
        <template slot="footer">
          <p class="demo2-footer">
            <span
              class="demo2-footer-left"
              v-if="value.length"
              >{{ value.length }}/100</span
            >
            <span v-else></span>

            <span
              class="demo2-footer-right"
              >页脚文案</span
            >
          </p>
        </template>
      </md-textarea-item>
    </md-field>
  </div>
</template>

<script>import {TextareaItem, Field} from 'mand-mobile'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '插槽',
  titleEnUS: 'Slot',
  /* DELETE */
  data() {
    return {
      value: '',
    }
  },
  components: {
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },
}
</script>
<style lang="stylus" scoped>
.md-example-child-textarea-2
  .demo2-footer
    display flex
    justify-content space-between
    color #999
    font-size 24px
</style>
