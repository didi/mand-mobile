import Vue from 'vue'
import TipOptions from './tip'
import {randomId} from '../_util'
const Tip = Vue.extend(TipOptions)

export default {
  name: 'md-tip',

  props: {
    placement: {
      type: String,
      default: 'top',
    },
    name: {
      type: [String, Number],
      default() {
        return randomId('tip')
      },
    },
    icon: {
      type: String,
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Object,
      default() {
        return {top: 0, left: 0}
      },
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

    let firstNode = null
    this.$slots.default.some(node => {
      firstNode = node
      return !!node.data
    })

    if (firstNode) {
      firstNode.data = firstNode.data || {}
      const on = (firstNode.data.on = firstNode.data.on || {})
      const nativeOn = (firstNode.data.nativeOn = firstNode.data.nativeOn || {})

      on.click = this.$_addEventHandle(on.click, this.show)
      nativeOn.click = this.$_addEventHandle(nativeOn.click, this.show)
    }

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
      const isScrollView = node && node.getAttribute('scroll-wrapper') !== null

      if ((isScrollable && node.scrollHeight > node.clientHeight) || isScrollView) {
        return node
      } else {
        return this.$_getFirstScrollWrapper(node.parentNode)
      }
    },

    $_getSize(node) {
      return {
        width: node.offsetWidth,
        height: node.offsetHeight,
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
          icon: this.icon,
          iconSvg: this.iconSvg,
          placement: this.placement,
          content: this.content,
          closable: this.closable,
          name: this.name,
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

      const tipEl = this.$_tipVM.$el
      const referenceEl = this.$el
      const delta = this.$_getPosition(this.$el, this.wrapperEl)
      const size = this.$_getSize(this.$el, this.wrapperEl)
      const offsetTop = this.offset.top || 0
      const offsetLeft = this.offset.left || 0

      let tipElWidth = tipEl.offsetWidth
      let tipElHeight = tipEl.offsetHeight
      let cssText = ''

      if (this.fill && (this.placement === 'top' || this.placement === 'bottom')) {
        tipElWidth = size.width
        cssText += `width: ${tipElWidth}px;`
      }

      if (this.fill && (this.placement === 'left' || this.placement === 'right')) {
        tipElHeight = size.height
        cssText += `height: ${tipElHeight}px;`
      }

      switch (this.placement) {
        case 'left':
          delta.y += (referenceEl.offsetHeight - tipElHeight) / 2
          delta.x -= tipElWidth + 10
          break

        case 'right':
          delta.y += (referenceEl.offsetHeight - tipElHeight) / 2
          delta.x += referenceEl.offsetWidth + 10
          break

        case 'bottom':
          delta.y += referenceEl.offsetHeight + 10
          delta.x += (referenceEl.offsetWidth - tipElWidth) / 2
          break

        default:
          delta.y -= tipElHeight + 10
          delta.x += (this.$el.offsetWidth - tipElWidth) / 2
          break
      }

      cssText += `position: absolute; top: ${delta.y + offsetTop}px; left: ${delta.x + offsetLeft}px;`
      this.$_tipVM.$el.style.cssText = cssText
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
      this.$emit('show', this.name)
    },

    /**
     * Hide tip
     */
    hide() {
      if (this.$_tipVM && this.$_tipVM.$el.parentNode !== null) {
        this.$_tipVM.$el.parentNode.removeChild(this.$_tipVM.$el)
        this.$emit('hide', this.name)
      }
    },
  },
}
