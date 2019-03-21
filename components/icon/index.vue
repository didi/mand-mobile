<template>
  <svg
    v-if="svg || isInnerSvg"
    class="md-icon icon-svg"
    :class="[`md-icon-${name}`, size]"
    :style="{fill: color}"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#${name}`"/>
  </svg>
  <i
    v-else-if="name"
    class="md-icon icon-font"
    :class="[`md-icon-${name}`, name, size]"
    :style="{color}"
    @click="$emit('click', $event)"
  ></i>
</template>

<script>import loadSprite from './load-spirte'
import defaultSvg from './default-svg-list'

export default {
  name: 'md-icon',

  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: '',
    },
    svg: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    loadSprite()
  },

  computed: {
    isInnerSvg() {
      return !!defaultSvg[this.name]
    },
  },
}
</script>

<style lang="stylus">
.md-icon
  background-size contain
  fill currentColor
  -webkit-backface-visibility hidden
  transform translateZ(0) scale(1.0, 1.0)
  // display flex
  // align-items center
  // justify-content center

  // size
  &.icon-font
    font-family  "Mand-Mobile-Icon" !important
    font-size 16px
    font-style normal
    font-weight normal
    font-variant normal
    text-transform none
    line-height 1
    letter-spacing 0
    speak none
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    &.xss
      font-size icon-size-xxs
    &.xs
      font-size icon-size-xs
    &.sm
      font-size icon-size-sm
    &.md
      font-size icon-size-md
    &.lg
      font-size icon-size-lg
    &:before
      position relative
      z-index 2
  
  &.icon-svg
    &.xss
      width icon-size-xxs
      vertical-height(icon-size-xxs)
    &.xs
      width icon-size-xs
      vertical-height(icon-size-xs)
    &.sm
      width icon-size-sm
      vertical-height(icon-size-sm)
    &.md
      width icon-size-md
      vertical-height(icon-size-md)
    &.lg
      width icon-size-lg
      vertical-height(icon-size-lg)

// name
.md-icon-rectangle:before
  content "\e900"
.md-icon-invisible:before
  content "\e601"
.md-icon-visible:before
  content "\e602"
.md-icon-right:before
  content "\e905"
.md-icon-wrong:before
  content "\e906"
.md-icon-info:before
  content "\e605"
.md-icon-service:before
  content "\e606"
.md-icon-edit:before
  content "\e607"
.md-icon-refresh:before
  content "\e901"
.md-icon-question:before
  content "\e608"
.md-icon-setting:before
  content "\e609"
.md-icon-wait:before
  content "\e902"
.md-icon-check:before
  content "\e904"
.md-icon-check-disabled:before
  content "\e903"
.md-icon-checked:before, .md-icon-success:before
  content "\e908"
.md-icon-clear:before, .md-icon-fail:before
  content "\e60e"
.md-icon-info-solid:before
  content "\e907"
.md-icon-warn:before
  content "\e60b"
.md-icon-security:before
  content "\e60f"
.md-icon-rmb:before
  content "\e610"
.md-icon-scan:before
  content "\e611"
.md-icon-share:before
  content "\e612"
.md-icon-back:before
  content "\e613"
.md-icon-card-bag:before
  content "\e614"
.md-icon-message:before
  content "\e615"
.md-icon-order:before
  content "\e616"
.md-icon-balance:before
  content "\e617"
.md-icon-coupon:before
  content "\e618"
.md-icon-sort:before
  content "\e619"
.md-icon-address-book:before
  content "\e61a"
.md-icon-mobile-phone:before
  content "\e61b"
.md-icon-home:before
  content "\e61c"
.md-icon-discovery:before
  content "\e61d"
.md-icon-calendar:before
  content "\e61e"
.md-icon-user:before
  content "\e61f"
.md-icon-time:before
  content "\e620"
.md-icon-search:before
  content "\e621"
.md-icon-switch:before
  content "\e622"
.md-icon-camera:before
  content "\e623"
.md-icon-clock:before
  content "\e624"
.md-icon-profession:before
  content "\e625"
.md-icon-delete:before
  content "\e626"
.md-icon-id-card:before
  content "\e627"
.md-icon-filter:before
  content "\e628"
.md-icon-location:before
  content "\e629"
.md-icon-authentication:before
  content "\e62a"
.md-icon-motor-vehicle:before
  content "\e62b"
.md-icon-phone:before
  content "\e62c"
.md-icon-volumn:before
  content "\e62d"
.md-icon-arrow-left:before
  content "\e603"
.md-icon-arrow-right:before
  content "\e630"
.md-icon-arrow-up:before
  content "\e633"
.md-icon-arrow-down:before
  content "\e634"
.md-icon-close:before
  content "\e604"

@font-face
  font-family Mand-Mobile-Icon
  font-style normal
  font-weight normal
  /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
  /* Version is required */
  src icon-font-family
</style>
