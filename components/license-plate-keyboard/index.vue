<template>
  <div class="md-license-plate-keyboard">
    <div v-if="keyboardType === 1">
      <md-shortcut-row
        :shortcuts="shortcuts"
        @enter="$_onEnter"
      />
    </div>
    <div v-else>
      <md-mixed-key-board
        :mixedKeyboard="mixedKeyboard"
        @enter="$_onEnter"
        @delete="$_onDelete"
        @confirm="$_onConfirm"
      />
    </div>
  </div>
</template>

<script>import MixedKeyBoard from './mixed-key-board'
import ShortcutRow from './short-cut-row'

export default {
  name: 'md-license-plate-keyboard',

  components: {
    [MixedKeyBoard.name]: MixedKeyBoard,
    [ShortcutRow.name]: ShortcutRow,
  },

  props: {
    // 对象是键盘组件的数据对象，用于传递键盘每行的数据
    keyboard: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {}
  },

  computed: {
    shortcuts() {
      return this.keyboard.shortcuts || []
    },
    // 键盘类型
    keyboardType() {
      return this.keyboard.keyboardType || 1
    },
    // 混合键盘数据
    mixedKeyboard() {
      return this.keyboard.mixedKeyboard || []
    },
  },

  methods: {
    $_onEnter(value) {
      this.$emit('enter', value)
    },
    $_onDelete() {
      this.$emit('delete')
    },
    $_onConfirm() {
      this.$emit('confirm')
    },
  },
}
</script>
