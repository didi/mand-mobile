<template>
  <div class="md-example-child md-example-child-check md-example-child-check-4">
    <md-field title="复选列表">
      <md-check-list
        ref="checkList"
        v-model="favorites"
        icon="right"
        icon-inverse=""
        :options="fruits"
      />
      <md-cell-item no-border>
        <md-button type="primary" size="small" inline @click="checkAll">全选</md-button>
        <md-button size="small" inline @click="toggleAll">反选</md-button>
      </md-cell-item>
    </md-field>
	</div>
</template>

<script>import {Field, CellItem, CheckList, Button} from 'mand-mobile'

export default {
  name: 'check-demo',
  /* DELETE */
  title: '复选列表',
  titleEnUS: 'Check list',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [CheckList.name]: CheckList,
    [Button.name]: Button,
  },
  data() {
    return {
      favorites: ['apple'],
      fruits: [
        {value: 'watermelon', label: '西瓜'},
        {value: 'apple', label: '苹果'},
        {value: 'banana', label: '香蕉'},
        {value: 'orange', label: '橙子'},
        {value: 'tomato', label: '西红柿', disabled: true},
      ],
    }
  },
  methods: {
    checkAll() {
      this.$refs.checkList.$refs.group.toggleAll(true)
    },
    toggleAll() {
      this.$refs.checkList.$refs.group.toggleAll()
    },
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child
  font-size 28px
</style>
