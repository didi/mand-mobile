<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-0">
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>

<script>import {ActionBar, Toast} from 'mand-mobile'

export default {
  name: 'action-bar-demo',
  /* DELETE */
  title: '通栏多按钮',
  titleEnUS: 'Multiple buttons',
  height: 150,
  codeSandBox: 'https://codesandbox.io/s/qvk465q29j',
  /* DELETE */
  components: {
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '操作一',
          onClick: this.handleClick,
        },
        {
          text: '操作二',
          onClick: this.handleClick,
        },
      ],
    }
  },
  methods: {
    handleClick() {
      Toast.succeed('Click')
    },
  },
}
</script>
