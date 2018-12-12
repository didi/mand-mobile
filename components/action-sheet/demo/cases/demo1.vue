<template>
  <div class="md-example-child md-example-child-action-sheet">
    <md-button @click="$_showActionSheet">唤起动作面板</md-button>
  </div>
</template>

<script>import {ActionSheet, Button, Dialog} from 'mand-mobile'

export default {
  name: 'action-sheet-demo',
  /* DELETE */
  title: '单例模式',
  titleEnUS: 'Singleton pattern',
  height: 500,
  /* DELETE */
  components: {
    [Button.name]: Button,
  },
  methods: {
    $_showActionSheet() {
      ActionSheet.create({
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
        onCancel: this.$_cancel,
        onSelected: this.$_selected,
      })
    },
    $_selected(item) {
      Dialog.alert({
        content: `selected: ${JSON.stringify(item)}`,
      })
      console.log('action-sheet selected:', JSON.stringify(item))
    },
    $_cancel() {
      Dialog.alert({
        content: 'cancel',
      })
      console.log('action-sheet cancel')
    },
  },
}
</script>
