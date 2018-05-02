<template>
  <div class="md-example-child md-example-child-agree md-example-child-3">
    <md-agree
      v-model="agreeConf.checked"
      :disabled="agreeConf.disabled"
      :size="agreeConf.size"
      @change="onChange(agreeConf.name, agreeConf.checked, $event)"
    >
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
    </md-agree>
	</div>
</template>

<script>
import {Agree} from 'mand-mobile'

export default {
  name: 'agree-demo',
  /* DELETE */
  title: '未选中不可用状态',
  height: 120,
  /* DELETE */
  components: {
    [Agree.name]: Agree,
  },
  data() {
    return {
      agreeConf: {
        checked: false,
        name: 'agree3',
        size: 'lg',
        disabled: true,
        introduction: '未选中不可用状态',
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