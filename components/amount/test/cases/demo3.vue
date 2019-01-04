<template>
  <div class="md-example-child md-example-child-amount">
    <md-amount
      :value="1234"
      is-capital
    ></md-amount>
    <md-amount
      :value="12.34"
      is-capital
    ></md-amount>
    <md-amount
      :value="1200"
      is-capital
    ></md-amount>
    <md-amount
      :value="1201"
      is-capital
    ></md-amount>
	</div>
</template>

<script>import {Amount} from 'mand-mobile'

export default {
  name: 'amount-demo',
  /* DELETE */
  title: '大写中文',
  titleEnUS: 'Capital Chinese',
  /* DELETE */
  components: {
    [Amount.name]: Amount,
  },
}
</script>

<style lang="stylus" scoped>
.md-example-child-amount
  text-align center
  font-size 32px
  color #666
</style>