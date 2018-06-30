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
  /* DELETE */
  title: '千位分隔符',
  titleEnUs: 'Thousands Separator',
  /* DELETE */
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