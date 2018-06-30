<template>
  <div class="md-example-child md-example-child-amount">
    <p>
      <span class="describe">Original</span>
      <md-amount :value="1234.125" :precision="3"></md-amount>
    </p>
    <p>
      <span class="describe">Round</span>
      <md-amount :value="1234.125"></md-amount>
    </p>
    <p>
      <span class="describe">Floor</span>
      <md-amount :value="1234.123" :is-round-up="false"></md-amount>
    </p>
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
  p
    font-size 50px
    span.describe
      font-size 18px
</style>