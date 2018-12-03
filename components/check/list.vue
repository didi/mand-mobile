<template>
  <md-check-group
    ref="group"
    class="md-check-list"
    :class="{ 'is-align-center': alignCenter }"
    :value="value"
    @input="$_onInput"
  >
    <md-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="md-check-item"
      :class="{
        'is-checked': value.indexOf(item.value) !== -1,
      }"
      :title="hasSlot ? '' : (item.text || item.label)"
      :brief="hasSlot ? '' : item.brief"
      :disabled="item.disabled"
      @click="$_check(item, index)"
    >
      <template v-if="hasSlot">
        <slot :option="item"></slot>
      </template>
      <md-check
        v-if="!alignCenter"
        :name="item.value"
        :disabled="item.disabled"
        size="md"
        icon="right"
        icon-inverse=""
        icon-disabled=""
        slot="right"
      />
    </md-cell-item>
  </md-check-group>
</template>

<script>import Check from './index'
import CheckGroup from './group'
import CellItem from '../cell-item'

export default {
  name: 'md-check-list',

  components: {
    [Check.name]: Check,
    [CheckGroup.name]: CheckGroup,
    [CellItem.name]: CellItem,
  },

  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      type: Array,
      default: () => [],
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    isSlotScope: {
      type: Boolean,
      default: undefined,
    },
  },

  computed: {
    hasSlot() {
      return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default
    },
  },

  methods: {
    // MARK: private methods
    $_check(option) {
      this.$refs.group.toggle(option.value)
    },
    // MARK: private events
    $_onInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="stylus">
.md-check-item
  .md-check
    margin-top 0
    margin-bottom 0
  .md-cell-item-body.multilines .md-cell-item-title
    font-weight font-weight-medium

.md-check-list.is-align-center
  .md-cell-item-content
    text-align center
  .md-cell-left,
  .md-cell-right
    display none
</style>

