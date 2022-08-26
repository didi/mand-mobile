<template>
  <div class="md-example-child md-example-child-toast md-example-child-toast-7">
    <md-toast ref="toast" icon="success" content="方形 Toast 最多支持2行文字" square>
    </md-toast>
    <md-button @click="showTextToast">方形Toast长文字</md-button>
  </div>
</template>

<script>import {Toast, Button, ActivityIndicator} from 'mand-mobile'

export default {
  name: 'toast-demo',
  /* DELETE */
  title: '方形 Toast 长文本',
  titleEnUS: 'Cube toast long text',
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
