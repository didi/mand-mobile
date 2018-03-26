<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-2">
    <md-action-bar :actions="data" @click="onBtnClick">
      &yen;128.00
    </md-action-bar>
  </div>
</template>

<script>import {ActionBar, Dialog} from 'mand-mobile'

export default {
  title: '通栏带文案',
  name: 'action-bar-demo',
  height: 150,
  components: {
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '操作',
        },
      ],
    }
  },
  methods: {
    onBtnClick(event, action) {
      Dialog.alert({
        content: `${action.text}完成`,
      })
    },
  },
}
</script>
