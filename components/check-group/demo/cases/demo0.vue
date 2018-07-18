<template>
  <div class="md-example-child md-example-child-single-component">
    <md-check-group
      v-model="selected"
      :options="options"
    >
      <div slot-scope="{ option, select }" @click="select(option.value)">
        label: {{option.label}}, disabled: {{!!option.disabled}}, isSelected: {{option.isSelected}}
      </div>
    </md-check-group>
	</div>
</template>

<script>import {CheckGroup} from 'mand-mobile'

export default {
  name: 'check-group-demo',
  title: '单选',
  components: {
    [CheckGroup.name]: CheckGroup,
  },
  data() {
    return {
      selected: '1',
      options: [
        {value: '1', label: '无UI'},
        {value: '2', label: '禁用选项', disabled: true},
        {value: '3', label: '点我啊'},
        {value: '4', label: '点我啊'},
        {value: '5', label: '点我啊'},
        {value: '6', label: '点我啊'},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child
  font-size 28px
</style>
