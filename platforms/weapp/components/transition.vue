<template>
  <div
    class="md-transition-private"
    :class="transitionClass"
    @animationend="$_onTransitionendEnd"
    @transitionend="$_onTransitionendEnd"
  >
    <template v-if="keepAlive">
      <div class="transition-content" v-show="contentShow">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <div class="transition-content" v-if="contentShow">
        <slot :show="value"></slot>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'md-transition-private',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    keepAlive: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      transitionClass: [],
      contentShow: false,
      whenTransitionEnds: null
    }
  },
  computed: {
    isMiniProgram () {
      return !!(this.$root && this.$root.$mp)
    },
    createAnimation () {
      return wx && wx.createAnimation
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.$_enterTransition()
      } else {
        this.$_leaveTransition()
      }
    }
  },
  mounted () {
    if (this.value) {
      this.contentShow = true
    }
  },
  methods: {
    $_enterTransition () {
      if (!this.isMiniProgram || !this.name) {
        return
      }

      const animationClass = this.$_getTransitionClass(this.name)
      const startClass = animationClass.enterClass
      const activeClass = animationClass.enterActiveClass
      const toClass = animationClass.enterToClass

      this.$emit('beforeEnter')
      this.$_addTransitionClass(startClass)
      setTimeout(() => {
        this.$_addTransitionClass(activeClass)
        this.$nextTick(() => {
          this.$_removeTransitionClass(startClass)
          this.$_addTransitionClass(toClass)
          this.whenTransitionEnds = () => {
            this.$_removeTransitionClass(toClass)
            this.$_removeTransitionClass(activeClass)
            this.$emit('afterEnter')
            this.whenTransitionEnds = null
          }
        })
      }, 50)
      this.contentShow = true
      this.$emit('enter')
    },
    $_leaveTransition () {
      if (!this.isMiniProgram || !this.name) {
        return
      }

      const animationClass = this.$_getTransitionClass(this.name)
      const startClass = animationClass.leaveClass
      const activeClass = animationClass.leaveActiveClass
      const toClass = animationClass.leaveToClass

      this.$emit('beforeLeave')
      this.$_addTransitionClass(startClass)
      this.$_addTransitionClass(activeClass)
      this.$nextTick(() => {
        this.$_removeTransitionClass(startClass)
        this.$_addTransitionClass(toClass)
        this.whenTransitionEnds = () => {
          this.$_removeTransitionClass(toClass)
          this.$_removeTransitionClass(activeClass)
          this.$emit('afterLeave')
          this.contentShow = false
          this.whenTransitionEnds = null
        }
      })
      this.$emit('leave')
    },
    $_getTransitionClass (name) {
      return {
        enterClass: `${name}-enter`,
        enterToClass: `${name}-enter-to`,
        enterActiveClass: `${name}-enter-active`,
        leaveClass: `${name}-leave`,
        leaveToClass: `${name}-leave-to`,
        leaveActiveClass: `${name}-leave-active`
      }
    },
    $_addTransitionClass (className) {
      const index = this.transitionClass.indexOf(className)
      if (!~index) {
        this.transitionClass.push(className)
      }
    },
    $_removeTransitionClass (className) {
      const index = this.transitionClass.indexOf(className)
      if (~index) {
        this.transitionClass.splice(index, 1)
      }
    },

    $_onTransitionendEnd () {
      this.whenTransitionEnds && this.whenTransitionEnds()
    }
  }
}
</script>
