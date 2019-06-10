<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-7">
    <md-toast ref="toast">
      <md-activity-indicator
        :size="20"
        :text-size="16"
        color="yellow"
        text-color="white"
      >loading...</md-activity-indicator>
    </md-toast>
    <md-button @click="showTextToast">定制Toast</md-button>
  </div>
</template>

<script>import {Toast, Button, ActivityIndicator} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '定制Toast',
  titleEnUS: 'Customize toast',
  /* DELETE */
  components: {
    [Toast.component.name]: Toast.component,
    [Button.name]: Button,
    [ActivityIndicator.name]: ActivityIndicator,
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    showTextToast() {
      if (this.isShow) {
        this.$refs.toast.hide()
        this.isShow = false
      } else {
        this.$refs.toast.show()
        this.isShow = true
      }
    },
  },
}
</script>
