<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-4">
    <md-radio
      ref="radio"
      :options="data"
      :default-index="0"
      icon="circle-right"
      icon-inverse="circle"
      icon-position="left"
    >
    </md-radio>
  </div>
</template>

<script>import {Radio} from 'mand-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title: 'Icon设置',
  titleEnUS: 'Setting icon',
  /* DELETE */
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      data: [{text: '选项1'}, {text: '选项2'}, {text: '选项3'}],
    }
  },
}
</script>