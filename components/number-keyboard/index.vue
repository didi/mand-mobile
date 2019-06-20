<template>
  <div class="md-number-keyboard" :class="{'in-view': isView}">
    <template v-if="isView">
      <div class="md-number-keyboard-slot" v-if="$slots.default">
        <slot></slot>
      </div>
      <md-number-keyboard-container
        ref="keyborad"
        :type="type"
        :disorder="disorder"
        :ok-text="okText"
        :is-view="isView"
        :hide-dot="hideDot"
        :text-render="textRender"
        @enter="$_onEnter"
        @delete="$_onDelete"
        @confirm="$_onConfirm"
        @hide="isKeyboardShow = false"
      ></md-number-keyboard-container>
    </template>
    <template v-else>
      <md-popup
        ref="popup"
        v-model="isKeyboardShow"
        position="bottom"
        @show="$emit('show')"
        @hide="$emit('hide')"
        :has-mask="false"
      >
        <div class="md-number-keyboard-slot" v-if="$slots.default">
          <slot></slot>
        </div>
        <md-number-keyboard-container
          ref="keyborad"
          :type="type"
          :disorder="disorder"
          :ok-text="okText"
          :is-view="isView"
          :hide-dot="hideDot"
          :text-render="textRender"
          @enter="$_onEnter"
          @delete="$_onDelete"
          @confirm="$_onConfirm"
          @hide="isKeyboardShow = false"
          @touchmove.native.prevent
        ></md-number-keyboard-container>
      </md-popup>
    </template>
  </div>
</template>

<script>import Popup from '../popup'
import Keyborad from './board'

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
    hideDot: {
      type: Boolean,
    },
    disorder: {
      type: Boolean,
    },
    isHideConfirm: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
    },
    textRender: {
      type: Function,
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
      this.isHideConfirm && this.hide()
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
  .md-popup
    z-index number-keyboard-zindex
  .md-popup-box
    padding-top 1px
    background-color color-bg-base
    padding-bottom constant(safe-area-inset-bottom)
</style>
