<template>
  <div class="md-number-keyboard" :class="{'in-view': isView}">
    <template v-if="isView">
      <md-number-keyboard-container
        :type="type"
        :disorder="disorder"
        :ok-text="okText"
        :is-view="isView"
        @enter="$_onEnter"
        @delete="$_onDelete"
        @confirm="$_onConfirm"
        @hide="isKeyboardShow = false"
      ></md-number-keyboard-container>
    </template>
    <template v-else>
      <md-popup
        v-model="isKeyboardShow"
        position="bottom"
        @show="$emit('show')"
        @hide="$emit('hide')"
        :has-mask="false"
      >
        <md-number-keyboard-container
          :type="type"
          :disorder="disorder"
          :ok-text="okText"
          :is-view="isView"
          @enter="$_onEnter"
          @delete="$_onDelete"
          @confirm="$_onConfirm"
          @hide="isKeyboardShow = false"
        ></md-number-keyboard-container>
      </md-popup>
    </template>
  </div>
</template>

<script>import Popup from '../popup'
import Keyborad from './keyboard'

export default {
  name: 'md-number-keyboard',

  components: {
    [Popup.name]: Popup,
    [Keyborad.name]: Keyborad,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      // simple, professional
      type: String,
    },
    isView: {
      type: Boolean,
      default: false,
    },
    disorder: {
      type: Boolean,
    },
    okText: {
      type: String,
    },
  },

  data() {
    return {
      isKeyboardShow: false,
    }
  },

  watch: {
    value(val) {
      this.isKeyboardShow = val
    },
    isKeyboardShow(val) {
      this.$emit('input', val)
    },
  },

  mounted() {
    this.value && (this.isKeyboardShow = this.value)
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onEnter(val) {
      this.$emit('enter', val)
    },
    $_onDelete() {
      this.$emit('delete')
    },
    $_onConfirm() {
      this.$emit('confirm')
      this.hide()
    },

    // MARK: public methods
    show() {
      /* istanbul ignore next */
      this.isKeyboardShow = true
    },
    hide() {
      /* istanbul ignore next */
      this.isKeyboardShow = false
    },
  },
}
</script>

<style lang="stylus">
.md-number-keyboard
  .md-popup, .md-popup-box
    z-index number-keyboard-zindex !important
</style>
