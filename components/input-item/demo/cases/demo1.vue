<template>
  <div class="md-example-child md-example-child-input-item-1">
    <md-field>
      <md-input-item
        ref="name"
        title="真实姓名"
        placeholder="投保人姓名"
        is-title-latent
        clearable
      ></md-input-item>
      <md-input-item
        ref="id"
        title="身份证号"
        placeholder="投保人身份证号"
        is-title-latent
        clearable
        ></md-input-item>
    </md-field>
  </div>
</template>

<script>
import {InputItem, Field} from 'mand-mobile'

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '标题隐藏输入框',
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
}

</script>