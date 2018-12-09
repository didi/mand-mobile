<template>
  <div class="md-example-child md-example-child-action-sheet">
    <md-action-sheet
      v-model="value"
      :title="title"
      :default-index="defaultIndex"
      :invalid-index="invalidIndex"
      :cancel-text="cancelText"
      :options="options"
    ></md-action-sheet>
  </div>
</template>

<script>import {ActionSheet, Button} from 'mand-mobile'

export default {
  name: 'action-sheet-demo',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
  },
  data() {
    return {
      value: true,
      title: '操作说明的标题',
      options: [
        {
          label: '选项1',
          value: 0,
        },
        {
          label: '选项2',
          value: 1,
        },
        {
          label: '选项3',
          value: 2,
        },
      ],
      defaultIndex: 1,
      invalidIndex: 2,
      cancelText: '取消',
    }
  },
}
</script>
