<template>
  <i
    v-if="!svg"
    class="md-icon"
    :class="[`md-icon-${name}`, size]"
    :style="{color}"
    @click="$emit('click', $event)"
  ></i>
  <svg
    v-else-if="name"
    class="md-icon"
    :class="[`md-icon-${name}`, size]"
    :style="{fill: color}"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#${name}`"/>
  </svg>
</template>

<script>import loadSprite from './load-spirte'

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
      default() {
        return this.name === 'spinner'
      },
    },
  },

  mounted() {
    loadSprite()
  },
}
</script>

<style lang="stylus">
.md-icon
  background-size contain
  fill currentColor
  -webkit-backface-visibility hidden
  transform translateZ(0) scale(1.0, 1.0)
  font-family  "Mand-Mobile-Icon" !important
  font-size 16px
  font-style normal
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

  // size
  &.xss
    width icon-size-xxs
    height icon-size-xxs
    font-size icon-size-xxs
  &.xs
    width icon-size-xs
    height icon-size-xs
    font-size icon-size-xs
  &.sm
    width icon-size-sm
    height icon-size-sm
    font-size icon-size-sm
  &.md
    width icon-size-md
    height icon-size-md
    font-size icon-size-md
  &.lg
    width icon-size-lg
    height icon-size-lg
    font-size icon-size-lg

// name
.md-icon-invisible:before
  content: "\e601"
.md-icon-visible:before
  content: "\e602"
.md-icon-arrow-left:before
  content: "\e603"
.md-icon-arrow-right:before
  content: "\e630"
.md-icon-arrow-up:before
  content: "\e633"
.md-icon-arrow-down:before
  content: "\e634"
.md-icon-close:before
  content: "\e604"
.md-icon-info:before
  content: "\e605"
.md-icon-service:before
  content: "\e606"
.md-icon-edit:before
  content: "\e607"
.md-icon-question:before
  content: "\e608"
.md-icon-setting:before
  content: "\e609"
.md-icon-refresh:before
  content: "\e60a"
.md-icon-warn:before
  content: "\e60b"
.md-icon-check:before
  content: "\e60c"
.md-icon-checked:before
  content: "\e60d"
.md-icon-success:before
  content: "\e60d"
.md-icon-clear:before
  content: "\e60e"
.md-icon-fail:before
  content: "\e60e"
.md-icon-security:before
  content: "\e60f"
.md-icon-rmb:before
  content: "\e610"
.md-icon-scan:before
  content: "\e611"
.md-icon-share:before
  content: "\e612"
.md-icon-back:before
  content: "\e613"
.md-icon-card-bag:before
  content: "\e614"
.md-icon-message:before
  content: "\e615"
.md-icon-order:before
  content: "\e616"
.md-icon-balance:before
  content: "\e617"
.md-icon-coupon:before
  content: "\e618"
.md-icon-sort:before
  content: "\e619"
.md-icon-address-book:before
  content: "\e61a"
.md-icon-mobile-phone:before
  content: "\e61b"
.md-icon-home:before
  content: "\e61c"
.md-icon-discovery:before
  content: "\e61d"
.md-icon-calendar:before
  content: "\e61e"
.md-icon-user:before
  content: "\e61f"
.md-icon-time:before
  content: "\e620"
.md-icon-search:before
  content: "\e621"
.md-icon-switch:before
  content: "\e622"
.md-icon-camera:before
  content: "\e623"
.md-icon-clock:before
  content: "\e624"
.md-icon-profession:before
  content: "\e625"
.md-icon-delete:before
  content: "\e626"
.md-icon-id-card:before
  content: "\e627"
.md-icon-filter:before
  content: "\e628"
.md-icon-location:before
  content: "\e629"
.md-icon-authentication:before
  content: "\e62a"
.md-icon-motor-vehicle:before
  content: "\e62b"
.md-icon-phone:before
  content: "\e62c"
.md-icon-volumn:before
  content: "\e62d"

@font-face
  font-family Mand-Mobile-Icon
  /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
  src url("//manhattan.didistatic.com/static/manhattan/mand-mobile/iconfont.ttf") format("truetype")
  font-style normal
  font-weight normal
</style>
