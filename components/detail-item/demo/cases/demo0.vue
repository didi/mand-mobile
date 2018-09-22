<template>
  <div class="md-example-child md-example-child-detail-item md-example-child-detail-item-0">
    <md-field>
      <md-detail-item title="普通条目" />
      <md-detail-item title="动作条目" />
      <md-detail-item title="禁用条目" />
    </md-field>
  </div>
</template>

<script>import {DetailItem} from 'mand-mobile'

export default {
  name: 'cell-item-demo',

  components: {
    [DetailItem.name]: DetailItem,
  },
}
</script>
