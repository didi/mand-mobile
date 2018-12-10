<template>
  <div class="md-example-child md-example-child-agree md-example-child-0">
    <md-agree
      v-model="agreeConf.checked"
      :disabled="agreeConf.disabled"
      :size="agreeConf.size"
    >
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意<a>《投保须知》</a>, <a>《保险条款》</a>
    </md-agree>
  </div>
</template>

<script>import {Agree} from 'mand-mobile'

export default {
  name: 'agree-demo',
  components: {
    [Agree.name]: Agree,
  },
  data() {
    return {
      agreeConf: {
        checked: true,
        name: 'agree0',
        size: 'md',
        disabled: false,
        introduction: '选中状态',
      },
    }
  },
}
</script>
