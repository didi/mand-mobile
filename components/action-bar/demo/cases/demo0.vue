<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-0">
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>

<script>import {ActionBar, Toast} from 'mand-mobile'

export default {
  name: 'action-bar-demo',
  /* DELETE */
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
          text: '主要按钮',
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
