<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-0">
    <md-radio name="0" v-model="checked" label="单选项1" />
    <md-radio name="1" v-model="checked" label="单选项2" />
  </div>
</template>

<script>import {Radio} from 'mand-mobile'

export default {
  name: 'radio-demo',
  /* DELETE */
  title: '普通单选项',
  titleEnUS: 'Normal radio',
  /* DELETE */
  components: {
    [Radio.name]: Radio,
  },
  data() {
    return {
      checked: '0',
    }
  },
}
</script>
