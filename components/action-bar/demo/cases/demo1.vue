<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-1">
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>

<script>import {ActionBar, Toast} from 'mand-mobile'

export default {
  title: '通栏多按钮禁用',
  name: 'action-bar-demo',
  height: 150,
  components: {
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '操作一',
          disabled: true,
        },
        {
          text: '操作二',
          onClick: this.handleClick,
        },
        {
          text: '操作三',
          disabled: true,
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
