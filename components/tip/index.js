import Vue from 'vue'
import TipOptions from './tip'
const Tip = Vue.extend(TipOptions)

export default {
  name: 'md-tip',

  props: {
    placement: {
      type: String,
      default: 'top',
    },
    content: {
      type: String,
      default: '',
    },
  },

  mounted() {
    this.wrapperEl = this.$_getFirstScrollWrapper(this.$el)
  },

  beforeDestroy() {
    if (this.$_tipVM) {
      const el = this.$_tipVM.$el
      const parent = el.parentNode
      if (parent) {
        parent.removeChild(el)
      }
      this.$_tipVM.$destroy()
    }
  },

  /**
   * Only render the first node of slots
   * and add tip tirgger handler on it
   */
  render() {
    // eslint-disable-line no-unused-vars
    if (!this.$slots.default || !this.$slots.default.length) {
      return this.$slots.default
    }

    const firstNode = this.$slots.default[0]

    const on = (firstNode.data.on = firstNode.data.on || {})
    const nativeOn = (firstNode.data.nativeOn = firstNode.data.nativeOn || {})

    on.click = this.$_addEventHandle(on.click, this.show)
    nativeOn.click = this.$_addEventHandle(nativeOn.click, this.show)

    return firstNode
  },

  methods: {
    /**
     * Add extra tip trigger handler
     * without overwriting the old ones
     */
    $_addEventHandle(old, fn) {
      if (!old) {
        return fn
      } else if (Array.isArray(old)) {
        return old.indexOf(fn) > -1 ? old : old.concat(fn)
      } else {
        return old === fn ? old : [old, fn]
      }
    },

    /**
     * Get the first scrollable parent,
     * so we can append the tip element to
     * the right parent container
     */
    $_getFirstScrollWrapper(node) {
      if (node === null || node === document.body) {
        return node
      }

      const overflowY = window.getComputedStyle(node).overflowY
      const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden'

      if (isScrollable && node.scrollHeight > node.clientHeight) {
        return node
      } else {
        return this.$_getFirstScrollWrapper(node.parentNode)
      }
    },

    /**
     * Get the relative position of an element
     * inside a wrapper
     */
    $_getPosition(node, wrapper) {
      let x = 0
      let y = 0
      let el = node

      while (el) {
        x += el.offsetLeft
        y += el.offsetTop

        if (el === wrapper || el === document.body || el === null) {
          break
        }

        el = el.offsetParent
      }

      return {x, y}
    },

    /**
     * Lazy create tip element
     */
    $_getOrNewTip() {
      if (this.$_tipVM) {
        return this.$_tipVM
      }

      const tipVM = (this.$_tipVM = new Tip({
        propsData: {
          placement: this.placement,
          content: this.content,
        },
      }).$mount())

      tipVM.$on('close', this.hide)

      return tipVM
    },

    /**
     * Calculate the position of tip,
     * and relayout it's position
     */
    layout() {
      if (!this.$_tipVM) {
        return
      }

      const tipElRect = this.$_tipVM.$el.getBoundingClientRect()
      const referenceElRect = this.$el.getBoundingClientRect()
      const delta = this.$_getPosition(this.$el, this.wrapperEl)

      switch (this.placement) {
        case 'left':
          delta.y += (referenceElRect.height - tipElRect.height) / 2
          delta.x -= tipElRect.width + 10
          break

        case 'right':
          delta.y += (referenceElRect.height - tipElRect.height) / 2
          delta.x += referenceElRect.width + 10
          break

        case 'bottom':
          delta.y += referenceElRect.height + 10
          delta.x += (referenceElRect.width - tipElRect.width) / 2
          break

        default:
          delta.y -= tipElRect.height + 10
          delta.x += (referenceElRect.width - tipElRect.width) / 2
          break
      }

      this.$_tipVM.$el.style.cssText = `position: absolute; top: ${delta.y}px; left: ${delta.x}px;`
    },

    /**
     * Do the magic, show me your tip
     */
    show() {
      const tipVM = this.$_getOrNewTip()

      if (tipVM.$el.parentNode !== this.wrapperEl) {
        this.wrapperEl.appendChild(tipVM.$el)
      }

      this.layout()
      this.$emit('show')
    },

    /**
     * Hide tip
     */
    hide() {
      if (this.$_tipVM && this.$_tipVM.$el.parentNode !== null) {
        this.$_tipVM.$el.parentNode.removeChild(this.$_tipVM.$el)
        this.$emit('hide')
      }
    },
  },
}
