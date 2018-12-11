<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-3">
    <md-switch
      v-model="isActive"
      disabled
    ></md-switch>
  </div>
</template>

<script>import {Switch} from 'mand-mobile'

export default {
  name: 'switch-demo',
  components: {
    [Switch.name]: Switch,
  },
  data() {
    return {
      isActive: false,
    }
  },
}
</script>