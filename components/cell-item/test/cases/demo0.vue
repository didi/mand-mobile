<template>
  <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-0">
    <md-field>
      <md-cell-item title="普通条目" />
      <md-cell-item title="动作条目" arrow />
      <md-cell-item title="禁用条目" disabled />
    </md-field>
  </div>
</template>

<script>import {Field, CellItem} from 'mand-mobile'

export default {
  name: 'cell-item-demo',

  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
  },

  data() {
    return {
      open: false,
    }
  },
}
</script>
