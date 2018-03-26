<template>
  <div class="md-example-child md-example-child-codebox md-example-child-codebox-1">
    <md-codebox
      :mask="true"
      :maxlength="6"
      v-model="code"
    />
  </div>
</template>

<script>import {Codebox} from 'mand-mobile'

export default {
  name: 'codebox-demo',
  title: '掩码遮蔽',
  components: {
    [Codebox.name]: Codebox,
  },
  data() {
    return {
      code: '',
    }
  },
}
</script>
