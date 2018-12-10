<template>
  <div class="md-example-child md-example-child-codebox md-example-child-codebox-3">
    <md-codebox
      :maxlength="-1"
      v-model="code"
      system
    />
  </div>
</template>

<script>import {Codebox} from 'mand-mobile'

export default {
  name: 'codebox-demo',
  components: {
    [Codebox.name]: Codebox,
  },
  data() {
    return {
      code: '1234',
    }
  },
}
</script>
