<template>
  <div class="keyboard-container">
    <div v-if="keyboardType === 1">
      <shortcut-view
        :shortcuts="shortcuts"
        @keyClick="keyClick"
      />
    </div>
    <div v-else>
      <keyboard-view
        :mixedKeyboard="mixedKeyboard"
        @keyClick="keyClick"
        @deleteClick="deleteClick"
        @confirmClick="confirmClick"
      />
    </div>
  </div>
</template>

<script>import keyboardView from './key-board-view.vue'
import shortcutView from './short-cut-view.vue'

export default {
  name: 'license-plate-keyboard',

  components: {
    keyboardView,
    shortcutView,
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
    keyClick(value) {
      this.$emit('keyClick', value)
    },
    deleteClick() {
      this.$emit('deleteClick')
    },
    confirmClick() {
      this.$emit('confirmClick')
    },
  },
}
</script>
