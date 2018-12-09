<template>
  <div class="md-example-child md-example-child-amount">
    <md-amount
      :value="1234"
      has-separator
    ></md-amount>
	</div>
</template>

<script>import {Amount} from 'mand-mobile'

export default {
  name: 'amount-demo',
  components: {
    [Amount.name]: Amount,
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child-amount
  text-align center
  color #666
</style>