<template>
  <div class="md-example-child md-example-child-single-component">
    <md-check-group
      v-model="selected"
      :options="options"
      :max="0"
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
  title: '多选',
  components: {
    [CheckGroup.name]: CheckGroup,
  },
  data() {
    return {
      selected: '1',
      options: [
        {value: '1', label: '选项一'},
        {value: '2', label: '选项二', disabled: true},
        {value: '3', label: '选项三'},
        {value: '4', label: '选项四'},
        {value: '5', label: '选项五'},
        {value: '6', label: '选项六'},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child
  font-size 28px
</style>
