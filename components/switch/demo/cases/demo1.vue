<template>
  <div class="md-example-child md-example-child-switch md-example-child-switch-1">
    <md-switch
      v-model="isActive"
      @change="handler('switch1', isActive, $event)"
    ></md-switch>
  </div>
</template>

<script>import {Switch} from 'mand-mobile'

export default {
  name: 'switch-demo',
  title: '关闭状态',
  components: {
    [Switch.name]: Switch,
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    handler(name, active) {
      console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    },
  },
}
</script>