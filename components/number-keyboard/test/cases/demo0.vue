<template>
  <div class="md-example-child md-example-child-number-keyboard md-example-child-number-keyboard-0">
    <md-number-keyboard
      value
    ></md-number-keyboard>

    <md-number-keyboard
      value
      hide-dot
    ></md-number-keyboard>

    <md-number-keyboard
      value
      :text-render="keyFormatter"
    ></md-number-keyboard>
  </div>
</template>

<script>import {NumberKeyboard} from 'mand-mobile'

export default {
  name: 'number-keyboard-demo',
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
  },
  methods: {
    keyFormatter(val) {
      if (val === '.') {
        return 'x'
      }
    },
  },
}
</script>

<style lang="stylus">
.md-example-child-number-keyboard-0
  .md-button
    margin-bottom 10px
  .md-example-display
    position fixed
    top 30%
    left 50%
    z-index 9999
    transform translate(-50%, -50%)
    font-size font-heading-large * 2
    text-shadow 0 4px 20px color-text-minor
</style>
