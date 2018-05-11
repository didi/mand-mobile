<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-2">
    <md-action-bar :actions="data" @click="onBtnClick">
      &yen;128.00
    </md-action-bar>
  </div>
</template>

<script>import {ActionBar, Dialog} from 'mand-mobile'

export default {
  name: 'action-bar-demo',
  /* DELETE */
  title: '通栏带文案',
  height: 150,
  codeSandBox: 'https://codesandbox.io/s/48kj4x289x',
  /* DELETE */
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
