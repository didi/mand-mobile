<template>
  <div class="md-example-child md-example-child-agree md-example-child-1">
    <md-agree
      v-model="agreeConf.checked"
      :disabled="agreeConf.disabled"
      :size="agreeConf.size"
      icon-type="square"
      @change="onChange(agreeConf.name, agreeConf.checked, $event)"
    >
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
    </md-agree>
  </div>
</template>

<script>import {Agree} from 'mand-mobile'

export default {
  name: 'agree-demo',
  /* DELETE */
  title: '方形勾选框未选中状态',
  titleEnUS: 'Square check box unselected state',
  height: 120,
  /* DELETE */
  components: {
    [Agree.name]: Agree,
  },
  data() {
    return {
      agreeConf: {
        checked: false,
        name: 'agree5',
        size: 'md',
        disabled: false,
        introduction: '方形勾选框未选中状态',
      },
    }
  },
  methods: {
    onChange(name, checked) {
      console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
    },
  },
}
</script>
