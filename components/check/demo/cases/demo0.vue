<template>
  <div class="md-example-child md-example-child-check md-example-child-check-0">
    <md-check v-model="checked" label="复选项" />
    <md-check label="禁用" disabled />
	</div>
</template>

<script>import {Check} from 'mand-mobile'

export default {
  name: 'check-demo',
  title: '复选项',
  components: {
    [Check.name]: Check,
  },
  data() {
    return {
      checked: false,
    }
  },
}
</script>
