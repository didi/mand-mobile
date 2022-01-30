<template>
  <div class="md-codebox-wrapper">
    <div
      class="md-codebox"
      :class="{
        'is-disabled': disabled,
        'is-justify': justify
      }"
      @click="focus"
    >
      <template v-if="maxlength > 0">
        <span
          v-for="i in num"
          :key="i"
          :class="[
            'md-codebox-box',
            (i === code.length + 1) && focused && 'is-active',
            code.charAt(i-1) !== '' && 'is-filled'
          ]"
        >
          <template v-if="code.charAt(i-1)">
            <template v-if="mask">
              <i class="md-codebox-dot"></i>
            </template>
            <template v-else>
              {{code.charAt(i-1)}}
            </template>
          </template>
          <template v-if="i === code.length + 1 && focused">
            <i class="md-codebox-blink"></i>
          </template>
        </span>
      </template>
      <template v-else>
        <input
          v-if="mask"
          type="password"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="['md-codebox-holder', focused && 'is-active']"
        />
        <input
          v-else
          :type="inputType"
          :maxlength="maxlength"
          :value="code"
          readonly
          disabled
          :class="['md-codebox-holder', focused && 'is-active']"
        />
      </template>
    </div>
    <slot></slot>
    <form action="" v-show="system" @submit="$_onSubmit">
      <input
        :value="code"
        :type="inputType"
        :maxlength="maxlength"
        @input="$_onInputChange"
        @focus="$_nativeFocus"
        @blur="$_nativeBlur"
        ref="input"
        class="md-codebox-input"
      />
    </form>
    <md-number-keyboard
      v-show="!system"
      ref="keyboard"
      class="md-codebox-keyboard"
      :type="maxlength > 0 ? 'simple' : 'professional'"
      :okText="okText"
      :disorder="disorder"
      :is-view="isView"
      v-model="focused"
      @delete="$_onDelete"
      @enter="$_onEnter"
      @confirm="$_onConfirm"
    ></md-number-keyboard>
  </div>
</template>

<script>import NumberKeyboard from '../number-keyboard'

export default {
  name: 'md-codebox',
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: 4,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    justify: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    system: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    isView: {
      type: Boolean,
      default: false,
    },
    inputType: {
      type: String,
      default: 'tel',
    },
  },
  data() {
    return {
      code: '',
      focused: this.autofocus,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== this.code) {
          this.code = val
        }
      },
    },
  },
  computed: {
    num() {
      return Math.abs(parseInt(this.maxlength, 10)) || 1
    },
  },
  mounted() {
    if (this.closable) {
      document.addEventListener('click', this.$_handleOutClick)
    }
    if (!this.system && !this.isView) {
      document.body.appendChild(this.$refs.keyboard.$el)
    }
  },
  beforeDestroy() {
    if (this.closable) {
      document.removeEventListener('click', this.$_handleOutClick)
    }
    if (this.focused) {
      this.blur()
    }
    if (!this.system && !this.isView) {
      document.body.removeChild(this.$refs.keyboard.$el)
    }
  },
  methods: {
    // MARK: private methods

    // MARK: events handler
    $_handleOutClick(e) {
      if (!this.$el.contains(e.target)) {
        this.focused = false
      }
    },
    $_onInputChange(e) {
      if (this.maxlength < 0 || e.target.value.length <= this.maxlength) {
        this.code = e.target.value
      }

      if (this.code.length === this.maxlength) {
        this.$emit('submit', this.code)
      }

      this.$emit('input', this.code)
    },
    $_onSubmit(e) {
      e.preventDefault()
      this.$emit('submit', this.code)
    },
    $_onEnter(val) {
      if ((this.maxlength < 0 || this.code.length < this.maxlength) && val !== '.') {
        this.code += val
      }

      if (this.code.length === this.maxlength) {
        this.$nextTick(function() {
          this.$emit('submit', this.code)
        })
      }

      this.$emit('input', this.code)
    },
    $_onDelete() {
      this.code = this.code.slice(0, this.code.length - 1)
      this.$emit('input', this.code)
    },
    $_onConfirm() {
      this.$emit('submit', this.code)
    },
    // MARK: public methods
    blur() {
      this.focused = false
      if (this.system) {
        this.$refs.input.blur()
      }
    },
    focus() {
      if (this.disabled) {
        return
      }

      this.focused = true
      if (this.system) {
        this.$refs.input.focus()
      }
    },
    $_nativeBlur() {
      this.$emit('blur')
    },
    $_nativeFocus() {
      this.$emit('focus')
    },
  },
}
</script>

<style lang="stylus">
.md-codebox-wrapper
  .md-codebox-input
    position absolute
    left -9999px
    opacity 0

.md-codebox
  position relative
  display flex
  flex-wrap nowrap
  justify-content center
  &.is-justify
    .md-codebox-box
      flex 1 1 0%

.md-codebox-box
  position relative
  flex 0 1 codebox-width
  width codebox-width
  height codebox-height
  display flex
  align-items center
  justify-content center
  color codebox-color
  font-family font-family-number
  font-size codebox-font-size
  font-weight normal
  line-height 1.2
  if codebox-gutter is a 'unit'
    margin-left (codebox-gutter / 2)
    margin-right (codebox-gutter / 2)
  else
    margin-left "calc(%s / 2)" % codebox-gutter
    margin-right "calc(%s / 2)" % codebox-gutter

  hairline(bottom, color-border-element)
  &:first-child
    margin-left 0
  &:last-child
    margin-right 0
  &.is-active, &.is-filled
    border-color codebox-border-active-color

.md-codebox-blink
  display block
  if tab-height is a 'unit'
    height (codebox-height * 0.8)
  else
    height "calc(%s * 0.8)" % codebox-height
  width 2px
  background-color codebox-blink-color
  animation md-codebox-flash steps(2) 1s infinite

.md-codebox-dot
  display block
  height 10px
  width 10px
  border-radius 5px
  background-color codebox-dot-color

.md-codebox-holder
  pointer-events none
  height codebox-height
  line-height codebox-height
  padding 0 codebox-holder-space
  width 100%
  text-align center
  font-size codebox-font-size
  outline none
  color codebox-color
  letter-spacing 0.1em
  border-radius 0
  border-style solid
  border-width 0 0 codebox-border-width 0
  border-color codebox-border-color
  background none
  box-shadow none
  box-sizing border-box
  -webkit-appearance none
  -webkit-text-fill-color codebox-color
  &[disabled],
  &[readonly]
    opacity 1
    color codebox-color
    border-color codebox-border-color
  &.is-active
    border-color codebox-border-active-color

.md-codebox.is-disabled
  .md-codebox-box
    color codebox-disabled-color
    border-color codebox-disabled-color
  .md-codebox-blink
    display none
  .md-codebox-dot
    background-color codebox-disabled-color
  .md-codebox-holder
    color codebox-disabled-color
    border-color codebox-disabled-color

@keyframes md-codebox-flash
  from
    opacity 0
  to
    opacity 1
</style>

