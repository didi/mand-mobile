<template>
  <div class="md-dialog">
    <md-popup
      :value="value"
      :hasMask="hasMask"
      :maskClosable="maskClosable"
      :position="position"
      :transition="transition"
      :preventScroll="preventScroll"
      :preventScrollExclude="preventScrollExclude"
      @input="$_onInput"
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-dialog-content">
        <div class="md-dialog-body">
          <a
            role="button"
            v-if="closable"
            class="md-dialog-close"
            @click="close"
          >
            <md-icon name="cross" />
          </a>
          <div v-if="icon" class="md-dialog-icon">
            <md-icon :name="icon" />
          </div>
          <h2 class="md-dialog-title" v-if="title" v-text="title"></h2>
          <div class="md-dialog-text" v-if="content" v-html="content"></div>
          <div class="md-dialog-text" v-else-if="$slots.default">
            <slot></slot>
          </div>
        </div>
        <footer class="md-dialog-actions">
          <a
            role="button"
            v-for="(btn, index) in btns"
            :key="index"
            v-text="btn.text"
            @click="$_onClick(btn)"
          ></a>
        </footer>
      </div>
    </md-popup>
  </div>
</template>

<script>import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'md-dialog',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '',
    },
    btns: {
      type: Array,
      default: () => [],
    },
    appendTo: {
      default: () => document.body,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'center',
    },
    transition: {
      type: String,
      default: 'fade',
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: String,
      default: '',
    },
  },

  mounted() {
    if (this.appendTo) {
      this.appendTo.appendChild(this.$el)
    }
  },

  methods: {
    // MARK: private methods

    // MARK: events handler
    $_onInput(val) {
      this.$emit('input', val)
    },
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
    },
    $_onClick(btn) {
      if (typeof btn.handler === 'function') {
        btn.handler.call(null)
      } else {
        this.close()
      }
    },
    // MARK: public methods
    close() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="stylus">
.md-dialog
  position relative
  z-index dialog-zindex
  .md-dialog-content
    width dialog-width
    border-radius dialog-radius
    background-color color-bg-base
    overflow hidden
  .md-dialog-body
    position relative
    color color-text-minor
    font-size dialog-text-font-size
    text-align center
    padding 50px 30px 40px 30px
  .md-dialog-icon
    position relative
    display block
    width dialog-icon-size
    height dialog-icon-size
    margin 0 auto 20px auto
    .md-icon
      width dialog-icon-size
      height dialog-icon-size
      fill dialog-icon-fill
  .md-dialog-close
    position absolute
    color color-text-caption
    top 20px
    right 20px
    z-index 15
  .md-dialog-title
    color color-text-base
    font-size dialog-title-font-size
    margin-bottom 15px
  .md-dialog-text
    display inline-block
    text-align left
  .md-dialog-actions
    display flex
    hairline(top, color-border-base)
    a
      flex 1 1 0%
      display flex
      align-items center
      justify-content center
      height dialog-action-height
      font-size dialog-action-font-size
      color color-text-caption
      border-right 1px solid color-border-base
      &:last-child
        color color-primary
        border-right 0
</style>
