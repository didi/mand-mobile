<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-0">
    <md-switch
      v-model="isActive"
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
      isActive: true,
    }
  },
}
</script>