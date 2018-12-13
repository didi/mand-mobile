<template>
  <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-0">
    <md-field>
      <md-cell-item title="普通条目" />
      <md-cell-item title="动作条目" arrow @click="onClick" />
      <md-cell-item title="禁用条目" disabled no-border/>
    </md-field>
  </div>
</template>

<script>import {Field, CellItem, Dialog, Icon} from 'mand-mobile'

export default {
  name: 'cell-item-demo',

  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Icon.name]: Icon,
  },

  data() {
    return {
      open: false,
    }
  },

  methods: {
    onClick() {
      Dialog.alert({
        content: '点击了',
      })
    },
  },
}
</script>
