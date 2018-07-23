<template>
  <div class="md-example-child md-example-child-single-component">
    <md-check-list
      v-model="checked"
      :options="options"
    ></md-check-list>
	</div>
</template>

<script>import {CheckList} from 'mand-mobile'

export default {
  name: 'checkbox-demo',
  title: '复选框',
  components: {
    [CheckList.name]: CheckList,
  },
  data() {
    return {
      checked: '1',
      options: [
        {value: '1', label: '选项一', disabled: false},
        {value: '2', label: '选项二', disabled: false},
        {value: '3', label: '选项三', disabled: false},
        {value: '4', label: '选项四', disabled: true},
        {value: '5', label: '选项五', disabled: false},
        {value: '6', label: '选项六', disabled: false},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
