<template>
  <div class="md-example-child md-example-child-check md-example-child-check-4">
    <md-field title="复选列表">
      <md-check-list
        :options="fruits"
        v-model="favorites"
      />
    </md-field>
	</div>
</template>

<script>import {Field, CheckList} from 'mand-mobile'

export default {
  name: 'check-demo',
  /* DELETE */
  title: '复选列表',
  titleEnUS: 'Check list',
  /* DELETE */
  components: {
    [Field.name]: Field,
    [CheckList.name]: CheckList,
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
}
</script>

<style lang="stylus" scoped>
.md-example-child
  font-size 28px
</style>
