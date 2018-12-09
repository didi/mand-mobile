<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-1">
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>

<script>import {ActionBar, Toast} from 'mand-mobile'

export default {
  name: 'action-bar-demo',
  components: {
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '次要按钮',
          disabled: true,
        },
        {
          text: '主要按钮',
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
