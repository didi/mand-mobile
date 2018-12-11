<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-1">
    <md-field>
      <md-field-item title="婚姻状况" solid>
        <md-radio name="2" v-model="marriage" label="已婚" inline />
        <md-radio name="1" v-model="marriage" label="未婚" inline />
        <md-radio name="3" v-model="marriage" label="保密" inline />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>import {Radio, Field, FieldItem} from 'mand-mobile'

export default {
  name: 'radio-demo',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Radio.name]: Radio,
  },
  data() {
    return {
      marriage: '2',
    }
  },
}
</script>
